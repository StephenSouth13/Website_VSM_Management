"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Zap,
  Brain,
  Code,
  Database,
  Shield,
  Rocket,
  Bot,
  Lock,
  Settings,
  Play,
  Pause,
  Download,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Activity,
  Plus,
} from "lucide-react"
import { currentUser, hasPermission } from "@/lib/mockData"

const advancedFeatures = [
  {
    id: "ai-assistant",
    name: "AI Assistant Pro",
    description: "Trợ lý AI thông minh giúp tối ưu hóa website và nội dung",
    icon: Brain,
    status: "active",
    usage: 85,
    category: "ai",
    premium: true,
  },
  {
    id: "auto-seo",
    name: "Auto SEO Optimizer",
    description: "Tự động tối ưu hóa SEO cho tất cả trang web",
    icon: TrendingUp,
    status: "active",
    usage: 92,
    category: "seo",
    premium: true,
  },
  {
    id: "performance-boost",
    name: "Performance Booster",
    description: "Tăng tốc website với công nghệ caching tiên tiến",
    icon: Rocket,
    status: "active",
    usage: 78,
    category: "performance",
    premium: false,
  },
  {
    id: "security-shield",
    name: "Security Shield",
    description: "Bảo vệ website khỏi các mối đe dọa bảo mật",
    icon: Shield,
    status: "active",
    usage: 95,
    category: "security",
    premium: true,
  },
  {
    id: "code-optimizer",
    name: "Code Optimizer",
    description: "Tối ưu hóa và làm sạch code tự động",
    icon: Code,
    status: "inactive",
    usage: 0,
    category: "development",
    premium: true,
  },
  {
    id: "database-sync",
    name: "Database Sync",
    description: "Đồng bộ hóa dữ liệu real-time giữa các server",
    icon: Database,
    status: "active",
    usage: 67,
    category: "database",
    premium: true,
  },
]

const aiModels = [
  { id: "gpt-4", name: "GPT-4 Turbo", provider: "OpenAI", status: "active" },
  { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic", status: "active" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google", status: "inactive" },
]

const automationRules = [
  {
    id: 1,
    name: "Auto Backup Daily",
    description: "Tự động backup website hàng ngày lúc 2:00 AM",
    trigger: "schedule",
    action: "backup",
    status: "active",
    lastRun: "2025-01-07T02:00:00Z",
  },
  {
    id: 2,
    name: "SEO Content Check",
    description: "Kiểm tra và tối ưu SEO cho nội dung mới",
    trigger: "content_publish",
    action: "seo_optimize",
    status: "active",
    lastRun: "2025-01-07T10:30:00Z",
  },
  {
    id: 3,
    name: "Performance Monitor",
    description: "Giám sát hiệu suất và gửi cảnh báo khi cần",
    trigger: "performance_drop",
    action: "alert",
    status: "active",
    lastRun: "2025-01-07T09:15:00Z",
  },
]

export default function AdvancedPage() {
  const [activeTab, setActiveTab] = useState("features")
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const canAccessAdvanced = hasPermission(currentUser.role, "all") || hasPermission(currentUser.role, "manage_advanced")

  if (!canAccessAdvanced) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Truy cập bị hạn chế</h3>
            <p className="text-muted-foreground">Bạn cần quyền admin hoặc leader để truy cập tính năng nâng cao.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="mr-3 h-8 w-8 text-primary" />
            Tính năng nâng cao
          </h1>
          <p className="text-muted-foreground mt-2">Khám phá và cấu hình các tính năng AI và tự động hóa tiên tiến</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
          <Zap className="mr-1 h-3 w-3" />
          Pro Features
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Tính năng</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>AI & ML</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>Tự động hóa</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Giám sát</span>
          </TabsTrigger>
        </TabsList>

        {/* Advanced Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden">
                  {feature.premium && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                        Premium
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          feature.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={feature.status === "active" ? "default" : "secondary"} className="text-xs">
                            {feature.status === "active" ? "Hoạt động" : "Tạm dừng"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {feature.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription>{feature.description}</CardDescription>

                    {feature.status === "active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sử dụng</span>
                          <span>{feature.usage}%</span>
                        </div>
                        <Progress value={feature.usage} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={feature.status === "active" ? "outline" : "default"}
                        className="flex-1"
                        onClick={() => setSelectedFeature(feature.id)}
                      >
                        <Settings className="mr-2 h-3 w-3" />
                        Cấu hình
                      </Button>
                      <Button
                        size="sm"
                        variant={feature.status === "active" ? "destructive" : "default"}
                        onClick={() => {
                          // Toggle feature status
                        }}
                      >
                        {feature.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* AI & ML Tab */}
        <TabsContent value="ai" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* AI Models */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  AI Models
                </CardTitle>
                <CardDescription>Quản lý các mô hình AI được tích hợp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.provider}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={model.status === "active" ? "default" : "secondary"}>
                        {model.status === "active" ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                      <Switch checked={model.status === "active"} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Cấu hình AI
                </CardTitle>
                <CardDescription>Tùy chỉnh hành vi của AI Assistant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-creativity">Mức độ sáng tạo</Label>
                  <div className="px-3">
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Thận trọng</span>
                      <span>Cân bằng</span>
                      <span>Sáng tạo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-language">Ngôn ngữ chính</Label>
                  <Select defaultValue="vi">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="auto">Tự động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-generate content</Label>
                    <p className="text-sm text-muted-foreground">Tự động tạo nội dung cho trang mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SEO suggestions</Label>
                    <p className="text-sm text-muted-foreground">Đề xuất cải thiện SEO tự động</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Thống kê sử dụng AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Requests tháng này</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98.5%</div>
                  <div className="text-sm text-muted-foreground">Độ chính xác</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.3s</div>
                  <div className="text-sm text-muted-foreground">Thời gian phản hồi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-muted-foreground">Nội dung được tạo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Quy tắc tự động hóa</h3>
              <p className="text-muted-foreground">Thiết lập các tác vụ tự động cho website</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo quy tắc mới
            </Button>
          </div>

          <div className="space-y-4">
            {automationRules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          rule.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Bot className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Trigger: {rule.trigger}</span>
                          <span>Action: {rule.action}</span>
                          <span>Last run: {new Date(rule.lastRun).toLocaleString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                        {rule.status === "active" ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Switch checked={rule.status === "active"} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Automation Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Templates tự động hóa</CardTitle>
              <CardDescription>Sử dụng các template có sẵn để thiết lập nhanh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Auto SEO", description: "Tự động tối ưu SEO", icon: TrendingUp },
                  { name: "Content Backup", description: "Sao lưu nội dung định kỳ", icon: Database },
                  { name: "Performance Alert", description: "Cảnh báo hiệu suất", icon: Activity },
                  { name: "Security Scan", description: "Quét bảo mật tự động", icon: Shield },
                  { name: "Update Check", description: "Kiểm tra cập nhật", icon: Download },
                  { name: "Analytics Report", description: "Báo cáo thống kê", icon: BarChart3 },
                ].map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <template.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Sử dụng
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Tình trạng hệ thống
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "CPU Usage", value: 45, status: "good", color: "bg-green-500" },
                  { name: "Memory", value: 67, status: "warning", color: "bg-yellow-500" },
                  { name: "Storage", value: 23, status: "good", color: "bg-green-500" },
                  { name: "Network", value: 89, status: "critical", color: "bg-red-500" },
                ].map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Cảnh báo gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    type: "warning",
                    message: "High memory usage detected",
                    time: "5 phút trước",
                    icon: AlertTriangle,
                    color: "text-yellow-600",
                  },
                  {
                    type: "info",
                    message: "Backup completed successfully",
                    time: "1 giờ trước",
                    icon: CheckCircle,
                    color: "text-green-600",
                  },
                  {
                    type: "error",
                    message: "Failed to connect to external API",
                    time: "2 giờ trước",
                    icon: AlertTriangle,
                    color: "text-red-600",
                  },
                ].map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <alert.icon className={`h-4 w-4 mt-0.5 ${alert.color}`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Metrics hiệu suất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15,432</div>
                  <div className="text-sm text-muted-foreground">Requests/hour</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">2.1%</div>
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
