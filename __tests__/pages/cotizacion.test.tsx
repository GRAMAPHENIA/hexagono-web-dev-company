/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import CotizacionPage from '@/app/cotizacion/page'
import CotizacionExitoPage from '@/app/cotizacion/exito/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}))

// Mock fetch API
global.fetch = jest.fn()

// Mock toast notifications
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('Cotización Pages', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('Cotización Page', () => {
    it('renders the main heading and description', () => {
      render(<CotizacionPage />)

      expect(screen.getByRole('heading', { name: /solicitar cotización/i })).toBeInTheDocument()
      expect(screen.getByText(/completa el formulario y recibe una propuesta personalizada/i)).toBeInTheDocument()
    })

    it('renders all benefit cards', () => {
      render(<CotizacionPage />)

      expect(screen.getByText('Respuesta Rápida')).toBeInTheDocument()
      expect(screen.getByText('Sin Compromiso')).toBeInTheDocument()
      expect(screen.getByText('Asesoramiento')).toBeInTheDocument()
      expect(screen.getByText('Propuesta Detallada')).toBeInTheDocument()
    })

    it('renders the process information section', () => {
      render(<CotizacionPage />)

      expect(screen.getByText('¿Cómo funciona?')).toBeInTheDocument()
      expect(screen.getByText('Completas el formulario')).toBeInTheDocument()
      expect(screen.getByText('Analizamos tu proyecto')).toBeInTheDocument()
      expect(screen.getByText('Te enviamos la propuesta')).toBeInTheDocument()
      expect(screen.getByText('Coordinamos una reunión')).toBeInTheDocument()
    })

    it('renders FAQ section', () => {
      render(<CotizacionPage />)

      expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument()
      expect(screen.getByText(/¿cuánto tiempo toma recibir la cotización\?/i)).toBeInTheDocument()
      expect(screen.getByText(/¿la cotización tiene algún costo\?/i)).toBeInTheDocument()
    })

    it('renders contact information', () => {
      render(<CotizacionPage />)

      expect(screen.getByText('contacto@hexagono.xyz')).toBeInTheDocument()
      expect(screen.getByText('+54 11 2378-2307')).toBeInTheDocument()
    })

    it('has proper responsive design classes', () => {
      render(<CotizacionPage />)

      const heading = screen.getByRole('heading', { name: /solicitar cotización/i })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })
  })

  describe('Cotización Éxito Page', () => {
    it('renders success message', () => {
      render(<CotizacionExitoPage />)

      expect(screen.getByRole('heading', { name: /¡cotización enviada!/i })).toBeInTheDocument()
      expect(screen.getByText(/tu solicitud ha sido recibida exitosamente/i)).toBeInTheDocument()
    })

    it('renders next steps information', () => {
      render(<CotizacionExitoPage />)

      expect(screen.getByText('¿Qué sigue ahora?')).toBeInTheDocument()
      expect(screen.getByText('Confirmación por email')).toBeInTheDocument()
      expect(screen.getByText('Análisis del proyecto')).toBeInTheDocument()
      expect(screen.getByText('Propuesta detallada')).toBeInTheDocument()
    })

    it('renders contact options', () => {
      render(<CotizacionExitoPage />)

      expect(screen.getByText('¿Necesitas contactarnos?')).toBeInTheDocument()
      expect(screen.getByText('contacto@hexagono.xyz')).toBeInTheDocument()
      expect(screen.getByText('+54 11 2378-2307')).toBeInTheDocument()
    })

    it('renders navigation links with correct hrefs', () => {
      render(<CotizacionExitoPage />)

      const newQuoteLink = screen.getByRole('link', { name: /nueva cotización/i })
      const homeLink = screen.getByRole('link', { name: /volver al inicio/i })

      expect(newQuoteLink).toHaveAttribute('href', '/cotizacion')
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('renders important information section', () => {
      render(<CotizacionExitoPage />)

      expect(screen.getByText('Información importante')).toBeInTheDocument()
      expect(screen.getByText('Cotización sin compromiso')).toBeInTheDocument()
      expect(screen.getByText('Propuesta personalizada')).toBeInTheDocument()
      expect(screen.getByText('Asesoramiento incluido')).toBeInTheDocument()
    })

    it('has proper time response indication', () => {
      render(<CotizacionExitoPage />)

      expect(screen.getByText(/menos de 24 horas/i)).toBeInTheDocument()
    })
  })

  describe('SEO and Accessibility', () => {
    it('cotización page has proper heading hierarchy', () => {
      render(<CotizacionPage />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      
      const subHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(subHeadings.length).toBeGreaterThan(0)
    })

    it('success page has proper heading hierarchy', () => {
      render(<CotizacionExitoPage />)

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
    })

    it('has accessible links with proper attributes', () => {
      render(<CotizacionExitoPage />)

      const whatsappLink = screen.getByRole('link', { name: /whatsapp/i })
      expect(whatsappLink).toHaveAttribute('target', '_blank')
      expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Mobile Responsiveness', () => {
    it('has mobile-first responsive classes', () => {
      render(<CotizacionPage />)

      // Check for responsive grid classes
      const benefitsGrid = screen.getByText('Respuesta Rápida').closest('.grid')
      expect(benefitsGrid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
    })

    it('has responsive text sizing', () => {
      render(<CotizacionPage />)

      const heading = screen.getByRole('heading', { name: /solicitar cotización/i })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })
  })
})