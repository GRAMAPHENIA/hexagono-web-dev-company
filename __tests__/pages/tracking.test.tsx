import { render, screen } from '@testing-library/react'
import TrackingPage from '@/app/cotizacion/seguimiento/[token]/page'

// Mock the QuoteTracker component
jest.mock('@/components/QuoteTracker', () => ({
  QuoteTracker: ({ token }: { token: string }) => (
    <div data-testid="quote-tracker">QuoteTracker with token: {token}</div>
  ),
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('TrackingPage', () => {
  const mockParams = {
    token: 'test-token-123',
  }

  it('should render the tracking page with correct title', () => {
    render(<TrackingPage params={mockParams} />)

    expect(screen.getByText('Seguimiento de Cotización')).toBeInTheDocument()
    expect(screen.getByText('Consulta el estado actual y el progreso de tu solicitud de cotización.')).toBeInTheDocument()
  })

  it('should render QuoteTracker component with correct token', () => {
    render(<TrackingPage params={mockParams} />)

    const quoteTracker = screen.getByTestId('quote-tracker')
    expect(quoteTracker).toBeInTheDocument()
    expect(quoteTracker).toHaveTextContent('QuoteTracker with token: test-token-123')
  })

  it('should render navigation links in header', () => {
    render(<TrackingPage params={mockParams} />)

    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Nueva Cotización')).toBeInTheDocument()
  })

  it('should render footer with contact information', () => {
    render(<TrackingPage params={mockParams} />)

    expect(screen.getByText('¿Necesitas ayuda? Contáctanos:')).toBeInTheDocument()
    expect(screen.getByText('contacto@hexagono.xyz')).toBeInTheDocument()
    expect(screen.getByText('+54 11 2378-2307')).toBeInTheDocument()
  })

  it('should render footer navigation links', () => {
    render(<TrackingPage params={mockParams} />)

    expect(screen.getByText('Contacto')).toBeInTheDocument()
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
  })

  it('should have correct link hrefs', () => {
    render(<TrackingPage params={mockParams} />)

    const homeLink = screen.getByText('Inicio').closest('a')
    const newQuoteLink = screen.getByText('Nueva Cotización').closest('a')
    const contactLink = screen.getByText('Contacto').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(newQuoteLink).toHaveAttribute('href', '/cotizacion')
    expect(contactLink).toHaveAttribute('href', '/contacto')
  })

  it('should render Hexágono Web branding', () => {
    render(<TrackingPage params={mockParams} />)

    const brandingElements = screen.getAllByText('Hexágono Web')
    expect(brandingElements.length).toBeGreaterThan(0)
  })

  it('should have responsive layout classes', () => {
    render(<TrackingPage params={mockParams} />)

    const mainContainer = screen.getByRole('main')
    expect(mainContainer).toHaveClass('container', 'mx-auto', 'px-4', 'py-8')

    const contentWrapper = mainContainer.querySelector('.max-w-4xl')
    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper).toHaveClass('mx-auto')
  })
})