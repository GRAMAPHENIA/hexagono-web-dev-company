import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm'
import { QuoteFormData } from '@/lib/types/quote'

// Mock the PriceCalculator component
jest.mock('@/components/forms/PriceCalculator', () => ({
  PriceCalculator: ({ serviceType, features }: any) => (
    <div data-testid="price-calculator">
      Price Calculator: {serviceType} with {features.length} features
    </div>
  )
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('QuoteRequestForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all form fields', () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Client info fields
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/empresa/i)).toBeInTheDocument()

    // Project details fields
    expect(screen.getByLabelText(/tipo de servicio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/timeline deseado/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rango de presupuesto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descripción del proyecto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/requerimientos adicionales/i)).toBeInTheDocument()

    // Submit button
    expect(screen.getByRole('button', { name: /enviar cotización/i })).toBeInTheDocument()
  })

  it('should show validation errors for required fields', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/ingrese un email válido/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/ingrese un email válido/i)).toBeInTheDocument()
    })
  })

  it('should validate phone number format', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    const phoneInput = screen.getByLabelText(/teléfono/i)
    await user.type(phoneInput, 'invalid-phone')

    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/ingrese un teléfono válido/i)).toBeInTheDocument()
    })
  })

  it('should show features when service type is selected', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    await waitFor(() => {
      expect(screen.getByText(/características deseadas/i)).toBeInTheDocument()
      expect(screen.getByText(/optimización seo/i)).toBeInTheDocument()
      expect(screen.getByText(/diseño responsive/i)).toBeInTheDocument()
    })
  })

  it('should show different features for different service types', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select E-commerce
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const ecommerceOption = screen.getByText(/tienda online/i)
    await user.click(ecommerceOption)

    await waitFor(() => {
      expect(screen.getByText(/pasarela de pagos/i)).toBeInTheDocument()
      expect(screen.getByText(/gestión de inventario/i)).toBeInTheDocument()
      expect(screen.getByText(/carrito de compras/i)).toBeInTheDocument()
    })
  })

  it('should show price calculator when service type and features are selected', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Select a feature
    await waitFor(() => {
      const seoCheckbox = screen.getByRole('checkbox', { name: /optimización seo/i })
      user.click(seoCheckbox)
    })

    await waitFor(() => {
      expect(screen.getByText(/estimación de precio/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /ver estimación/i })).toBeInTheDocument()
    })
  })

  it('should toggle price calculator visibility', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select service type and feature first
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    await waitFor(async () => {
      const seoCheckbox = screen.getByRole('checkbox', { name: /optimización seo/i })
      await user.click(seoCheckbox)
    })

    // Toggle price calculator
    await waitFor(async () => {
      const toggleButton = screen.getByRole('button', { name: /ver estimación/i })
      await user.click(toggleButton)
    })

    await waitFor(() => {
      expect(screen.getByTestId('price-calculator')).toBeInTheDocument()
    })

    // Toggle again to hide
    await waitFor(async () => {
      const hideButton = screen.getByRole('button', { name: /ocultar estimación/i })
      await user.click(hideButton)
    })

    await waitFor(() => {
      expect(screen.queryByTestId('price-calculator')).not.toBeInTheDocument()
    })
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    mockOnSubmit.mockResolvedValue(undefined)
    
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Fill required fields
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          clientInfo: expect.objectContaining({
            name: 'Juan Pérez',
            email: 'juan@example.com'
          }),
          projectDetails: expect.objectContaining({
            serviceType: 'LANDING_PAGE'
          })
        })
      )
    })
  })

  it('should show loading state during submission', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} isSubmitting={true} />)

    const submitButton = screen.getByRole('button', { name: /enviando/i })
    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/enviando.../i)).toBeInTheDocument()
  })

  it('should handle submission error', async () => {
    const user = userEvent.setup()
    const mockError = new Error('Submission failed')
    mockOnSubmit.mockRejectedValue(mockError)
    
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Fill required fields
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    // Should show error toast (mocked)
    const { toast } = require('sonner')
    expect(toast.error).toHaveBeenCalledWith(
      'Error al enviar la cotización',
      expect.objectContaining({
        description: expect.any(String)
      })
    )
  })

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup()
    mockOnSubmit.mockResolvedValue(undefined)
    
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Fill form
    const nameInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    // Form should be reset
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
    })

    // Should show success toast (mocked)
    const { toast } = require('sonner')
    expect(toast.success).toHaveBeenCalledWith(
      '¡Cotización enviada exitosamente!',
      expect.objectContaining({
        description: expect.any(String)
      })
    )
  })

  it('should allow selecting multiple features', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Select multiple features
    await waitFor(async () => {
      const seoCheckbox = screen.getByRole('checkbox', { name: /optimización seo/i })
      const responsiveCheckbox = screen.getByRole('checkbox', { name: /diseño responsive/i })
      
      await user.click(seoCheckbox)
      await user.click(responsiveCheckbox)
      
      expect(seoCheckbox).toBeChecked()
      expect(responsiveCheckbox).toBeChecked()
    })
  })

  it('should validate maximum features selection', async () => {
    const user = userEvent.setup()
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Select service type
    const serviceTypeSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    await user.click(serviceTypeSelect)
    
    const landingPageOption = screen.getByText(/landing page/i)
    await user.click(landingPageOption)

    // Try to select all available features (should be within limit)
    await waitFor(async () => {
      const checkboxes = screen.getAllByRole('checkbox')
      
      // Select first few checkboxes (within the 20 feature limit)
      for (let i = 0; i < Math.min(checkboxes.length, 5); i++) {
        await user.click(checkboxes[i])
      }
    })

    // Form should still be valid since we're within limits
    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    expect(submitButton).not.toBeDisabled()
  })
})