'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { 
  Settings as SettingsIcon,
  Mail,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Save
} from 'lucide-react'

export function Settings() {
  const [settings, setSettings] = useState({
    companyName: 'Hexágono Web',
    companyEmail: 'info@hexagono.xyz',
    companyPhone: '+54 11 1234-5678',
    autoNotifications: true,
    emailNotifications: true,
    maintenanceMode: false,
    theme: 'light',
    language: 'es',
    timezone: 'America/Argentina/Buenos_Aires',
    defaultCurrency: 'ARS',
    quoteExpiryDays: 30,
    maxFileSize: 10,
    allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx',
    termsAndConditions: 'Términos y condiciones por defecto...',
    privacyPolicy: 'Política de privacidad por defecto...',
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    try {
      // TODO: Implementar guardado de configuración
      console.log('Guardando configuración:', settings)
      // Aquí iría la llamada a la API para guardar la configuración
    } catch (error) {
      console.error('Error guardando configuración:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
             <div>
         <h2 className="text-2xl font-bold text-foreground">Configuración</h2>
         <p className="text-muted-foreground">
           Administra la configuración del sistema
         </p>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2" />
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">Email de Contacto</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="companyPhone">Teléfono</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoNotifications">Notificaciones Automáticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificaciones automáticas a los clientes
                  </p>
                </div>
                <Switch
                  id="autoNotifications"
                  checked={settings.autoNotifications}
                  onCheckedChange={(checked) => handleSettingChange('autoNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones por email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Configuración del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quoteExpiryDays">Días de Expiración de Cotizaciones</Label>
                  <Input
                    id="quoteExpiryDays"
                    type="number"
                    value={settings.quoteExpiryDays}
                    onChange={(e) => handleSettingChange('quoteExpiryDays', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="allowedFileTypes">Tipos de Archivo Permitidos</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={(e) => handleSettingChange('allowedFileTypes', e.target.value)}
                  placeholder="jpg,jpeg,png,pdf,doc,docx"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
                  <p className="text-sm text-muted-foreground">
                    Activar modo mantenimiento (solo admin)
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legal Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Documentos Legales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="termsAndConditions">Términos y Condiciones</Label>
                <Textarea
                  id="termsAndConditions"
                  value={settings.termsAndConditions}
                  onChange={(e) => handleSettingChange('termsAndConditions', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="privacyPolicy">Política de Privacidad</Label>
                <Textarea
                  id="privacyPolicy"
                  value={settings.privacyPolicy}
                  onChange={(e) => handleSettingChange('privacyPolicy', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Tema</Label>
                                 <select
                   id="theme"
                   value={settings.theme}
                   onChange={(e) => handleSettingChange('theme', e.target.value)}
                   className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                 >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Configuración Regional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Idioma</Label>
                                 <select
                   id="language"
                   value={settings.language}
                   onChange={(e) => handleSettingChange('language', e.target.value)}
                   className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                 >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timezone">Zona Horaria</Label>
                                 <select
                   id="timezone"
                   value={settings.timezone}
                   onChange={(e) => handleSettingChange('timezone', e.target.value)}
                   className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                 >
                  <option value="America/Argentina/Buenos_Aires">Buenos Aires</option>
                  <option value="America/Argentina/Cordoba">Córdoba</option>
                  <option value="America/Argentina/Mendoza">Mendoza</option>
                </select>
              </div>
              <div>
                <Label htmlFor="defaultCurrency">Moneda por Defecto</Label>
                                 <select
                   id="defaultCurrency"
                   value={settings.defaultCurrency}
                   onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
                   className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground"
                 >
                  <option value="ARS">Peso Argentino (ARS)</option>
                  <option value="USD">Dólar Estadounidense (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card>
            <CardContent className="pt-6">
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Configuración
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
