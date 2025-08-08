import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Panel de Administración - Hexágono Web',
  description: 'Panel de administración para gestionar cotizaciones y proyectos.',
}

// TODO: Implementar autenticación real
async function checkAuth() {
  // Por ahora, permitimos acceso directo
  // En producción, aquí verificarías la sesión del usuario
  return true
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth()
  
  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard />
    </div>
  )
}
