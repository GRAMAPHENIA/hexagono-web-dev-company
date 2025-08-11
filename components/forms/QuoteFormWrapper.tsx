'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuoteRequestForm } from './QuoteRequestForm'
import { QuoteFormData } from '@/lib/types/quote'
import { toast } from 'sonner'

export function QuoteFormWrapper() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      // First, upload files if any
      let uploadedFiles: any[] = []
      if (data.attachments && data.attachments.length > 0) {
        const formData = new FormData()
        data.attachments.forEach(file => {
          formData.append('files', file)
        })

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Error al subir los archivos')
        }

        const uploadResult = await uploadResponse.json()
        uploadedFiles = uploadResult.uploadedFiles || []
      }

      // Prepare quote data with uploaded file references
      const quoteData = {
        ...data,
        attachments: uploadedFiles.map((file: any) => ({
          filename: file.filename,
          originalName: file.originalName,
          url: file.url,
          size: file.size,
          mimeType: file.mimeType
        }))
      }

      // Submit the quote
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al enviar la cotización')
      }

      const result = await response.json()
      console.log('Cotización enviada:', result)
      
      // Redirigir inmediatamente a la página de éxito
      router.push('/cotizacion/exito')
      
    } catch (error) {
      console.error('Error submitting quote:', error)
      toast.error('Error al enviar la cotización', {
        description: 'Por favor, intenta nuevamente o contactanos directamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <QuoteRequestForm 
      onSubmit={handleSubmit} 
      isSubmitting={isSubmitting} 
    />
  )
}
