import { z } from 'zod'

// Service type validation
export const serviceTypeSchema = z.enum(['LANDING_PAGE', 'CORPORATE_WEB', 'ECOMMERCE', 'SOCIAL_MEDIA'])

// Quote status validation
export const quoteStatusSchema = z.enum(['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED'])

// Priority validation
export const prioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])

// Client info validation
export const clientInfoSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Ingrese un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]{8,20}$/, 'Ingrese un teléfono válido')
    .or(z.literal(''))
    .optional(),
  company: z.string()
    .max(255, 'El nombre de la empresa no puede exceder 255 caracteres')
    .optional()
})

// Project details validation
export const projectDetailsSchema = z.object({
  serviceType: serviceTypeSchema,
  timeline: z.string()
    .max(100, 'El timeline no puede exceder 100 caracteres')
    .optional(),
  budgetRange: z.string()
    .max(100, 'El rango de presupuesto no puede exceder 100 caracteres')
    .optional(),
  description: z.string()
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .optional(),
  features: z.array(z.string())
    .max(20, 'No se pueden seleccionar más de 20 características'),
  additionalRequirements: z.string()
    .max(1000, 'Los requerimientos adicionales no pueden exceder 1000 caracteres')
    .optional()
})

// Uploaded file attachment schema
export const uploadedAttachmentSchema = z.object({
  filename: z.string(),
  originalName: z.string(),
  url: z.string().url(),
  size: z.number(),
  mimeType: z.string()
})

// Quote form data validation (for client-side with File objects)
export const quoteFormDataSchema = z.object({
  clientInfo: clientInfoSchema,
  projectDetails: projectDetailsSchema,
  attachments: z.array(z.instanceof(File))
    .max(5, 'No se pueden adjuntar más de 5 archivos')
    .optional()
})

// Quote submission data validation (for server-side with uploaded file info)
export const quoteSubmissionSchema = z.object({
  clientInfo: clientInfoSchema,
  projectDetails: projectDetailsSchema,
  attachments: z.array(uploadedAttachmentSchema)
    .max(5, 'No se pueden adjuntar más de 5 archivos')
    .optional()
})

// Feature cost validation
export const featureCostSchema = z.object({
  name: z.string().min(1, 'El nombre de la característica es obligatorio'),
  cost: z.number().min(0, 'El costo no puede ser negativo')
})

// Price estimate validation
export const priceEstimateSchema = z.object({
  basePrice: z.number().min(0, 'El precio base no puede ser negativo'),
  additionalFeatures: z.array(featureCostSchema),
  totalEstimate: z.number().min(0, 'El total estimado no puede ser negativo'),
  currency: z.literal('ARS'),
  disclaimer: z.string()
})

// Complete quote validation
export const quoteSchema = z.object({
  id: z.string().uuid('ID inválido'),
  quoteNumber: z.string()
    .regex(/^COT-\d{8}-\d{4}$/, 'Formato de número de cotización inválido'),
  clientInfo: clientInfoSchema,
  projectDetails: projectDetailsSchema,
  estimatedPrice: z.number().min(0).optional(),
  status: quoteStatusSchema,
  priority: prioritySchema,
  assignedTo: z.string().optional(),
  accessToken: z.string().min(32, 'Token de acceso inválido'),
  createdAt: z.date(),
  updatedAt: z.date()
})

// File validation for uploads
export const fileValidationSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'El archivo no debe superar los 10MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Tipo de archivo no permitido. Solo se permiten JPG, PNG, PDF y DOC'
    )
})

// Validation functions
export function validateQuoteFormData(data: unknown) {
  return quoteFormDataSchema.safeParse(data)
}

export function validateQuoteSubmission(data: unknown) {
  return quoteSubmissionSchema.safeParse(data)
}

export function validateClientInfo(data: unknown) {
  return clientInfoSchema.safeParse(data)
}

export function validateProjectDetails(data: unknown) {
  return projectDetailsSchema.safeParse(data)
}

export function validatePriceEstimate(data: unknown) {
  return priceEstimateSchema.safeParse(data)
}

export function validateFile(file: File) {
  return fileValidationSchema.safeParse({ file })
}

export function validateQuote(data: unknown) {
  return quoteSchema.safeParse(data)
}