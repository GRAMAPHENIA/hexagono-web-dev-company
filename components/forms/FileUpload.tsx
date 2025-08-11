'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Upload, X, File, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
}

interface FileWithPreview extends File {
  preview?: string
}

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const MAX_FILE_SIZE_MB = 10
const MAX_FILES = 5

export function FileUpload({
  onFilesChange,
  maxFiles = MAX_FILES,
  maxFileSize = MAX_FILE_SIZE_MB,
  acceptedTypes = ACCEPTED_FILE_TYPES,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `Tipo de archivo no permitido: ${file.name}. Formatos aceptados: JPG, PNG, WEBP, PDF, DOC, DOCX`
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxFileSize) {
      return `El archivo ${file.name} excede el tamaño máximo de ${maxFileSize}MB`
    }

    return null
  }, [acceptedTypes, maxFileSize])

  const createFilePreview = useCallback((file: File): FileWithPreview => {
    const fileWithPreview = file as FileWithPreview
    
    if (file.type.startsWith('image/')) {
      fileWithPreview.preview = URL.createObjectURL(file)
    }
    
    return fileWithPreview
  }, [])

  const processFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    const validationErrors: string[] = []
    const validFiles: FileWithPreview[] = []

    // Check total file count
    if (files.length + fileArray.length > maxFiles) {
      validationErrors.push(`Máximo ${maxFiles} archivos permitidos`)
      setErrors(validationErrors)
      return
    }

    fileArray.forEach(file => {
      const error = validateFile(file)
      if (error) {
        validationErrors.push(error)
      } else {
        // Check for duplicates
        const isDuplicate = files.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        )
        
        if (!isDuplicate) {
          validFiles.push(createFilePreview(file))
        }
      }
    })

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    const updatedFiles = [...files, ...validFiles]
    setFiles(updatedFiles)
    setErrors([])
    onFilesChange(updatedFiles)
  }, [files, maxFiles, validateFile, createFilePreview, onFilesChange])

  const removeFile = useCallback((index: number) => {
    const fileToRemove = files[index]
    
    // Revoke object URL to prevent memory leaks
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }

    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
    
    // Clear errors when files are removed
    if (errors.length > 0) {
      setErrors([])
    }
  }, [files, onFilesChange, errors])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles)
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles)
    }
    
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [processFiles])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />
    }
    if (file.type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <File className="h-5 w-5 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          'hover:border-primary/50 hover:bg-primary/5',
          isDragOver && 'border-primary bg-primary/10',
          errors.length > 0 && 'border-destructive bg-destructive/5'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Seleccionar archivos"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            'p-3 rounded-full',
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}>
            <Upload className="h-6 w-6" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isDragOver 
                ? 'Suelta los archivos aquí' 
                : 'Arrastra archivos aquí o haz clic para seleccionar'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              Máximo {maxFiles} archivos • {maxFileSize}MB por archivo
            </p>
            <p className="text-xs text-muted-foreground">
              Formatos: JPG, PNG, WEBP, PDF, DOC, DOCX
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">
            Archivos seleccionados ({files.length}/{maxFiles})
          </h4>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
              >
                {/* File Icon or Preview */}
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    getFileIcon(file)
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0 h-8 w-8 p-0"
                  aria-label={`Eliminar ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}