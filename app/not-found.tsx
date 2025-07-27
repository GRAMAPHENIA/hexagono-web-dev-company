// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <Icons.warning className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  )
}
