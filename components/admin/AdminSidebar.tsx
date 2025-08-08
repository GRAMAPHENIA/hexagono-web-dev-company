'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut,
  X,
  Hexagon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    name: 'Dashboard',
    href: 'dashboard',
    icon: LayoutDashboard,
    description: 'Vista general del sistema'
  },
  {
    name: 'Cotizaciones',
    href: 'quotes',
    icon: FileText,
    description: 'Gestionar cotizaciones'
  },
  {
    name: 'Configuración',
    href: 'settings',
    icon: Settings,
    description: 'Configuración del sistema'
  }
]

export function AdminSidebar({ activeTab, onTabChange, isOpen, onClose }: AdminSidebarProps) {
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
             {/* Header */}
       <div className="flex items-center justify-between p-6 border-b border-border">
         <Link href="/admin" className="flex items-center space-x-2">
           <Hexagon className="h-8 w-8 text-primary" />
           <span className="text-xl font-bold text-foreground">Admin</span>
         </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => {
                onTabChange(item.href)
                onClose()
              }}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                activeTab === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          )
        })}
      </nav>

             {/* Footer */}
       <div className="p-4 border-t border-border">
         <Button
           variant="ghost"
           className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
         >
           <LogOut className="h-4 w-4 mr-2" />
           Cerrar Sesión
         </Button>
       </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r border-border">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
