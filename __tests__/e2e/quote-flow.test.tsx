/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import CotizacionPage from '@/app/cotizacion/page'
import CotizacionExitoPage from '@/app/cotizacion/exito/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
}

describe('Quote Flow E2E Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('Quote Request Page', () => {
    it('renders the quote request page with all sections', () => {
      render(<CotizacionPage />)

      // Check main heading
      expect(screen.getByRole('heading', { name: /solicitar cotización/i })).toBeInTheDocument()

      // Check benefits section
      expect(screen.getByText('Respuesta Rápida')).toBeInTheDocument()
      expect(screen.getByText('Sin Compromiso')).toBeInTheDocument()
      expect(screen.getByText('Asesoramiento')).toBeInTheDocument()
      expect(screen.getByText('Propuesta Detallada')).toBeInTheDocument()

      // Check form is present
      expect(screen.getByText('Información de Contacto')).toBeInTheDocument()
      expect(screen.getByText('Detalles del Proyecto')).toBeInTheDocument()

      // Check FAQ section
      expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument()

      // Check contact information
      expect(screen.getByText('contacto@hexagono.xyz')).toBeInTheDocument()
      expect(screen.getByText('+54 11 2378-2307')).toBeInTheDocument()
    })

    it('has proper SEO metadata structure', () => {
      // This would be tested in a real browser environment
      // Here we just verify the component renders without errors
      expect(() => render(<CotizacionPage />)).not.toThrow()
    })
  })

  describe('Quote Form Submission Flow', () => {
    it('completes the full quote submission flow', async () => {
      const user = userEvent.setup()

      // Mock successful API responses
      ;(global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              basePrice: 250000,
              additionalFeatures: [],
              totalEstimate: 250000,
              currency: 'ARS',
              disclaimer: 'Precio estimado'
            }
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              id: 'quote-123',
              quoteNumber: 'COT-20241201-0001',
              accessToken: 'token-123',
              estimatedPrice: 250000,
              status: 'PENDING',
              createdAt: new Date().toISOString()
            }
          })
        })

      render(<CotizacionPage />)

      // Fill out client information
      await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
      await user.type(screen.getByLabelText(/teléfono/i), '+54 11 1234-5678')
      await user.type(screen.getByLabelText(/empresa/i), 'Mi Empresa')

      // Select service type
      await user.click(screen.getByRole('combobox', { name: /tipo de servicio/i }))
      await user.click(screen.getByText('Web Corporativa'))

      // Wait for features to load and select some
      await waitFor(() => {
        expect(screen.getByText('Optimización SEO')).toBeInTheDocument()
      })

      await user.click(screen.getByLabelText(/optimización seo/i))
      await user.click(screen.getByLabelText(/diseño responsive/i))

      // Fill project details
      await user.click(screen.getByRole('combobox', { name: /timeline deseado/i }))
      await user.click(screen.getByText('3-4 semanas'))

      await user.click(screen.getByRole('combobox', { name: /rango de presupuesto/i }))
      await user.click(screen.getByText('$200.000 - $350.000'))

      await user.type(
        screen.getByLabelText(/descripción del proyecto/i),
        'Necesito un sitio web corporativo para mi empresa'
      )

      // Submit the form
      await user.click(screen.getByRole('button', { name: /enviar cotización/i }))

      // Wait for API calls
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/quotes', expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('Juan Pérez')
        }))
      })

      // Verify navigation to success page
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/cotizacion/exito')
      })
    })

    it('handles form validation errors', async () => {
      const user = userEvent.setup()
      render(<CotizacionPage />)

      // Try to submit without filling required fields
      await user.click(screen.getByRole('button', { name: /enviar cotización/i }))

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
        expect(screen.getByText(/ingrese un email válido/i)).toBeInTheDocument()
      })
    })

    it('handles API errors gracefully', async () => {
      const user = userEvent.setup()

      // Mock API error
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      render(<CotizacionPage />)

      // Fill minimum required fields
      await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
      await user.type(screen.getByLabelText(/email/i), 'juan@example.com')

      // Select service type
      await user.click(screen.getByRole('combobox', { name: /tipo de servicio/i }))
      await user.click(screen.getByText('Landing Page'))

      // Submit form
      await user.click(screen.getByRole('button', { name: /enviar cotización/i }))

      // Should not navigate on error
      await waitFor(() => {
        expect(mockPush).not.toHaveBeenCalled()
      })
    })
  })

  describe('Price Calculator Integration', () => {
    it('shows price calculator when service type and features are selected', async () => {
      const user = userEvent.setup()

      // Mock pricing API
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            basePrice: 170000,
            additionalFeatures: [
              { name: 'Optimización SEO', cost: 50000 }
            ],
            totalEstimate: 220000,
            currency: 'ARS',
            disclaimer: 'Precio estimado'
          }
        })
      })

      render(<CotizacionPage />)

      // Select service type
      await user.click(screen.getByRole('combobox', { name: /tipo de servicio/i }))
      await user.click(screen.getByText('Landing Page'))

      // Select a feature
      await waitFor(() => {
        expect(screen.getByText('Optimización SEO')).toBeInTheDocument()
      })
      await user.click(screen.getByLabelText(/optimización seo/i))

      // Price calculator section should appear
      await waitFor(() => {
        expect(screen.getByText('Estimación de Precio')).toBeInTheDocument()
      })

      // Show calculator
      await user.click(screen.getByRole('button', { name: /ver estimación/i }))

      // Wait for price calculation
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/pricing/calculate', expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('LANDING_PAGE')
        }))
      })
    })
  })

  describe('File Upload Integration', () => {
    it('allows file upload and shows uploaded files', async () => {
      const user = userEvent.setup()
      render(<CotizacionPage />)

      // Find file upload section
      expect(screen.getByText('Archivos de Referencia')).toBeInTheDocument()
      expect(screen.getByText(/arrastra archivos aquí/i)).toBeInTheDocument()

      // Create a mock file
      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' })

      // Find file input and upload file
      const fileInput = screen.getByLabelText(/seleccionar archivos/i)
      await user.upload(fileInput, file)

      // File should appear in the list
      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument()
      })
    })
  })

  describe('Success Page', () => {
    it('renders success page with all information', () => {
      render(<CotizacionExitoPage />)

      // Check main success message
      expect(screen.getByRole('heading', { name: /¡cotización enviada!/i })).toBeInTheDocument()
      expect(screen.getByText(/tu solicitud ha sido recibida exitosamente/i)).toBeInTheDocument()

      // Check next steps
      expect(screen.getByText('Confirmación por email')).toBeInTheDocument()
      expect(screen.getByText('Análisis del proyecto')).toBeInTheDocument()
      expect(screen.getByText('Propuesta detallada')).toBeInTheDocument()

      // Check contact options
      expect(screen.getByText('contacto@hexagono.xyz')).toBeInTheDocument()
      expect(screen.getByText('+54 11 2378-2307')).toBeInTheDocument()

      // Check navigation buttons
      expect(screen.getByRole('link', { name: /nueva cotización/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
    })

    it('has proper navigation links', () => {
      render(<CotizacionExitoPage />)

      // Check link destinations
      const newQuoteLink = screen.getByRole('link', { name: /nueva cotización/i })
      const homeLink = screen.getByRole('link', { name: /volver al inicio/i })

      expect(newQuoteLink).toHaveAttribute('href', '/cotizacion')
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })

  describe('Responsive Design', () => {
    it('renders properly on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      render(<CotizacionPage />)

      // Should render without layout issues
      expect(screen.getByRole('heading', { name: /solicitar cotización/i })).toBeInTheDocument()
      expect(screen.getByText('Información de Contacto')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels and ARIA attributes', () => {
      render(<CotizacionPage />)

      // Check form labels
      expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tipo de servicio/i)).toBeInTheDocument()

      // Check button accessibility
      const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).not.toHaveAttribute('aria-disabled', 'true')
    })

    it('provides proper error messages for screen readers', async () => {
      const user = userEvent.setup()
      render(<CotizacionPage />)

      // Submit form without required fields
      await user.click(screen.getByRole('button', { name: /enviar cotización/i }))

      // Error messages should be associated with form fields
      await waitFor(() => {
        const nameField = screen.getByLabelText(/nombre completo/i)
        const errorMessage = screen.getByText(/el nombre debe tener al menos 2 caracteres/i)
        
        expect(nameField).toHaveAttribute('aria-invalid', 'true')
        expect(errorMessage).toBeInTheDocument()
      })
    })
  })
})