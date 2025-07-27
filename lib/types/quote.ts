// Core types for the quote system

export type ServiceType = 'LANDING_PAGE' | 'CORPORATE_WEB' | 'ECOMMERCE' | 'SOCIAL_MEDIA'

export type QuoteStatus = 'PENDING' | 'IN_REVIEW' | 'QUOTED' | 'COMPLETED' | 'CANCELLED'

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface ClientInfo {
  name: string
  email: string
  phone?: string
  company?: string
}

export interface ProjectDetails {
  serviceType: ServiceType
  timeline?: string
  budgetRange?: string
  description?: string
  features: string[]
  additionalRequirements?: string
}

export interface QuoteFormData {
  clientInfo: ClientInfo
  projectDetails: ProjectDetails
  attachments?: File[]
}

export interface FeatureCost {
  name: string
  cost: number
}

export interface PriceEstimate {
  basePrice: number
  additionalFeatures: FeatureCost[]
  totalEstimate: number
  currency: 'ARS'
  disclaimer: string
}

export interface Quote {
  id: string
  quoteNumber: string
  clientInfo: ClientInfo
  projectDetails: ProjectDetails
  estimatedPrice?: number
  status: QuoteStatus
  priority: Priority
  assignedTo?: string
  accessToken: string
  createdAt: Date
  updatedAt: Date
}

export interface QuoteFeature {
  id: string
  quoteId: string
  featureName: string
  featureCost: number
  createdAt: Date
}

export interface QuoteAttachment {
  id: string
  quoteId: string
  filename: string
  originalName: string
  fileSize: number
  mimeType: string
  storageUrl: string
  createdAt: Date
}

export interface QuoteNote {
  id: string
  quoteId: string
  author: string
  note: string
  isInternal: boolean
  createdAt: Date
}

export interface QuoteStatusHistory {
  id: string
  quoteId: string
  previousStatus?: QuoteStatus
  newStatus: QuoteStatus
  changedBy: string
  notes?: string
  createdAt: Date
}