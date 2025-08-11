'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Calculator, Send, Paperclip } from 'lucide-react'
import { quoteFormDataSchema } from '@/lib/validations/quote'
import { QuoteFormData, ServiceType } from '@/lib/types/quote'
import { PriceCalculator } from './PriceCalculator'
import { FileUpload } from './FileUpload'
import { toast } from 'sonner'

interface QuoteRequestFormProps {
  onSubmit: (data: QuoteFormData) => Promise<void>
  isSubmitting?: boolean
}

const serviceTypeOptions = [
  {
    value: 'LANDING_PAGE' as ServiceType,
    label: 'Landing Page',
    description: 'Página web de presentación para tu negocio'
  },
  {
    value: 'CORPORATE_WEB' as ServiceType,
    label: 'Web Corporativa',
    description: 'Sitio web completo para empresas'
  },
  {
    value: 'ECOMMERCE' as ServiceType,
    label: 'Tienda Online',
    description: 'Plataforma de comercio electrónico'
  },
  {
    value: 'SOCIAL_MEDIA' as ServiceType,
    label: 'Gestión de Redes Sociales',
    description: 'Manejo profesional de redes sociales'
  }
]

const availableFeatures = {
  LANDING_PAGE: [
    { id: 'seo-optimization', label: 'Optimización SEO', description: 'Mejora tu posicionamiento en Google' },
    { id: 'responsive-design', label: 'Diseño Responsive', description: 'Adaptado a móviles y tablets' },
    { id: 'contact-forms', label: 'Formularios de Contacto', description: 'Captura leads efectivamente' },
    { id: 'google-analytics', label: 'Google Analytics', description: 'Seguimiento de visitantes' },
    { id: 'social-media-integration', label: 'Integración Redes Sociales', description: 'Conecta con tus redes' }
  ],
  CORPORATE_WEB: [
    { id: 'seo-optimization', label: 'Optimización SEO', description: 'Mejora tu posicionamiento en Google' },
    { id: 'responsive-design', label: 'Diseño Responsive', description: 'Adaptado a móviles y tablets' },
    { id: 'cms-integration', label: 'Sistema de Gestión', description: 'Actualiza contenido fácilmente' },
    { id: 'blog-functionality', label: 'Blog Integrado', description: 'Publica artículos y noticias' },
    { id: 'contact-forms', label: 'Formularios de Contacto', description: 'Múltiples formularios personalizados' },
    { id: 'google-analytics', label: 'Google Analytics', description: 'Análisis detallado de tráfico' },
    { id: 'multilingual', label: 'Sitio Multiidioma', description: 'Disponible en varios idiomas' }
  ],
  ECOMMERCE: [
    { id: 'payment-gateway', label: 'Pasarela de Pagos', description: 'Mercado Pago, Stripe, etc.' },
    { id: 'inventory-management', label: 'Gestión de Inventario', description: 'Control de stock automático' },
    { id: 'shopping-cart', label: 'Carrito de Compras', description: 'Experiencia de compra optimizada' },
    { id: 'product-catalog', label: 'Catálogo de Productos', description: 'Organización profesional' },
    { id: 'order-management', label: 'Gestión de Pedidos', description: 'Panel administrativo completo' },
    { id: 'shipping-integration', label: 'Integración de Envíos', description: 'Correo Argentino, OCA, etc.' },
    { id: 'seo-optimization', label: 'SEO para E-commerce', description: 'Optimización para ventas online' }
  ],
  SOCIAL_MEDIA: [
    { id: 'social-media-integration', label: 'Gestión Multiplataforma', description: 'Facebook, Instagram, Twitter' },
    { id: 'google-analytics', label: 'Analytics Avanzado', description: 'Métricas de engagement' },
    { id: 'newsletter-integration', label: 'Email Marketing', description: 'Campañas automatizadas' },
    { id: 'blog-functionality', label: 'Blog de Contenidos', description: 'Estrategia de content marketing' }
  ]
}

export function QuoteRequestForm({ onSubmit, isSubmitting = false }: QuoteRequestFormProps) {
  const [showPriceCalculator, setShowPriceCalculator] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormDataSchema),
    defaultValues: {
      clientInfo: {
        name: '',
        email: '',
        phone: '',
        company: ''
      },
      projectDetails: {
        serviceType: undefined,
        timeline: '',
        budgetRange: '',
        description: '',
        features: [],
        additionalRequirements: ''
      },
      attachments: []
    }
  })

  const selectedServiceType = form.watch('projectDetails.serviceType')
  const selectedFeatures = form.watch('projectDetails.features')

  const handleSubmit = async (data: QuoteFormData) => {
    try {
      // Include attached files in the submission
      const dataWithFiles = {
        ...data,
        attachments: attachedFiles
      }
      await onSubmit(dataWithFiles)
      form.reset()
      setAttachedFiles([])
    } catch (error) {
      // Error handling is done in the wrapper component
      console.error('Form submission error:', error)
    }
  }

  const handleFilesChange = (files: File[]) => {
    setAttachedFiles(files)
  }

  const currentFeatures = selectedServiceType ? availableFeatures[selectedServiceType] : []

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Solicitar Cotización</CardTitle>
          <CardDescription>
            Completa el formulario y te enviaremos una propuesta personalizada en menos de 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Información del Cliente */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Información de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clientInfo.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre completo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientInfo.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+54 11 1234-5678" {...field} />
                        </FormControl>
                        <FormDescription>
                          Opcional - Para contacto más rápido
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="clientInfo.company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de tu empresa" {...field} />
                        </FormControl>
                        <FormDescription>
                          Opcional
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Detalles del Proyecto */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Detalles del Proyecto</h3>
                
                <FormField
                  control={form.control}
                  name="projectDetails.serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Servicio *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de servicio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-sm text-muted-foreground">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Características Dinámicas */}
                {selectedServiceType && (
                  <FormField
                    control={form.control}
                    name="projectDetails.features"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Características Deseadas</FormLabel>
                          <FormDescription>
                            Selecciona las funcionalidades que necesitas para tu proyecto
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentFeatures.map((feature) => (
                            <FormField
                              key={feature.id}
                              control={form.control}
                              name="projectDetails.features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, feature.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== feature.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="font-medium">
                                        {feature.label}
                                      </FormLabel>
                                      <FormDescription>
                                        {feature.description}
                                      </FormDescription>
                                    </div>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectDetails.timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeline Deseado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Cuándo necesitas el proyecto?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2 weeks">1-2 semanas</SelectItem>
                            <SelectItem value="3-4 weeks">3-4 semanas</SelectItem>
                            <SelectItem value="1-2 months">1-2 meses</SelectItem>
                            <SelectItem value="2+ months">Más de 2 meses</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectDetails.budgetRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rango de Presupuesto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="¿Cuál es tu presupuesto aproximado?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="$100.000 - $200.000">$100.000 - $200.000</SelectItem>
                            <SelectItem value="$200.000 - $350.000">$200.000 - $350.000</SelectItem>
                            <SelectItem value="$350.000 - $500.000">$350.000 - $500.000</SelectItem>
                            <SelectItem value="$500.000+">Más de $500.000</SelectItem>
                            <SelectItem value="to-discuss">A discutir</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectDetails.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción del Proyecto</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos más sobre tu proyecto, objetivos, público objetivo, etc."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Opcional - Cualquier información adicional que nos ayude a entender mejor tu proyecto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDetails.additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requerimientos Adicionales</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Integraciones específicas, funcionalidades especiales, restricciones técnicas, etc."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Opcional - Menciona cualquier requerimiento técnico específico
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Archivos Adjuntos */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    Archivos de Referencia
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Opcional - Sube imágenes, documentos o referencias que nos ayuden a entender mejor tu proyecto
                  </p>
                </div>
                
                <FileUpload
                  onFilesChange={handleFilesChange}
                  maxFiles={5}
                  maxFileSize={10}
                  acceptedTypes={[
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  ]}
                />
              </div>

              {/* Calculadora de Precio */}
              {selectedServiceType && selectedFeatures.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Estimación de Precio</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPriceCalculator(!showPriceCalculator)}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      {showPriceCalculator ? 'Ocultar' : 'Ver'} Estimación
                    </Button>
                  </div>
                  
                  {showPriceCalculator && (
                    <PriceCalculator
                      serviceType={selectedServiceType}
                      features={selectedFeatures}
                      customRequirements={form.watch('projectDetails.additionalRequirements')}
                    />
                  )}
                </div>
              )}

              {/* Botón de Envío */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Cotización
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}