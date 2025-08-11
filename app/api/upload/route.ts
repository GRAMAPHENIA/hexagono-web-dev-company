import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { z } from 'zod'

// File validation schema
const fileValidationSchema = z.object({
  name: z.string().min(1, 'Filename is required'),
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.enum([
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ], {
    errorMap: () => ({ message: 'File type not allowed. Only JPG, PNG, WebP, PDF, DOC, and DOCX files are permitted.' })
  })
})

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png', 
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES_PER_REQUEST = 5

export async function POST(request: NextRequest) {
  try {
    // Check if blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'File storage not configured' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    // Validate number of files
    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES_PER_REQUEST} files allowed per request` },
        { status: 400 }
      )
    }

    const uploadedFiles = []
    const errors = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      try {
        // Validate file properties
        const validation = fileValidationSchema.safeParse({
          name: file.name,
          size: file.size,
          type: file.type
        })

        if (!validation.success) {
          errors.push({
            file: file.name,
            error: validation.error.errors[0].message
          })
          continue
        }

        // Additional MIME type check
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
          errors.push({
            file: file.name,
            error: 'File type not allowed'
          })
          continue
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
          errors.push({
            file: file.name,
            error: 'File size exceeds 10MB limit'
          })
          continue
        }

        // Generate unique filename
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileExtension = file.name.split('.').pop()
        const uniqueFilename = `${timestamp}-${randomString}.${fileExtension}`

        // Upload to Vercel Blob
        const blob = await put(uniqueFilename, file, {
          access: 'public',
          addRandomSuffix: false
        })

        uploadedFiles.push({
          originalName: file.name,
          filename: uniqueFilename,
          url: blob.url,
          size: file.size,
          mimeType: file.type
        })

      } catch (uploadError) {
        console.error('Upload error for file:', file.name, uploadError)
        errors.push({
          file: file.name,
          error: 'Failed to upload file'
        })
      }
    }

    // Return results
    if (uploadedFiles.length === 0 && errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'All files failed to upload',
          details: errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      uploadedFiles,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Upload endpoint error:', error)
    return NextResponse.json(
      { error: 'Internal server error during file upload' },
      { status: 500 }
    )
  }
}

// Helper function to validate file type by reading file signature
async function validateFileSignature(file: File): Promise<boolean> {
  try {
    const buffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(buffer.slice(0, 4))
    
    // Check file signatures (magic numbers)
    const signature = Array.from(uint8Array)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
    
    // Common file signatures
    const signatures = {
      'ffd8ffe0': 'image/jpeg', // JPEG
      'ffd8ffe1': 'image/jpeg', // JPEG
      'ffd8ffe2': 'image/jpeg', // JPEG
      '89504e47': 'image/png',  // PNG
      '52494646': 'image/webp', // WebP (RIFF)
      '25504446': 'application/pdf', // PDF
      'd0cf11e0': 'application/msword', // DOC
      '504b0304': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX
    }
    
    const detectedType = signatures[signature.substring(0, 8)]
    return detectedType === file.type || ALLOWED_MIME_TYPES.includes(file.type)
    
  } catch (error) {
    console.error('File signature validation error:', error)
    return false
  }
}