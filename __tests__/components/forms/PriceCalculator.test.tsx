import { render, screen, waitFor } from '@testing-library/react'
import { PriceCalculator } from '@/components/forms/PriceCalculator'
import { ServiceType } from '@/lib/types/quote'

// Mock the fetch function
global.fetch = jest.fn()

// Mock the formatPrice function
jest.mock('@/lib/utils/format', () => ({
  formatPrice: (amount: number) => `$${amount.toLocaleString('es-AR')}`
}))

describe('PriceCalculator', () => {
  const mockPriceEstimate = {
    basePrice: 170000,
    additionalFeatures: [
      { name: 'Optimización SEO', cost: 50000 },
      { name: 'Diseño Responsive', cost: 30000 }
    ],
    totalEstimate: 250000,
    currency: 'ARS' as const,
    disclaimer: 'Este es un precio estimado. El costo final puede variar según los requerimientos específicos del proyecto.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: mockPriceEstimate })
    })
  })

  it('eventually shows price estimate after debounce delay', async () => {
    render(
      <PriceCalculator 
        serviceType="LANDING_PAGE" 
        features={['seo-optimization']} 
      />
    )

    // Wait for debounce delay and API call to complete
    await waitFor(() => {
      expect(screen.getByText(/estimación de precio/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('displays price estimate after loading', async () => {
    render(
      <PriceCalculator 
        serviceType="LANDING_PAGE" 
        features={['seo-optimization', 'responsive-design']} 
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/estimación de precio/i)).toBeInTheDocument()
    })

    expect(screen.getByText('$170.000')).toBeInTheDocument()
    expect(screen.getByText('$250.000')).toBeInTheDocument()
    expect(screen.getByText(/optimización seo/i)).toBeInTheDocument()
    expect(screen.getByText(/diseño responsive/i)).toBeInTheDocument()
  })

  it('shows error message when API call fails', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

    render(
      <PriceCalculator 
        serviceType="LANDING_PAGE" 
        features={['seo-optimization']} 
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument()
    })
  })

  it('calls API with correct parameters', async () => {
    render(
      <PriceCalculator 
        serviceType="CORPORATE_WEB" 
        features={['seo-optimization', 'cms-integration']}
        customRequirements="Necesito integración con CRM"
      />
    )

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/pricing/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType: 'CORPORATE_WEB',
          features: ['seo-optimization', 'cms-integration'],
          customRequirements: 'Necesito integración con CRM',
        }),
      })
    })
  })

  it('does not render when no features are selected', () => {
    render(
      <PriceCalculator 
        serviceType="LANDING_PAGE" 
        features={[]} 
      />
    )

    expect(screen.queryByText(/estimación de precio/i)).not.toBeInTheDocument()
  })

  it('shows disclaimer message', async () => {
    render(
      <PriceCalculator 
        serviceType="LANDING_PAGE" 
        features={['seo-optimization']} 
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/este es un precio estimado/i)).toBeInTheDocument()
    })
  })
})