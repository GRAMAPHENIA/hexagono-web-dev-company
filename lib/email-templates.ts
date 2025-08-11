import { QuoteEmailData, formatPriceForEmail, getServiceTypeDisplayName } from './email'

/**
 * Email template for new quote notification to client
 */
export function createClientQuoteConfirmationTemplate(data: QuoteEmailData) {
  const { quoteNumber, clientName, serviceType, estimatedPrice, trackingUrl } = data
  
  const serviceDisplayName = getServiceTypeDisplayName(serviceType)
  const priceText = estimatedPrice ? formatPriceForEmail(estimatedPrice) : 'A consultar'
  
  const subject = `Cotización ${quoteNumber} - ${serviceDisplayName} - Hexágono Web`
  
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .quote-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .contact-info { background: #e8f2ff; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>¡Gracias por tu solicitud de cotización!</h1>
        <p>Hemos recibido tu consulta y la estamos procesando</p>
      </div>
      
      <div class="content">
        <p>Hola <strong>${clientName}</strong>,</p>
        
        <p>Hemos recibido tu solicitud de cotización para <strong>${serviceDisplayName}</strong>. Nuestro equipo está revisando los detalles de tu proyecto y te responderemos dentro de las próximas 24-48 horas.</p>
        
        <div class="quote-details">
          <h3>Detalles de tu cotización:</h3>
          <ul>
            <li><strong>Número de cotización:</strong> ${quoteNumber}</li>
            <li><strong>Servicio solicitado:</strong> ${serviceDisplayName}</li>
            <li><strong>Estimación preliminar:</strong> ${priceText}</li>
            <li><strong>Estado:</strong> En revisión</li>
          </ul>
        </div>
        
        <p>Puedes hacer seguimiento del estado de tu cotización en cualquier momento:</p>
        
        <a href="${trackingUrl}" class="cta-button">Ver Estado de mi Cotización</a>
        
        <div class="contact-info">
          <h4>¿Necesitas contactarnos?</h4>
          <p>
            📧 Email: contacto@hexagono.xyz<br>
            📱 WhatsApp: +54 11 2378-2307<br>
            🌐 Web: https://hexagono.xyz
          </p>
        </div>
        
        <p>Gracias por confiar en Hexágono Web para tu proyecto digital.</p>
        
        <p>Saludos cordiales,<br>
        <strong>El equipo de Hexágono Web</strong></p>
      </div>
      
      <div class="footer">
        <p>Este email fue enviado automáticamente. Por favor no respondas a este mensaje.</p>
        <p>© ${new Date().getFullYear()} Hexágono Web - Desarrollo web y gestión de redes sociales</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    ¡Gracias por tu solicitud de cotización!
    
    Hola ${clientName},
    
    Hemos recibido tu solicitud de cotización para ${serviceDisplayName}. 
    
    Detalles de tu cotización:
    - Número de cotización: ${quoteNumber}
    - Servicio solicitado: ${serviceDisplayName}
    - Estimación preliminar: ${priceText}
    - Estado: En revisión
    
    Puedes hacer seguimiento en: ${trackingUrl}
    
    Te responderemos dentro de las próximas 24-48 horas.
    
    Contacto:
    Email: contacto@hexagono.xyz
    WhatsApp: +54 11 2378-2307
    Web: https://hexagono.xyz
    
    Saludos,
    El equipo de Hexágono Web
  `
  
  return { subject, html, text }
}

/**
 * Email template for new quote notification to admin
 */
export function createAdminQuoteNotificationTemplate(data: QuoteEmailData) {
  const { quoteNumber, clientName, clientEmail, serviceType, estimatedPrice, adminUrl } = data
  
  const serviceDisplayName = getServiceTypeDisplayName(serviceType)
  const priceText = estimatedPrice ? formatPriceForEmail(estimatedPrice) : 'A consultar'
  const isHighPriority = estimatedPrice && estimatedPrice > 300000
  
  const subject = `${isHighPriority ? '🔥 URGENTE - ' : ''}Nueva Cotización ${quoteNumber} - ${serviceDisplayName}`
  
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${isHighPriority ? '#dc2626' : '#059669'}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .quote-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${isHighPriority ? '#dc2626' : '#059669'}; }
        .client-info { background: #e8f2ff; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .cta-button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .priority-high { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${isHighPriority ? '🔥 COTIZACIÓN URGENTE' : '📋 Nueva Cotización'}</h1>
        <p>Se ha recibido una nueva solicitud de cotización</p>
      </div>
      
      <div class="content">
        ${isHighPriority ? `
        <div class="priority-high">
          <h3>⚠️ ALTA PRIORIDAD</h3>
          <p>Esta cotización supera los $300.000 ARS y requiere atención inmediata.</p>
        </div>
        ` : ''}
        
        <div class="quote-details">
          <h3>Detalles de la cotización:</h3>
          <ul>
            <li><strong>Número:</strong> ${quoteNumber}</li>
            <li><strong>Servicio:</strong> ${serviceDisplayName}</li>
            <li><strong>Estimación:</strong> ${priceText}</li>
            <li><strong>Prioridad:</strong> ${isHighPriority ? 'ALTA' : 'Media'}</li>
            <li><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-AR')}</li>
          </ul>
        </div>
        
        <div class="client-info">
          <h3>Información del cliente:</h3>
          <ul>
            <li><strong>Nombre:</strong> ${clientName}</li>
            <li><strong>Email:</strong> ${clientEmail}</li>
          </ul>
        </div>
        
        <a href="${adminUrl || '#'}" class="cta-button">Ver Cotización Completa</a>
        
        <p><strong>Próximos pasos:</strong></p>
        <ol>
          <li>Revisar los detalles completos en el panel administrativo</li>
          <li>Contactar al cliente dentro de las próximas 24 horas</li>
          <li>Actualizar el estado de la cotización</li>
          <li>Enviar propuesta personalizada</li>
        </ol>
      </div>
      
      <div class="footer">
        <p>Sistema de Cotizaciones - Hexágono Web</p>
        <p>Generado automáticamente el ${new Date().toLocaleString('es-AR')}</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    ${isHighPriority ? '🔥 COTIZACIÓN URGENTE' : 'Nueva Cotización'} - ${quoteNumber}
    
    Se ha recibido una nueva solicitud de cotización:
    
    Detalles:
    - Número: ${quoteNumber}
    - Servicio: ${serviceDisplayName}
    - Estimación: ${priceText}
    - Prioridad: ${isHighPriority ? 'ALTA' : 'Media'}
    
    Cliente:
    - Nombre: ${clientName}
    - Email: ${clientEmail}
    
    ${isHighPriority ? 'ATENCIÓN: Esta cotización supera los $300.000 ARS y requiere respuesta inmediata.' : ''}
    
    Ver detalles completos: ${adminUrl || 'Panel administrativo'}
    
    Sistema de Cotizaciones - Hexágono Web
  `
  
  return { subject, html, text }
}

/**
 * Email template for quote status update notification to client
 */
export function createQuoteStatusUpdateTemplate(
  data: QuoteEmailData & { 
    newStatus: string
    statusMessage?: string
    previousStatus?: string
  }
) {
  const { quoteNumber, clientName, serviceType, newStatus, statusMessage, trackingUrl } = data
  
  const serviceDisplayName = getServiceTypeDisplayName(serviceType)
  
  const statusDisplayNames = {
    PENDING: 'Pendiente',
    IN_REVIEW: 'En revisión',
    QUOTED: 'Cotizada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
  }
  
  const statusDisplay = statusDisplayNames[newStatus as keyof typeof statusDisplayNames] || newStatus
  
  const subject = `Actualización de cotización ${quoteNumber} - ${statusDisplay}`
  
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .status-update { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .contact-info { background: #e8f2ff; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Actualización de tu cotización</h1>
        <p>Tu cotización ${quoteNumber} ha sido actualizada</p>
      </div>
      
      <div class="content">
        <p>Hola <strong>${clientName}</strong>,</p>
        
        <p>Te informamos que el estado de tu cotización para <strong>${serviceDisplayName}</strong> ha sido actualizado.</p>
        
        <div class="status-update">
          <h3>📋 Estado actual: <strong>${statusDisplay}</strong></h3>
          ${statusMessage ? `<p><strong>Mensaje:</strong> ${statusMessage}</p>` : ''}
          <p><strong>Cotización:</strong> ${quoteNumber}</p>
          <p><strong>Servicio:</strong> ${serviceDisplayName}</p>
          <p><strong>Actualizado:</strong> ${new Date().toLocaleString('es-AR')}</p>
        </div>
        
        <p>Puedes ver todos los detalles y el historial completo de tu cotización:</p>
        
        <a href="${trackingUrl}" class="cta-button">Ver Estado Completo</a>
        
        ${newStatus === 'QUOTED' ? `
        <div class="contact-info">
          <h4>🎉 ¡Tu cotización está lista!</h4>
          <p>Hemos preparado una propuesta personalizada para tu proyecto. Te contactaremos pronto con todos los detalles.</p>
        </div>
        ` : ''}
        
        ${newStatus === 'COMPLETED' ? `
        <div class="contact-info">
          <h4>✅ ¡Cotización completada!</h4>
          <p>Gracias por confiar en Hexágono Web. Esperamos trabajar contigo en tu próximo proyecto.</p>
        </div>
        ` : ''}
        
        <div class="contact-info">
          <h4>¿Tienes preguntas?</h4>
          <p>
            📧 Email: contacto@hexagono.xyz<br>
            📱 WhatsApp: +54 11 2378-2307<br>
            🌐 Web: https://hexagono.xyz
          </p>
        </div>
        
        <p>Saludos cordiales,<br>
        <strong>El equipo de Hexágono Web</strong></p>
      </div>
      
      <div class="footer">
        <p>Este email fue enviado automáticamente. Por favor no respondas a este mensaje.</p>
        <p>© ${new Date().getFullYear()} Hexágono Web - Desarrollo web y gestión de redes sociales</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Actualización de cotización ${quoteNumber}
    
    Hola ${clientName},
    
    El estado de tu cotización para ${serviceDisplayName} ha sido actualizado.
    
    Estado actual: ${statusDisplay}
    ${statusMessage ? `Mensaje: ${statusMessage}` : ''}
    
    Ver detalles completos: ${trackingUrl}
    
    ${newStatus === 'QUOTED' ? '¡Tu cotización está lista! Te contactaremos pronto con la propuesta.' : ''}
    ${newStatus === 'COMPLETED' ? '¡Cotización completada! Gracias por confiar en Hexágono Web.' : ''}
    
    Contacto:
    Email: contacto@hexagono.xyz
    WhatsApp: +54 11 2378-2307
    
    Saludos,
    El equipo de Hexágono Web
  `
  
  return { subject, html, text }
}

/**
 * Email template for reminder notification (48 hours)
 */
export function createReminderTemplate(data: QuoteEmailData) {
  const { quoteNumber, clientName, serviceType, trackingUrl } = data
  
  const serviceDisplayName = getServiceTypeDisplayName(serviceType)
  
  const subject = `Recordatorio: Tu cotización ${quoteNumber} está siendo procesada`
  
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .reminder-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta-button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .contact-info { background: #e8f2ff; padding: 15px; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⏰ Recordatorio de cotización</h1>
        <p>Estamos trabajando en tu solicitud</p>
      </div>
      
      <div class="content">
        <p>Hola <strong>${clientName}</strong>,</p>
        
        <div class="reminder-box">
          <h3>📋 Tu cotización está en proceso</h3>
          <p>Queremos recordarte que tu solicitud de cotización <strong>${quoteNumber}</strong> para <strong>${serviceDisplayName}</strong> está siendo procesada por nuestro equipo.</p>
        </div>
        
        <p>Nuestros especialistas están revisando cuidadosamente los detalles de tu proyecto para ofrecerte la mejor propuesta posible. Te contactaremos muy pronto con una respuesta personalizada.</p>
        
        <p>Mientras tanto, puedes verificar el estado actual de tu cotización:</p>
        
        <a href="${trackingUrl}" class="cta-button">Ver Estado de mi Cotización</a>
        
        <div class="contact-info">
          <h4>¿Necesitas agregar información adicional?</h4>
          <p>Si tienes más detalles sobre tu proyecto o preguntas específicas, no dudes en contactarnos:</p>
          <p>
            📧 Email: contacto@hexagono.xyz<br>
            📱 WhatsApp: +54 11 2378-2307<br>
            🌐 Web: https://hexagono.xyz
          </p>
        </div>
        
        <p>Gracias por tu paciencia y por confiar en Hexágono Web.</p>
        
        <p>Saludos cordiales,<br>
        <strong>El equipo de Hexágono Web</strong></p>
      </div>
      
      <div class="footer">
        <p>Este email fue enviado automáticamente. Por favor no respondas a este mensaje.</p>
        <p>© ${new Date().getFullYear()} Hexágono Web - Desarrollo web y gestión de redes sociales</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
    Recordatorio: Tu cotización ${quoteNumber} está siendo procesada
    
    Hola ${clientName},
    
    Queremos recordarte que tu solicitud de cotización ${quoteNumber} para ${serviceDisplayName} está siendo procesada por nuestro equipo.
    
    Nuestros especialistas están revisando los detalles de tu proyecto para ofrecerte la mejor propuesta posible.
    
    Ver estado actual: ${trackingUrl}
    
    Si tienes más información o preguntas:
    Email: contacto@hexagono.xyz
    WhatsApp: +54 11 2378-2307
    
    Gracias por tu paciencia.
    
    Saludos,
    El equipo de Hexágono Web
  `
  
  return { subject, html, text }
}