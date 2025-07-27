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
      { name: 'Optimización SEO', co