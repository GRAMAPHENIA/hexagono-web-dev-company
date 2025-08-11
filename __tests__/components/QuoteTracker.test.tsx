import { render, screen, waitFor, act } from '@testing-library/react'
import { QuoteTracker } from '@/components/QuoteTracker'

// Mock fetch
global.fetch = jest.fn()

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => 'hace 2 horas'),
}))

const mockQuoteData = {
  id: 'quote-123',
  quoteNumber: 'HEX-2024-001',
  status: 'PENDING',
  priority: 'MEDIUM',
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z',
  estimatedResponseDate: '2024-01-03T10:00:00Z',
  clientName: 'Juan Pérez',
  serviceType: 'CORPORATE_WEB',
  estimatedPrice: 250000,
  timeline: '4-6 semanas',
  statusHistory: [
    {
      status: 'PENDING',
      createdAt: '2024-01-01T10:00:00Z',
      notes: 'Cotización recibida',
    },
  ],
  publicNotes: [
    {
      content: 'Revisaremos tu solicitud pronto',
      createdAt: '2024-01-01T10:30:00Z',
    },
  ],
}

describe('QuoteTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  it('should display loading state initially', () => {
    ;(fetch as jest.Mock).mockImplementation(() => new Promise(() => {}))

    render(<QuoteTracker token="test-token" />)

    expect(screen.getByText('Cargando información de seguimiento...')).toBeInTheDocument()
  })

  it('should display quote data when loaded successfully', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockQuoteData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Cotización #HEX-2024-001')).toBeInTheDocument()
    })

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Web Corporativa')).toBeInTheDocument()
    expect(screen.getByText('$250.000 ARS')).toBeInTheDocument()
    expect(screen.getByText('4-6 semanas')).toBeInTheDocument()
    expect(screen.getByText('Estado Actual: Pendiente')).toBeInTheDocument()
  })

  it('should display error message when fetch fails', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Cotización no encontrada' }),
    })

    render(<QuoteTracker token="invalid-token" />)

    await waitFor(() => {
      expect(screen.getByText('Cotización no encontrada')).toBeInTheDocument()
    })
  })

  it('should display status history when available', async () => {
    const dataWithHistory = {
      ...mockQuoteData,
      statusHistory: [
        {
          status: 'PENDING',
          createdAt: '2024-01-01T10:00:00Z',
          notes: 'Cotización recibida',
        },
        {
          status: 'IN_REVIEW',
          createdAt: '2024-01-01T12:00:00Z',
          notes: 'En proceso de revisión',
        },
      ],
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => dataWithHistory,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Historial de Estados')).toBeInTheDocument()
    })

    expect(screen.getByText('Pendiente')).toBeInTheDocument()
    expect(screen.getByText('En Revisión')).toBeInTheDocument()
    expect(screen.getByText('Cotización recibida')).toBeInTheDocument()
    expect(screen.getByText('En proceso de revisión')).toBeInTheDocument()
  })

  it('should display public notes when available', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockQuoteData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Notas y Actualizaciones')).toBeInTheDocument()
    })

    expect(screen.getByText('Revisaremos tu solicitud pronto')).toBeInTheDocument()
  })

  it('should show priority badge correctly', async () => {
    const highPriorityData = {
      ...mockQuoteData,
      priority: 'HIGH',
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => highPriorityData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Prioridad Alta')).toBeInTheDocument()
    })
  })

  it('should display different status configurations correctly', async () => {
    const quotedData = {
      ...mockQuoteData,
      status: 'QUOTED',
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => quotedData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Estado Actual: Cotizada')).toBeInTheDocument()
    })

    expect(screen.getByText('Tu cotización está lista. Revisa tu email para ver la propuesta.')).toBeInTheDocument()
  })

  it('should show estimated response time for pending quotes', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockQuoteData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Tiempo estimado de respuesta:')).toBeInTheDocument()
    })
  })

  it('should not show estimated response time for completed quotes', async () => {
    const completedData = {
      ...mockQuoteData,
      status: 'COMPLETED',
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => completedData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Estado Actual: Completada')).toBeInTheDocument()
    })

    expect(screen.queryByText('Tiempo estimado de respuesta:')).not.toBeInTheDocument()
  })

  it('should handle network errors gracefully', async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('should auto-refresh data every 30 seconds', async () => {
    jest.useFakeTimers()
    
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockQuoteData,
    })

    render(<QuoteTracker token="test-token" />)

    // Initial fetch
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    // Fast-forward 30 seconds
    act(() => {
      jest.advanceTimersByTime(30000)
    })

    // Should fetch again
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    jest.useRealTimers()
  })

  it('should display auto-refresh indicator', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockQuoteData,
    })

    render(<QuoteTracker token="test-token" />)

    await waitFor(() => {
      expect(screen.getByText('Esta página se actualiza automáticamente cada 30 segundos')).toBeInTheDocument()
    })
  })
})