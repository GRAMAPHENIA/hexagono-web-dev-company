'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuoteRequestForm } from './QuoteRequestForm'
import { QuoteFormData } from '@/lib/types/quote'
import { toast } from 'sonner'

interface QuoteFormWrapperProps {
  onSubmit: (data: QuoteFormData) => Promise<void>
}

export function QuoteFormWrapper({ onSubmit }: QuoteFormWrapperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      toast.success('¡Cotización enviada exitosamente!', {
        description: 'Te contactaremos pronto con una propuesta personalizada.'
      })
      // Redirigir a la página de éxito después de un breve delay
      setTimeout(() => {
        router.push('/cotizacion/exito')
      }, 1500)
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
