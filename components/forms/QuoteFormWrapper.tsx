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
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al enviar la cotización')
      }

      const result = await response.json()
      console.log('Cotización enviada:', result)
      
      // Solo mostrar toast de éxito, no redirigir inmediatamente
      toast.success('¡Cotización enviada exitosamente!', {
        description: 'Te contactaremos pronto con una propuesta personalizada.'
      })
      
      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push('/cotizacion/exito')
      }, 2000)
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
