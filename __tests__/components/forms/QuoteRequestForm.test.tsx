import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm'
import { QuoteFormData } from '@/lib/types/quote'

// Mock del componente PriceCalculator
jest.mock('@/components/forms/PriceCalculator', () => {
  return function MockPriceCalculator() {
    return <div data-testid="price-calculator">Price Calculator</div>
  }
})

// Mock de sonner
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

  it('renders the form with all required fields', () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Verificar campos obligatorios
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo de servicio/i)).toBeInTheDocument()
  })

  it('shows service type options when service type is selected', async () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Seleccionar tipo de servicio
    const serviceSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    fireEvent.click(serviceSelect)

    // Verificar que aparecen las opciones
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /landing page/i })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /web corporativa/i })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /tienda online/i })).toBeInTheDocument()
    })
  })

  it('shows features when service type is selected', async () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Seleccionar Landing Page
    const serviceSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    fireEvent.click(serviceSelect)
    
    await waitFor(() => {
      const landingPageOption = screen.getByRole('option', { name: /landing page/i })
      fireEvent.click(landingPageOption)
    })

    // Verificar que aparecen las características
    await waitFor(() => {
      expect(screen.getByText(/optimización seo/i)).toBeInTheDocument()
      expect(screen.getByText(/diseño responsive/i)).toBeInTheDocument()
    })
  })

  it('shows price calculator when features are selected', async () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Seleccionar servicio
    const serviceSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    fireEvent.click(serviceSelect)
    
    await waitFor(() => {
      const landingPageOption = screen.getByRole('option', { name: /landing page/i })
      fireEvent.click(landingPageOption)
    })

    // Seleccionar una característica
    await waitFor(() => {
      const seoCheckbox = screen.getByRole('checkbox', { name: /optimización seo/i })
      fireEvent.click(seoCheckbox)
    })

    // Verificar que aparece el botón de estimación
    await waitFor(() => {
      expect(screen.getByText(/ver estimación/i)).toBeInTheDocument()
    })
  })

  it('submits form with correct data', async () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Llenar formulario
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Juan Pérez' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@example.com' },
    })

    // Seleccionar servicio
    const serviceSelect = screen.getByRole('combobox', { name: /tipo de servicio/i })
    fireEvent.click(serviceSelect)
    
    await waitFor(() => {
      const landingPageOption = screen.getByRole('option', { name: /landing page/i })
      fireEvent.click(landingPageOption)
    })

    // Seleccionar característica
    await waitFor(() => {
      const seoCheckbox = screen.getByRole('checkbox', { name: /optimización seo/i })
      fireEvent.click(seoCheckbox)
    })

    // Enviar formulario
    const submitButton = screen.getByRole('button', { name: /enviar cotización/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          clientInfo: {
            name: 'Juan Pérez',
            email: 'juan@example.com',
            phone: '',
            company: '',
          },
          projectDetails: {
            serviceType: 'LANDING_PAGE',
            features: ['seo-optimization'],
            timeline: '',
            budgetRange: '',
            description: '',
            additionalRequirements: '',
          },
        })
      )
    })
  })

  it('shows validation errors for invalid data', async () => {
    render(<QuoteRequestForm onSubmit={mockOnSubmit} />)

    // Intentar enviar sin datos
    const submitButton = screen.getByText(/enviar cotización/i)
    fireEvent.click(submitButton)

    // Verificar errores de validación
    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/ingrese un email válido/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('handles submission loading state', async () => {
    const mockOnSubmitWithDelay = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<QuoteRequestForm onSubmit={mockOnSubmitWithDelay} isSubmitting={true} />)

    // Verificar que el botón muestra estado de carga
    expect(screen.getByText(/enviando/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})