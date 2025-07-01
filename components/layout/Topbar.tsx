"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Search,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Crown,
  Shield,
  Code,
  Palette,
  FileText,
  ChevronDown,
  MessageSquare,
  Calendar,
  HelpCircle,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { getCurrentUser, mockNotifications } from "@/lib/mockData"
import { NotificationDropdown } from "@/components/notification/NotificationDropdown"

interface TopbarProps {
  onMenuToggle: () => void
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="h-4 w-4 text-yellow-500" />
    case "leader":
      return <Shield className="h-4 w-4 text-blue-500" />
    case "developer":
      return <Code className="h-4 w-4 text-green-500" />
    case "designer":
      return <Palette className="h-4 w-4 text-purple-500" />
    case "editor":
      return <FileText className="h-4 w-4 text-orange-500" />
    default:
      return <User className="h-4 w-4" />
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "leader":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "developer":
      return "text-green-600 bg-green-50 border-green-200"
    case "designer":
      return "text-purple-600 bg-purple-50 border-purple-200"
    case "editor":
      return "text-orange-600 bg-orange-50 border-orange-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length

  // Update current user when role changes
  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  return (
    <header className="bg-card border-b px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm website, template, người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/create">
                <Zap className="mr-2 h-4 w-4" />
                Tạo mới
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Tin nhắn
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                Lịch
              </Link>
            </Button>
          </div>

          {/* Mobile Search */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Sáng
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Tối
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Settings className="mr-2 h-4 w-4" />
                Hệ thống
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-auto px-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {getRoleIcon(currentUser.role)}
                      <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              {/* User Info Header */}
              <div className="flex items-center space-x-3 p-4 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback className="text-lg">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{currentUser.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleIcon(currentUser.role)}
                    <Badge variant="outline" className={`text-xs ${getRoleColor(currentUser.role)}`}>
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">• {currentUser.department}</span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Hồ sơ cá nhân</p>
                      <p className="text-xs text-muted-foreground">Quản lý thông tin tài khoản</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center w-full">
                    <Settings className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Cài đặt</p>
                      <p className="text-xs text-muted-foreground">Tùy chỉnh hệ thống</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard/messages" className="flex items-center w-full">
                    <MessageSquare className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Tin nhắn</p>
                      <p className="text-xs text-muted-foreground">Chat với team</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard/calendar" className="flex items-center w-full">
                    <Calendar className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Lịch làm việc</p>
                      <p className="text-xs text-muted-foreground">Quản lý sự kiện</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center w-full">
                    <HelpCircle className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Trợ giúp & Hỗ trợ</p>
                      <p className="text-xs text-muted-foreground">Tài liệu và liên hệ</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/logout" className="flex items-center w-full text-red-600 focus:text-red-600">
                    <LogOut className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium">Đăng xuất</p>
                      <p className="text-xs text-muted-foreground">Thoát khỏi tài khoản</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </div>

              {/* Footer */}
              <div className="border-t p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Phiên bản 2.1.0</span>
                  <Badge variant="secondary" className="text-xs">
                    Mock-up Mode
                  </Badge>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
