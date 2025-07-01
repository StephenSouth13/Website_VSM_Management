"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Globe,
  Plus,
  Calendar,
  MessageSquare,
  BarChart3,
  Users,
  ImageIcon,
  Palette,
  Settings,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Globe, label: "Website của tôi", href: "/dashboard/websites" },
  { icon: Plus, label: "Tạo mới", href: "/dashboard/create" },
  { icon: Calendar, label: "Lịch", href: "/dashboard/calendar" },
  { icon: MessageSquare, label: "Tin nhắn", href: "/dashboard/messages", badge: "3" },
  { icon: BarChart3, label: "Thống kê", href: "/dashboard/analytics" },
  { icon: Users, label: "Quản lý người dùng", href: "/dashboard/users" },
  { icon: ImageIcon, label: "Media", href: "/dashboard/media" },
  { icon: Palette, label: "Templates", href: "/dashboard/templates" },
  { icon: Sparkles, label: "Tính năng nâng cao", href: "/dashboard/advanced", badge: "Mới" },
  { icon: Settings, label: "Cài đặt", href: "/dashboard/settings" },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("bg-card border-r transition-all duration-300 ease-in-out", isOpen ? "w-64" : "w-16")}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">VSM</span>
          </div>
          {isOpen && <span className="text-xl font-bold">VSM CMS</span>}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", !isOpen && "px-2")}
                >
                  <item.icon className="h-4 w-4" />
                  {isOpen && (
                    <>
                      <span className="ml-2">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
