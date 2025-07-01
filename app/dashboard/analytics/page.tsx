"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Chrome,
  AppleIcon as Safari,
  ChromeIcon as Firefox,
  ArrowUp,
  ArrowDown,
  Download,
} from "lucide-react"
import { mockAnalytics } from "@/lib/mockData"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("views")

  const stats = [
    {
      title: "Tổng lượt xem",
      value: mockAnalytics.totalViews.toLocaleString(),
      change: `+${mockAnalytics.monthlyGrowth}%`,
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Tổng website",
      value: mockAnalytics.totalWebsites.toString(),
      change: "+2 tuần này",
      trend: "up",
      icon: Globe,
      color: "text-green-600",
    },
    {
      title: "Người dùng",
      value: mockAnalytics.totalUsers.toString(),
      change: "+8 tháng này",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: `${mockAnalytics.conversionRate}%`,
      change: "+0.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="mr-3 h-8 w-8 text-primary" />
            Thống kê
          </h1>
          <p className="text-muted-foreground mt-2">Phân tích hiệu suất và lưu lượng truy cập website</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 ngày</SelectItem>
              <SelectItem value="30d">30 ngày</SelectItem>
              <SelectItem value="90d">90 ngày</SelectItem>
              <SelectItem value="1y">1 năm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="traffic">Lưu lượng</TabsTrigger>
          <TabsTrigger value="devices">Thiết bị</TabsTrigger>
          <TabsTrigger value="pages">Trang</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Nguồn lưu lượng</CardTitle>
                <CardDescription>Phân tích nguồn truy cập website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.trafficSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <span>{source.percentage}%</span>
                        <Badge variant={source.growth > 0 ? "default" : "destructive"} className="text-xs">
                          {source.growth > 0 ? "+" : ""}
                          {source.growth}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">{source.visitors.toLocaleString()} visitors</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Trang phổ biến</CardTitle>
                <CardDescription>Các trang được xem nhiều nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{page.page}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{page.views.toLocaleString()} views</span>
                          <span>{page.bounce}% bounce</span>
                          <span>{page.avgTime} avg time</span>
                        </div>
                      </div>
                      <Badge variant="outline">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ hiệu suất</CardTitle>
              <CardDescription>Lưu lượng truy cập theo thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Biểu đồ sẽ được hiển thị ở đây</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lưu lượng theo giờ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">Biểu đồ lưu lượng theo giờ</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lưu lượng theo ngày</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">Biểu đồ lưu lượng theo ngày</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Device Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thiết bị</CardTitle>
                <CardDescription>Phân tích theo loại thiết bị</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.deviceStats.map((device, index) => {
                  const Icon = device.device === "Desktop" ? Monitor : device.device === "Mobile" ? Smartphone : Tablet
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{device.percentage}%</div>
                        <div className="text-sm text-muted-foreground">{device.visitors.toLocaleString()}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Browser Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Trình duyệt</CardTitle>
                <CardDescription>Phân tích theo trình duyệt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.browserStats.map((browser, index) => {
                  const Icon = browser.browser === "Chrome" ? Chrome : browser.browser === "Safari" ? Safari : Firefox
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{browser.browser}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{browser.percentage}%</div>
                        <div className="text-sm text-muted-foreground">{browser.visitors.toLocaleString()}</div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết trang</CardTitle>
              <CardDescription>Phân tích hiệu suất từng trang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topPages.map((page, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{page.page}</h4>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Lượt xem</p>
                        <p className="font-medium">{page.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Bounce Rate</p>
                        <p className="font-medium">{page.bounce}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Thời gian trung bình</p>
                        <p className="font-medium">{page.avgTime}</p>
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
