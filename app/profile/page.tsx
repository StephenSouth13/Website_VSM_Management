"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Shield,
  Eye,
  EyeOff,
  Camera,
  Edit,
  Save,
  X,
  Download,
  Trash2,
  Key,
  Smartphone,
  Globe,
  Clock,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle,
  Crown,
  Code,
  Palette,
  FileText,
} from "lucide-react"
import { currentUser } from "@/lib/mockData"

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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    position: currentUser.position,
    department: currentUser.department,
    bio: "Chuyên gia phát triển hệ thống CMS với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ web.",
    location: "Hà Nội, Việt Nam",
    website: "https://vsm.vn",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    security: true,
    updates: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    emailVisible: false,
    phoneVisible: false,
    activityVisible: true,
  })

  const recentActivity = [
    {
      id: 1,
      action: "Đăng nhập vào hệ thống",
      timestamp: "2025-01-07T10:30:00Z",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      location: "Hà Nội, VN",
    },
    {
      id: 2,
      action: "Cập nhật thông tin hồ sơ",
      timestamp: "2025-01-06T15:20:00Z",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      location: "Hà Nội, VN",
    },
    {
      id: 3,
      action: "Tạo website mới",
      timestamp: "2025-01-06T09:15:00Z",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      location: "Hà Nội, VN",
    },
  ]

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Hà Nội, VN",
      ip: "192.168.1.100",
      lastActive: "2025-01-07T10:30:00Z",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Hà Nội, VN",
      ip: "192.168.1.101",
      lastActive: "2025-01-06T18:45:00Z",
      current: false,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin và cài đặt tài khoản của bạn</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="privacy">Quyền riêng tư</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Cập nhật thông tin hồ sơ và chi tiết liên hệ của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(currentUser.role)}
                    <Badge variant="outline" className={getRoleColor(currentUser.role)}>
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{currentUser.department}</p>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Phòng ban</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select
                    value={profileData.timezone}
                    onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</SelectItem>
                      <SelectItem value="Asia/Bangkok">Bangkok (UTC+7)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật tài khoản</CardTitle>
              <CardDescription>Quản lý mật khẩu và cài đặt bảo mật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <h4 className="font-medium">Thay đổi mật khẩu</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input id="new-password" type="password" placeholder="Nhập mật khẩu mới" />
                  </div>
                </div>
                <Button>Cập nhật mật khẩu</Button>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Xác thực hai yếu tố (2FA)</h4>
                    <p className="text-sm text-muted-foreground">Thêm lớp bảo mật bổ sung cho tài khoản của bạn</p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>
                {twoFactorEnabled && (
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">2FA đã được kích hoạt</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tài khoản của bạn được bảo vệ bằng xác thực hai yếu tố
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Xem mã khôi phục
                      </Button>
                      <Button variant="outline" size="sm">
                        Cấu hình lại
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* API Keys */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Keys</h4>
                    <p className="text-sm text-muted-foreground">Quản lý các khóa API để tích hợp với ứng dụng khác</p>
                  </div>
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Tạo API Key
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">VSM CMS API Key</p>
                      <p className="text-sm text-muted-foreground">Tạo ngày 15/12/2024</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Hoạt động</Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Active Sessions */}
              <div className="space-y-4">
                <h4 className="font-medium">Phiên đăng nhập</h4>
                <div className="space-y-3">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{session.device}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.ip}</span>
                            {session.current && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-green-600 bg-green-50">
                                  Hiện tại
                                </Badge>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Hoạt động lần cuối: {new Date(session.lastActive).toLocaleString("vi-VN")}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm">
                          Đăng xuất
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo email</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo đẩy</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo đẩy trên trình duyệt</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo SMS</h4>
                    <p className="text-sm text-muted-foreground">Nhận thông báo qua tin nhắn SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo bảo mật</h4>
                    <p className="text-sm text-muted-foreground">Thông báo về hoạt động bảo mật</p>
                  </div>
                  <Switch
                    checked={notifications.security}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cập nhật sản phẩm</h4>
                    <p className="text-sm text-muted-foreground">Thông báo về tính năng mới và cập nhật</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email marketing</h4>
                    <p className="text-sm text-muted-foreground">Nhận email về khuyến mãi và tin tức</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quyền riêng tư</CardTitle>
              <CardDescription>Kiểm soát thông tin cá nhân và quyền riêng tư</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Hiển thị hồ sơ công khai</h4>
                    <p className="text-sm text-muted-foreground">Cho phép người khác xem hồ sơ của bạn</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Hiển thị email</h4>
                    <p className="text-sm text-muted-foreground">Cho phép người khác xem email của bạn</p>
                  </div>
                  <Switch
                    checked={privacy.emailVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, emailVisible: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Hiển thị số điện thoại</h4>
                    <p className="text-sm text-muted-foreground">Cho phép người khác xem số điện thoại</p>
                  </div>
                  <Switch
                    checked={privacy.phoneVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, phoneVisible: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Hiển thị hoạt động</h4>
                    <p className="text-sm text-muted-foreground">Cho phép người khác xem hoạt động của bạn</p>
                  </div>
                  <Switch
                    checked={privacy.activityVisible}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, activityVisible: checked })}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Quản lý dữ liệu</h4>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Xuất dữ liệu
                    </Button>
                    <Button variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt cookie
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <h4 className="font-medium text-red-700">Vùng nguy hiểm</h4>
                  </div>
                  <p className="text-sm text-red-600 mb-3">
                    Hành động này sẽ xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tài khoản
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>Theo dõi các hoạt động và đăng nhập của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(activity.timestamp).toLocaleString("vi-VN")}</span>
                        <span>•</span>
                        <Globe className="h-3 w-3" />
                        <span>{activity.location}</span>
                        <span>•</span>
                        <span>{activity.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
