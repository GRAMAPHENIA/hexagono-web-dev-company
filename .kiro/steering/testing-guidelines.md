---
inclusion: fileMatch
fileMatchPattern: "**/*.{test,spec}.{ts,tsx,js,jsx}"
---

# Testing Guidelines - Hexágono Web

## Testing Philosophy

- **Test-Driven Development (TDD)** cuando sea apropiado
- **Testing Pyramid**: Más unit tests, menos E2E tests
- **Confidence over Coverage**: Tests que den confianza real
- **Fast Feedback**: Tests rápidos para desarrollo ágil

## Testing Structure

### Directory Organization
```
__tests__/
├── components/          # Component tests
├── lib/                # Utility function tests
├── hooks/              # Custom hook tests
├── api/                # API route tests
├── e2e/                # End-to-end tests
└── fixtures/           # Test data and mocks
```

### File Naming Conventions
```
✅ Correcto:
QuoteForm.test.tsx
priceCalculator.test.ts
useQuoteForm.test.ts
quotes.api.test.ts

❌ Incorrecto:
QuoteForm.spec.tsx (usar .test.tsx)
test-quote-form.tsx (usar PascalCase)
```

## Unit Testing

### Component Testing with React Testing Library
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteForm } from '@/components/QuoteForm'

describe('QuoteForm', () => {
  const mockOnSubmit = jest.fn()
  
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('should render all required fields', () => {
    render(<QuoteForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(<QuoteForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)
    
    expect(screen.getByText(/este campo es obligatorio/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    render(<QuoteForm onSubmit={mockOnSubmit} />)
    
    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        clientName: 'Juan Pérez',
        clientEmail: 'juan@example.com'
      })
    })
  })
})
```

### Utility Function Testing
```typescript
import { calculateQuotePrice, formatPrice } from '@/lib/priceCalculator'

describe('priceCalculator', () => {
  describe('calculateQuotePrice', () => {
    it('should calculate base price for landing page', () => {
      const result = calculateQuotePrice('LANDING_PAGE', [])
      expect(result).toBe(170000)
    })

    it('should add feature costs to base price', () => {
      const features = ['seo-optimization', 'contact-form']
      const result = calculateQuotePrice('CORPORATE_WEB', features)
      expect(result).toBeGreaterThan(250000)
    })

    it('should throw error for invalid service type', () => {
      expect(() => {
        calculateQuotePrice('INVALID_TYPE', [])
      }).toThrow('Invalid service type')
    })
  })

  describe('formatPrice', () => {
    it('should format price in Argentine pesos', () => {
      const result = formatPrice(170000)
      expect(result).toBe('$170.000')
    })
  })
})
```

### Custom Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react'
import { useQuoteForm } from '@/hooks/useQuoteForm'

describe('useQuoteForm', () => {
  it('should initialize with empty form data', () => {
    const { result } = renderHook(() => useQuoteForm())
    
    expect(result.current.formData).toEqual({
      clientName: '',
      clientEmail: '',
      serviceType: ''
    })
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should update form data', () => {
    const { result } = renderHook(() => useQuoteForm())
    
    act(() => {
      result.current.updateField('clientName', 'Juan Pérez')
    })
    
    expect(result.current.formData.clientName).toBe('Juan Pérez')
  })

  it('should handle form submission', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({ success: true })
    const { result } = renderHook(() => useQuoteForm(mockSubmit))
    
    await act(async () => {
      await result.current.submitForm()
    })
    
    expect(mockSubmit).toHaveBeenCalled()
    expect(result.current.isSubmitting).toBe(false)
  })
})
```

## Integration Testing

### API Route Testing
```typescript
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/quotes/route'

describe('/api/quotes', () => {
  describe('POST', () => {
    it('should create a new quote', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com',
          serviceType: 'CORPORATE_WEB'
        }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(201)
      const data = JSON.parse(res._getData())
      expect(data).toHaveProperty('quoteNumber')
      expect(data).toHaveProperty('accessToken')
    })

    it('should return validation error for invalid data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          clientName: '',
          clientEmail: 'invalid-email'
        }
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(400)
      const data = JSON.parse(res._getData())
      expect(data).toHaveProperty('error')
    })
  })
})
```

### Database Testing
```typescript
import { PrismaClient } from '@prisma/client'
import { createQuote, getQuoteById } from '@/lib/quotes'

const prisma = new PrismaClient()

describe('Quote Database Operations', () => {
  beforeEach(async () => {
    // Clean up test data
    await prisma.quote.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create and retrieve a quote', async () => {
    const quoteData = {
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      serviceType: 'CORPORATE_WEB'
    }

    const createdQuote = await createQuote(quoteData)
    expect(createdQuote).toHaveProperty('id')
    expect(createdQuote.clientName).toBe('Juan Pérez')

    const retrievedQuote = await getQuoteById(createdQuote.id)
    expect(retrievedQuote).toEqual(createdQuote)
  })
})
```

## E2E Testing

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '__tests__/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    locale: 'es-AR',
    timezoneId: 'America/Argentina/Buenos_Aires'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] }
    }
  ]
})
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test'

test.describe('Quote Request Flow', () => {
  test('should complete quote request successfully', async ({ page }) => {
    await page.goto('/cotizacion')
    
    // Fill form
    await page.fill('[data-testid="client-name"]', 'Juan Pérez')
    await page.fill('[data-testid="client-email"]', 'juan@example.com')
    await page.selectOption('[data-testid="service-type"]', 'CORPORATE_WEB')
    
    // Submit form
    await page.click('[data-testid="submit-button"]')
    
    // Verify success page
    await expect(page).toHaveURL(/\/cotizacion\/exito/)
    await expect(page.locator('h1')).toContainText('Cotización enviada')
    
    // Verify quote number is displayed
    const quoteNumber = await page.locator('[data-testid="quote-number"]').textContent()
    expect(quoteNumber).toMatch(/COT-\d{8}/)
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/cotizacion')
    
    await page.click('[data-testid="submit-button"]')
    
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Este campo es obligatorio')
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Este campo es obligatorio')
  })
})
```

## Test Data and Fixtures

### Test Data Factory
```typescript
// __tests__/fixtures/quoteFactory.ts
export const createQuoteData = (overrides = {}) => ({
  clientName: 'Juan Pérez',
  clientEmail: 'juan@example.com',
  clientPhone: '+54 11 1234-5678',
  serviceType: 'CORPORATE_WEB',
  description: 'Sitio web corporativo para empresa de servicios',
  timeline: '4-6 weeks',
  budgetRange: '200000-300000',
  ...overrides
})

export const createQuoteResponse = (overrides = {}) => ({
  id: 'quote-123',
  quoteNumber: 'COT-20240101',
  accessToken: 'token-abc123',
  status: 'PENDING',
  estimatedPrice: 250000,
  createdAt: new Date('2024-01-01'),
  ...overrides
})
```

### Mock Services
```typescript
// __tests__/mocks/emailService.ts
export const mockEmailService = {
  sendQuoteNotification: jest.fn().mockResolvedValue({ success: true }),
  sendStatusUpdate: jest.fn().mockResolvedValue({ success: true }),
  sendReminder: jest.fn().mockResolvedValue({ success: true })
}

// __tests__/mocks/fileStorage.ts
export const mockFileStorage = {
  uploadFile: jest.fn().mockResolvedValue({ url: 'https://storage.example.com/file.jpg' }),
  deleteFile: jest.fn().mockResolvedValue({ success: true })
}
```

## Performance Testing

### Load Testing with Artillery
```yaml
# artillery.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Quote submission"
    flow:
      - post:
          url: "/api/quotes"
          json:
            clientName: "Test User"
            clientEmail: "test@example.com"
            serviceType: "CORPORATE_WEB"
```

## Accessibility Testing

### Automated A11y Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import { QuoteForm } from '@/components/QuoteForm'

expect.extend(toHaveNoViolations)

describe('QuoteForm Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<QuoteForm onSubmit={jest.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Test Configuration

### Jest Setup
```javascript
// jest.setup.js
import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn()
  }),
  usePathname: () => '/cotizacion'
}))

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.RESEND_API_KEY = 'test-key'
```

### Test Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:a11y": "jest --testPathPattern=a11y",
    "test:load": "artillery run artillery.yml"
  }
}
```

## Best Practices

### Do's
- ✅ Write tests in English (code) with Spanish user-facing content
- ✅ Use descriptive test names that explain the behavior
- ✅ Test user behavior, not implementation details
- ✅ Mock external dependencies (APIs, databases)
- ✅ Use data-testid for E2E test selectors
- ✅ Test error states and edge cases
- ✅ Keep tests fast and independent

### Don'ts
- ❌ Don't test third-party library internals
- ❌ Don't write tests that are too coupled to implementation
- ❌ Don't ignore flaky tests
- ❌ Don't test everything - focus on critical paths
- ❌ Don't use production data in tests
- ❌ Don't skip accessibility testing

## Coverage Goals

- **Unit Tests**: 80%+ coverage for business logic
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user journeys
- **Accessibility**: All interactive components