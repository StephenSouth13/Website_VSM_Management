"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Crown,
  Shield,
  Code,
  Palette,
  FileText,
  Users,
  ChevronDown,
  TestTube,
  RefreshCw,
  Eye,
  Settings,
} from "lucide-react"
import { mockUsers, getCurrentUser, setCurrentUser } from "@/lib/mockData"
import { useRouter } from "next/navigation"

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
      return <Users className="h-4 w-4" />
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

const getRoleDescription = (role: string) => {
  switch (role) {
    case "admin":
      return "Toàn quyền quản trị hệ thống, quản lý người dùng và cài đặt"
    case "leader":
      return "Quản lý team, phân công công việc và theo dõi tiến độ dự án"
    case "developer":
      return "Phát triển website, quản lý code và tính năng kỹ thuật"
    case "designer":
      return "Thiết kế UI/UX, quản lý template và tài nguyên thiết kế"
    case "editor":
      return "Quản lý nội dung, viết bài và tối ưu SEO"
    default:
      return "Người dùng cơ bản"
  }
}

const getRolePermissions = (role: string) => {
  switch (role) {
    case "admin":
      return [
        "Quản lý toàn bộ hệ thống",
        "Quản lý người dùng và phân quyền",
        "Xem tất cả thống kê và báo cáo",
        "Cài đặt hệ thống và bảo mật",
        "Backup và khôi phục dữ liệu",
      ]
    case "leader":
      return [
        "Quản lý team và phân công công việc",
        "Tạo và quản lý dự án",
        "Xem báo cáo tiến độ team",
        "Tạo sự kiện và cuộc họp",
        "Approve và review công việc",
      ]
    case "developer":
      return [
        "Tạo và chỉnh sửa website",
        "Quản lý code và version control",
        "Xem metrics hiệu suất",
        "Deploy và quản lý hosting",
        "Tích hợp API và database",
      ]
    case "designer":
      return [
        "Thiết kế UI/UX cho website",
        "Tạo và quản lý template",
        "Quản lý thư viện media",
        "Tạo design system",
        "Review và approve design",
      ]
    case "editor":
      return [
        "Tạo và chỉnh sửa nội dung",
        "Quản lý blog và bài viết",
        "Tối ưu SEO cho nội dung",
        "Quản lý media và hình ảnh",
        "Lên lịch xuất bản nội dung",
      ]
    default:
      return []
  }
}

export function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()
  const currentUser = getCurrentUser()

  const handleRoleSwitch = (userId: number) => {
    setCurrentUser(userId)
    setIsOpen(false)
    // Force refresh to update all components
    window.location.reload()
  }

  return (
    <>
      {/* Role Switcher Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-background/95 backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <TestTube className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Test Role:</span>
              <div className="flex items-center space-x-2 ml-2">
                {getRoleIcon(currentUser.role)}
                <span className="font-medium capitalize">{currentUser.role}</span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>Role Testing Mode</span>
              <Badge variant="secondary" className="text-xs">
                Mock-up
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {mockUsers.map((user) => (
              <DropdownMenuItem
                key={user.id}
                onClick={() => handleRoleSwitch(user.id)}
                className={`p-3 ${currentUser.id === user.id ? "bg-primary/10" : ""}`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{user.name}</span>
                      {currentUser.id === user.id && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getRoleIcon(user.role)}
                      <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">• {user.department}</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowDetails(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Xem chi tiết roles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh trang
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Role Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Chi tiết Roles & Permissions</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockUsers.map((user) => (
                <Card key={user.id} className={currentUser.id === user.id ? "border-primary" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(user.role)}
                            <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {currentUser.id === user.id && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{getRoleDescription(user.role)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Thông tin:</h4>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>📧 {user.email}</div>
                          <div>🏢 {user.department}</div>
                          <div>💼 {user.position}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Quyền hạn:</h4>
                        <div className="space-y-1">
                          {getRolePermissions(user.role).map((permission, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              <span>{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={currentUser.id === user.id ? "outline" : "default"}
                        className="w-full"
                        onClick={() => {
                          if (currentUser.id !== user.id) {
                            handleRoleSwitch(user.id)
                            setShowDetails(false)
                          }
                        }}
                        disabled={currentUser.id === user.id}
                      >
                        {currentUser.id === user.id ? "Đang sử dụng" : "Chuyển sang role này"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TestTube className="h-5 w-5" />
                  <span>Hướng dẫn Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>🎯 Mục đích:</strong> Mock-up này giúp test giao diện và tính năng cho từng role khác nhau
                    mà không cần tạo nhiều tài khoản.
                  </div>
                  <div>
                    <strong>🔄 Cách sử dụng:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1 ml-4">
                      <li>Click vào role switcher ở góc dưới phải</li>
                      <li>Chọn role muốn test</li>
                      <li>Hệ thống sẽ reload và hiển thị giao diện theo role đó</li>
                      <li>Test các tính năng và quyền hạn khác nhau</li>
                    </ol>
                  </div>
                  <div>
                    <strong>⚡ Lưu ý:</strong> Đây chỉ là mock-up để demo. Trong production, role sẽ được xác định qua
                    authentication thực tế.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
