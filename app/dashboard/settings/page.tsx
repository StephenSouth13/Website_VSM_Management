"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Key,
  Mail,
  Phone,
  Calendar,
  Camera,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react"
import { currentUser } from "@/lib/mockData"
import { useTheme } from "next-themes"

const notificationSettings = [
  {
    id: "email_notifications",
    title: "Email notifications",
    description: "Nhận thông báo qua email",
    enabled: true,
  },
  {
    id: "push_notifications",
    title: "Push notifications",
    description: "Thông báo đẩy trên trình duyệt",
    enabled: true,
  },
  {
    id: "sms_notifications",
    title: "SMS notifications",
    description: "Thông báo qua tin nhắn SMS",
    enabled: false,
  },
  {
    id: "marketing_emails",
    title: "Marketing emails",
    description: "Nhận email về sản phẩm và khuyến mãi",
    enabled: false,
  },
]

const securitySettings = [
  {
    id: "two_factor",
    title: "Two-factor authentication",
    description: "Bảo mật tài khoản với xác thực 2 lớp",
    enabled: true,
    status: "active",
  },
  {
    id: "login_alerts",
    title: "Login alerts",
    description: "Cảnh báo khi có đăng nhập từ thiết bị mới",
    enabled: true,
    status: "active",
  },
  {
    id: "session_timeout",
    title: "Auto logout",
    description: "Tự động đăng xuất sau 30 phút không hoạt động",
    enabled: false,
    status: "inactive",
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { theme, setTheme } = useTheme()

  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || "",
    position: currentUser.position || "",
    department: currentUser.department,
    bio: "Chuyên gia phát triển hệ thống CMS với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ web.",
    location: "Hà Nội, Việt Nam",
    website: "https://vsm.vn",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
  })

  const [preferences, setPreferences] = useState({
    theme: theme || "system",
    language: "vi",
    dateFormat: "dd/mm/yyyy",
    timeFormat: "24h",
    notifications: true,
    autoSave: true,
    compactMode: false,
    showTips: true,
  })

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const handleResetSettings = () => {
    // Reset to default settings
  }

  const handleExportData = () => {
    // Export user data
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Settings className="mr-3 h-8 w-8 text-primary" />
            Cài đặt
          </h1>
          <p className="text-muted-foreground mt-2">Quản lý thông tin cá nhân và tùy chỉnh hệ thống</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Đặt lại
          </Button>
          <Button onClick={handleSaveProfile}>
            <Save className="mr-2 h-4 w-4" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Hồ sơ</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Giao diện</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Thông báo</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Bảo mật</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Nâng cao</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Ảnh đại diện</CardTitle>
                <CardDescription>Cập nhật ảnh đại diện của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Thay đổi
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Thông tin cơ bản</CardTitle>
                    <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Hủy" : "Chỉnh sửa"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Select
                      value={profileData.department}
                      onValueChange={(value) => setProfileData({ ...profileData, department: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Content">Content</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
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

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Role & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Vai trò & Quyền hạn</CardTitle>
              <CardDescription>Thông tin về vai trò và quyền truy cập của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Vai trò</p>
                    <Badge variant="secondary" className="mt-1">
                      {currentUser.role.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Trạng thái</p>
                    <Badge variant="default" className="mt-1 bg-green-600">
                      Hoạt động
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Tham gia</p>
                    <p className="text-sm text-muted-foreground">01/01/2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Giao diện
                </CardTitle>
                <CardDescription>Tùy chỉnh giao diện và chủ đề</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Chủ đề</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="flex items-center space-x-2"
                    >
                      <Sun className="h-4 w-4" />
                      <span>Sáng</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="flex items-center space-x-2"
                    >
                      <Moon className="h-4 w-4" />
                      <span>Tối</span>
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                      className="flex items-center space-x-2"
                    >
                      <Monitor className="h-4 w-4" />
                      <span>Hệ thống</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chế độ compact</Label>
                    <p className="text-sm text-muted-foreground">Giảm khoảng cách giữa các phần tử</p>
                  </div>
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, compactMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Hiển thị tips</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị gợi ý và hướng dẫn</p>
                  </div>
                  <Switch
                    checked={preferences.showTips}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, showTips: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Tự động lưu</Label>
                    <p className="text-sm text-muted-foreground">Tự động lưu thay đổi</p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Ngôn ngữ & Khu vực
                </CardTitle>
                <CardDescription>Cài đặt ngôn ngữ và định dạng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select
                    value={profileData.language}
                    onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">🇻🇳 Tiếng Việt</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                      <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select
                    value={profileData.timezone}
                    onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Ho_Chi_Minh">GMT+7 (Việt Nam)</SelectItem>
                      <SelectItem value="Asia/Tokyo">GMT+9 (Tokyo)</SelectItem>
                      <SelectItem value="America/New_York">GMT-5 (New York)</SelectItem>
                      <SelectItem value="Europe/London">GMT+0 (London)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Định dạng ngày</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Định dạng giờ</Label>
                  <Select
                    value={preferences.timeFormat}
                    onValueChange={(value) => setPreferences({ ...preferences, timeFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 giờ</SelectItem>
                      <SelectItem value="12h">12 giờ (AM/PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
              <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{setting.title}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle>Kênh thông báo</CardTitle>
              <CardDescription>Chọn kênh nhận thông báo cho từng loại sự kiện</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: "Website được tạo", email: true, push: true, sms: false },
                  { event: "Có tin nhắn mới", email: false, push: true, sms: false },
                  { event: "Sự kiện lịch", email: true, push: true, sms: true },
                  { event: "Cảnh báo bảo mật", email: true, push: true, sms: true },
                  { event: "Báo cáo tuần", email: true, push: false, sms: false },
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center py-2">
                    <div className="font-medium">{item.event}</div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Switch defaultChecked={item.email} size="sm" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Switch defaultChecked={item.push} size="sm" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Switch defaultChecked={item.sms} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  Mật khẩu
                </CardTitle>
                <CardDescription>Thay đổi mật khẩu đăng nhập</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                    <Button
                      type="button"
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
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                  <Input id="confirm-password" type="password" placeholder="Nhập lại mật khẩu mới" />
                </div>
                <Button className="w-full">Cập nhật mật khẩu</Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Cài đặt bảo mật
                </CardTitle>
                <CardDescription>Quản lý các tính năng bảo mật</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Label className="text-base">{setting.title}</Label>
                        <Badge variant={setting.status === "active" ? "default" : "secondary"} className="text-xs">
                          {setting.status === "active" ? "Hoạt động" : "Tạm dừng"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Phiên đăng nhập</CardTitle>
              <CardDescription>Quản lý các thiết bị đã đăng nhập</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    device: "Chrome on Windows",
                    location: "Hà Nội, Việt Nam",
                    lastActive: "Hiện tại",
                    current: true,
                    icon: Laptop,
                  },
                  {
                    device: "Safari on iPhone",
                    location: "Hà Nội, Việt Nam",
                    lastActive: "2 giờ trước",
                    current: false,
                    icon: Smartphone,
                  },
                  {
                    device: "Chrome on iPad",
                    location: "TP.HCM, Việt Nam",
                    lastActive: "1 ngày trước",
                    current: false,
                    icon: Tablet,
                  },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <session.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium flex items-center space-x-2">
                          <span>{session.device}</span>
                          {session.current && (
                            <Badge variant="secondary" className="text-xs">
                              Hiện tại
                            </Badge>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.lastActive}
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Quản lý dữ liệu
                </CardTitle>
                <CardDescription>Xuất, nhập và xóa dữ liệu cá nhân</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất dữ liệu cá nhân
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Nhập dữ liệu
                </Button>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-destructive">Vùng nguy hiểm</Label>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tài khoản
                  </Button>
                  <p className="text-xs text-muted-foreground">Hành động này không thể hoàn tác</p>
                </div>
              </CardContent>
            </Card>

            {/* API & Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="mr-2 h-5 w-5" />
                  API & Tích hợp
                </CardTitle>
                <CardDescription>Quản lý API keys và tích hợp bên thứ 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex space-x-2">
                    <Input value="vsm_••••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Tạo API Key mới
                </Button>
                <Separator />
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhook" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Kiểm tra kết nối
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
              <CardDescription>Chi tiết về phiên bản và cấu hình hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Phiên bản</Label>
                  <p className="font-mono">v2.1.0</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Build</Label>
                  <p className="font-mono">#1234</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Environment</Label>
                  <Badge variant="secondary">Production</Badge>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Uptime</Label>
                  <p className="font-mono">99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
