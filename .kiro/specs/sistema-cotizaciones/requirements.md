# Requirements Document - Sistema de Cotizaciones Online

## Introducción

El Sistema de Cotizaciones Online permitirá a los clientes potenciales de Hexágono Web solicitar presupuestos personalizados para servicios de desarrollo web y gestión de redes sociales de manera automatizada y eficiente. El sistema capturará información detallada del proyecto, calculará estimaciones preliminares basadas en los planes existentes, y facilitará el seguimiento del proceso de cotización.

## Requirements

### Requirement 1

**User Story:** Como cliente potencial, quiero poder solicitar una cotización online para servicios de desarrollo web, para que pueda obtener un presupuesto personalizado sin necesidad de contacto telefónico inicial.

#### Acceptance Criteria

1. WHEN el usuario accede al formulario de cotización THEN el sistema SHALL mostrar opciones claras para seleccionar el tipo de servicio (Landing Page, Web Corporativa, Tienda Online)
2. WHEN el usuario selecciona un tipo de servicio THEN el sistema SHALL mostrar campos específicos relevantes para ese servicio
3. WHEN el usuario completa todos los campos obligatorios THEN el sistema SHALL habilitar el botón de envío
4. WHEN el usuario envía el formulario THEN el sistema SHALL validar todos los datos y mostrar mensajes de error específicos si hay campos inválidos
5. WHEN la validación es exitosa THEN el sistema SHALL generar un número de cotización único y mostrar mensaje de confirmación

### Requirement 2

**User Story:** Como cliente potencial, quiero recibir una estimación preliminar de precio en tiempo real, para que pueda evaluar si el servicio se ajusta a mi presupuesto antes de enviar la solicitud.

#### Acceptance Criteria

1. WHEN el usuario selecciona opciones en el formulario THEN el sistema SHALL calcular y mostrar una estimación de precio en tiempo real
2. WHEN el usuario modifica selecciones THEN el sistema SHALL actualizar la estimación automáticamente
3. IF el usuario selecciona funcionalidades adicionales THEN el sistema SHALL agregar el costo correspondiente a la estimación base
4. WHEN se muestra la estimación THEN el sistema SHALL incluir un disclaimer indicando que es un precio aproximado
5. WHEN la estimación supera cierto umbral THEN el sistema SHALL sugerir una consulta personalizada

### Requirement 3

**User Story:** Como administrador de Hexágono Web, quiero recibir notificaciones automáticas de nuevas cotizaciones, para que pueda responder rápidamente a los clientes potenciales.

#### Acceptance Criteria

1. WHEN se envía una nueva cotización THEN el sistema SHALL enviar un email de notificación al equipo de ventas
2. WHEN se crea la cotización THEN el sistema SHALL incluir todos los detalles del proyecto en la notificación
3. IF la cotización es de alta prioridad (valor > $300.000 ARS) THEN el sistema SHALL marcarla como urgente en la notificación
4. WHEN se envía la notificación THEN el sistema SHALL incluir un enlace directo para ver los detalles completos
5. IF el envío de email falla THEN el sistema SHALL registrar el error y reintentar el envío

### Requirement 4

**User Story:** Como cliente, quiero poder hacer seguimiento del estado de mi cotización, para que pueda saber cuándo esperar una respuesta y el progreso de mi solicitud.

#### Acceptance Criteria

1. WHEN el cliente envía una cotización THEN el sistema SHALL proporcionar un enlace de seguimiento único
2. WHEN el cliente accede al enlace de seguimiento THEN el sistema SHALL mostrar el estado actual de la cotización
3. WHEN el estado de la cotización cambia THEN el sistema SHALL enviar una notificación por email al cliente
4. IF han pasado más de 48 horas sin respuesta THEN el sistema SHALL enviar un recordatorio automático al equipo
5. WHEN la cotización es respondida THEN el sistema SHALL actualizar el estado a "Completada" y notificar al cliente

### Requirement 5

**User Story:** Como administrador, quiero poder gestionar las cotizaciones desde un panel administrativo, para que pueda responder, actualizar estados y hacer seguimiento eficiente.

#### Acceptance Criteria

1. WHEN el administrador accede al panel THEN el sistema SHALL mostrar una lista de todas las cotizaciones ordenadas por fecha
2. WHEN el administrador selecciona una cotización THEN el sistema SHALL mostrar todos los detalles del proyecto
3. WHEN el administrador actualiza el estado THEN el sistema SHALL guardar los cambios y notificar al cliente automáticamente
4. IF el administrador agrega notas internas THEN el sistema SHALL guardarlas sin mostrarlas al cliente
5. WHEN el administrador marca una cotización como respondida THEN el sistema SHALL requerir adjuntar la propuesta final

### Requirement 6

**User Story:** Como cliente, quiero poder especificar detalles específicos de mi proyecto, para que la cotización sea lo más precisa posible a mis necesidades reales.

#### Acceptance Criteria

1. WHEN el usuario selecciona "Web Corporativa" THEN el sistema SHALL preguntar por número de secciones, funcionalidades especiales, y integraciones requeridas
2. WHEN el usuario selecciona "Tienda Online" THEN el sistema SHALL preguntar por número de productos, métodos de pago, y funcionalidades de inventario
3. WHEN el usuario selecciona "Landing Page" THEN el sistema SHALL preguntar por objetivo de conversión, integraciones de marketing, y elementos especiales
4. IF el usuario requiere funcionalidades no listadas THEN el sistema SHALL proporcionar un campo de texto libre para especificaciones adicionales
5. WHEN el usuario completa campos opcionales THEN el sistema SHALL ajustar la estimación de precio automáticamente

### Requirement 7

**User Story:** Como administrador, quiero poder generar reportes de cotizaciones, para que pueda analizar tendencias de demanda y optimizar los precios de servicios.

#### Acceptance Criteria

1. WHEN el administrador accede a reportes THEN el sistema SHALL mostrar métricas de cotizaciones por período
2. WHEN se genera un reporte THEN el sistema SHALL incluir estadísticas de conversión de cotizaciones a ventas
3. IF se solicita análisis por tipo de servicio THEN el sistema SHALL mostrar distribución de demanda por categoría
4. WHEN se exporta un reporte THEN el sistema SHALL generar archivo CSV con todos los datos relevantes
5. IF el período seleccionado no tiene datos THEN el sistema SHALL mostrar mensaje informativo apropiado

### Requirement 8

**User Story:** Como cliente, quiero poder adjuntar archivos de referencia a mi cotización, para que pueda mostrar ejemplos visuales de lo que necesito.

#### Acceptance Criteria

1. WHEN el usuario está completando la cotización THEN el sistema SHALL permitir subir hasta 5 archivos de máximo 10MB cada uno
2. WHEN el usuario sube un archivo THEN el sistema SHALL validar que sea un formato permitido (JPG, PNG, PDF, DOC)
3. IF el archivo excede el tamaño límite THEN el sistema SHALL mostrar error específico y sugerir compresión
4. WHEN se suben archivos THEN el sistema SHALL mostrar preview para imágenes y nombre para otros tipos
5. WHEN se envía la cotización THEN el sistema SHALL incluir los archivos adjuntos en la notificación al equipo
