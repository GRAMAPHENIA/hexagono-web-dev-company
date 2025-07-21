---
inclusion: fileMatch
fileMatchPattern: "app/api/**/*"
---

# API Design Guidelines - Hexágono Web

## General Principles

- **RESTful Design**: Follow REST conventions
- **Consistent Responses**: Standardized response format
- **Error Handling**: Clear, actionable error messages
- **Security First**: Authentication, validation, rate limiting
- **Performance**: Efficient queries and caching

## Route Structure

### Next.js 15 App Router API Routes
```
app/api/
├── quotes/
│   ├── route.ts              # GET /api/quotes, POST /api/quotes
│   ├── [id]/
│   │   ├── route.ts         # GET, PATCH, DELETE /api/quotes/[id]
│   │   ├── status/route.ts  # PATCH /api/quotes/[id]/status
│   │   └── notes/route.ts   # POST /api/quotes/[id]/notes
│   ├── track/
│   │   └── [token]/route.ts # GET /api/quotes/track/[token]
│   └── admin/
│       ├── route.ts         # GET /api/quotes/admin
│       └── reports/route.ts # GET /api/quotes/admin/reports
├── upload/
│   └── route.ts             # POST /api/upload
├── pricing/
│   └── calculate/route.ts   # POST /api/pricing/calculate
└── auth/
    └── [...nextauth]/route.ts
```

## Request/Response Format

### Standard Response Structure
```typescript
// Success Response
interface ApiResponse<T> {
  success: true
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    hasMore?: boolean
  }
}

// Error Response
interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
  timestamp: string
  path: string
}

// Example implementations
export function createSuccessResponse<T>(
  data: T, 
  message?: string,
  meta?: any
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    meta
  }
}

export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, string[]>,
  path?: string
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: new Date().toISOString(),
    path: path || ''
  }
}
```

### HTTP Status Codes
```typescript
// Success codes
200 // OK - Successful GET, PATCH
201 // Created - Successful POST
204 // No Content - Successful DELETE

// Client error codes
400 // Bad Request - Validation errors
401 // Unauthorized - Authentication required
403 // Forbidden - Insufficient permissions
404 // Not Found - Resource doesn't exist
409 // Conflict - Resource already exists
422 // Unprocessable Entity - Validation failed
429 // Too Many Requests - Rate limit exceeded

// Server error codes
500 // Internal Server Error - Unexpected server error
502 // Bad Gateway - External service error
503 // Service Unavailable - Temporary unavailability
```

## Route Handlers

### GET Endpoints
```typescript
// app/api/quotes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getQuotes } from '@/lib/quotes'
import { createSuccessResponse, createErrorResponse } from '@/lib/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const result = await getQuotes({
      page,
      limit,
      status: status as QuoteStatus
    })

    return NextResponse.json(
      createSuccessResponse(result.quotes, undefined, {
        page,
        limit,
        total: result.total,
        hasMore: result.hasMore
      })
    )
  } catch (error) {
    console.error('Failed to fetch quotes:', error)
    return NextResponse.json(
      createErrorResponse('FETCH_QUOTES_ERROR', 'Failed to fetch quotes'),
      { status: 500 }
    )
  }
}
```

### POST Endpoints
```typescript
// app/api/quotes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createQuote } from '@/lib/quotes'
import { quoteSchema } from '@/lib/validations'
import { createSuccessResponse, createErrorResponse } from '@/lib/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = quoteSchema.safeParse(body)
    if (!validationResult.success) {
      const details = validationResult.error.flatten().fieldErrors
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Invalid request data',
          details
        ),
        { status: 400 }
      )
    }

    const quote = await createQuote(validationResult.data)

    return NextResponse.json(
      createSuccessResponse(
        quote,
        'Quote created successfully'
      ),
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof QuoteValidationError) {
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', error.message),
        { status: 400 }
      )
    }

    console.error('Failed to create quote:', error)
    return NextResponse.json(
      createErrorResponse('CREATE_QUOTE_ERROR', 'Failed to create quote'),
      { status: 500 }
    )
  }
}
```

### PATCH Endpoints
```typescript
// app/api/quotes/[id]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Validate quote exists
    const existingQuote = await getQuoteById(id)
    if (!existingQuote) {
      return NextResponse.json(
        createErrorResponse('QUOTE_NOT_FOUND', 'Quote not found'),
        { status: 404 }
      )
    }

    // Validate update data
    const validationResult = updateQuoteSchema.safeParse(body)
    if (!validationResult.success) {
      const details = validationResult.error.flatten().fieldErrors
      return NextResponse.json(
        createErrorResponse('VALIDATION_ERROR', 'Invalid update data', details),
        { status: 400 }
      )
    }

    const updatedQuote = await updateQuote(id, validationResult.data)

    return NextResponse.json(
      createSuccessResponse(updatedQuote, 'Quote updated successfully')
    )
  } catch (error) {
    console.error('Failed to update quote:', error)
    return NextResponse.json(
      createErrorResponse('UPDATE_QUOTE_ERROR', 'Failed to update quote'),
      { status: 500 }
    )
  }
}
```

## Validation with Zod

### Request Schemas
```typescript
// lib/validations/quote.ts
import { z } from 'zod'

export const quoteSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Invalid email format'),
  clientPhone: z.string().optional(),
  clientCompany: z.string().optional(),
  serviceType: z.enum(['LANDING_PAGE', 'CORPORATE_WEB', 'ECOMMERCE']),
  description: z.string().max(1000, 'Description too long'),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
  features: z.array(z.string()).default([])
})

export const updateQuoteSchema = quoteSchema.partial().extend({
  status: z.enum(['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED']).optional()
})

export const quoteQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.enum(['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED']).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'clientName']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})
```

## Authentication & Authorization

### Middleware for Protected Routes
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Protect admin API routes
  if (request.nextUrl.pathname.startsWith('/api/quotes/admin')) {
    const token = await getToken({ req: request })
    
    if (!token) {
      return NextResponse.json(
        createErrorResponse('UNAUTHORIZED', 'Authentication required'),
        { status: 401 }
      )
    }

    // Check admin role
    if (token.role !== 'admin') {
      return NextResponse.json(
        createErrorResponse('FORBIDDEN', 'Admin access required'),
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/quotes/admin/:path*']
}
```

### Rate Limiting
```typescript
// lib/rateLimit.ts
import { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit = 10, window = 60000) {
  const ip = request.ip || 'anonymous'
  const now = Date.now()
  const windowStart = now - window

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip)
  const recentRequests = requests.filter((time: number) => time > windowStart)
  
  if (recentRequests.length >= limit) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

// Usage in API route
export async function POST(request: NextRequest) {
  if (!rateLimit(request, 5, 60000)) { // 5 requests per minute
    return NextResponse.json(
      createErrorResponse('RATE_LIMIT_EXCEEDED', 'Too many requests'),
      { status: 429 }
    )
  }
  
  // Continue with request handling
}
```

## Database Operations

### Repository Pattern
```typescript
// lib/repositories/quoteRepository.ts
import { PrismaClient, Quote, Prisma } from '@prisma/client'

export class QuoteRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.QuoteCreateInput): Promise<Quote> {
    return this.prisma.quote.create({
      data,
      include: {
        features: true,
        attachments: true
      }
    })
  }

  async findById(id: string): Promise<Quote | null> {
    return this.prisma.quote.findUnique({
      where: { id },
      include: {
        features: true,
        attachments: true,
        notes: true
      }
    })
  }

  async findMany(params: {
    page: number
    limit: number
    status?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }) {
    const { page, limit, status, sortBy = 'createdAt', sortOrder = 'desc' } = params
    const skip = (page - 1) * limit

    const where: Prisma.QuoteWhereInput = status ? { status } : {}

    const [quotes, total] = await Promise.all([
      this.prisma.quote.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          features: true,
          attachments: true
        }
      }),
      this.prisma.quote.count({ where })
    ])

    return {
      quotes,
      total,
      hasMore: skip + quotes.length < total
    }
  }

  async update(id: string, data: Prisma.QuoteUpdateInput): Promise<Quote> {
    return this.prisma.quote.update({
      where: { id },
      data,
      include: {
        features: true,
        attachments: true
      }
    })
  }

  async delete(id: string): Promise<Quote> {
    return this.prisma.quote.delete({
      where: { id }
    })
  }
}
```

## Error Handling

### Custom Error Classes
```typescript
// lib/errors.ts
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, string[]>) {
    super('VALIDATION_ERROR', message, 400, details)
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required') {
    super('UNAUTHORIZED', message, 401)
  }
}
```

### Global Error Handler
```typescript
// lib/errorHandler.ts
import { NextResponse } from 'next/server'
import { ApiError } from './errors'
import { createErrorResponse } from './api'

export function handleApiError(error: unknown, path?: string): NextResponse {
  console.error('API Error:', error)

  if (error instanceof ApiError) {
    return NextResponse.json(
      createErrorResponse(error.code, error.message, error.details, path),
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Internal server error', undefined, path),
      { status: 500 }
    )
  }

  return NextResponse.json(
    createErrorResponse('UNKNOWN_ERROR', 'An unexpected error occurred', undefined, path),
    { status: 500 }
  )
}
```

## Logging and Monitoring

### Structured Logging
```typescript
// lib/logger.ts
interface LogContext {
  userId?: string
  quoteId?: string
  action?: string
  duration?: number
  [key: string]: any
}

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...context
    }))
  },

  error: (message: string, error?: Error, context?: LogContext) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      ...context
    }))
  },

  warn: (message: string, context?: LogContext) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...context
    }))
  }
}

// Usage in API routes
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    logger.info('Creating new quote', { action: 'create_quote' })
    
    const quote = await createQuote(data)
    
    logger.info('Quote created successfully', {
      action: 'create_quote',
      quoteId: quote.id,
      duration: Date.now() - startTime
    })
    
    return NextResponse.json(createSuccessResponse(quote))
  } catch (error) {
    logger.error('Failed to create quote', error as Error, {
      action: 'create_quote',
      duration: Date.now() - startTime
    })
    
    return handleApiError(error)
  }
}
```

## Testing API Routes

### API Route Testing
```typescript
// __tests__/api/quotes.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from '@/app/api/quotes/route'

describe('/api/quotes', () => {
  describe('POST', () => {
    it('should create a new quote with valid data', async () => {
      const mockRequest = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com',
          serviceType: 'CORPORATE_WEB'
        })
      })

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toHaveProperty('quoteNumber')
    })

    it('should return validation error for invalid data', async () => {
      const mockRequest = new Request('http://localhost:3000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: '',
          clientEmail: 'invalid-email'
        })
      })

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error.code).toBe('VALIDATION_ERROR')
    })
  })
})
```