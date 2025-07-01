"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Globe,
  Users,
  BarChart3,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Crown,
  Shield,
  Code,
  Palette,
  FileText,
} from "lucide-react"
import { getCurrentUser, hasPermission, getRoleSpecificWebsites } from "@/lib/mockData"
import Link from "next/link"

// Role-specific dashboard data
const getDashboardData = (role: string) => {
  const baseStats = [
    {
      title: "Lượt truy cập",
      value: "24,567",
      change: "+12% so với tháng trước",
      icon: Users,
      color: "text-green-600",
      show: hasPermission(role, "view_analytics"),
    },
    {
      title: "Trang được xem",
      value: "89,432",
      change: "+8% so với tháng trước",
      icon: BarChart3,
      color: "text-purple-600",
      show: hasPermission(role, "view_analytics"),
    },
  ]

  const roleSpecificStats = {
    admin: [
      {
        title: "Tổng số website",
        value: "12",
        change: "+2 tuần này",
        icon: Globe,
        color: "text-blue-600",
        show: true,
      },
      {
        title: "Người dùng hoạt động",
        value: "67",
        change: "+5 người dùng mới",
        icon: Users,
        color: "text-orange-600",
        show: true,
      },
    ],
    leader: [
      {
        title: "Dự án đang quản lý",
        value: "8",
        change: "+1 dự án mới",
        icon: Globe,
        color: "text-blue-600",
        show: true,
      },
      {
        title: "Thành viên team",
        value: "15",
        change: "Đầy đủ",
        icon: Users,
        color: "text-green-600",
        show: true,
      },
    ],
    developer: [
      {
        title: "Website đang phát triển",
        value: "5",
        change: "+1 tuần này",
        icon: Globe,
        color: "text-blue-600",
        show: true,
      },
      {
        title: "Commits tuần này",
        value: "47",
        change: "+15% so với tuần trước",
        icon: TrendingUp,
        color: "text-green-600",
        show: true,
      },
    ],
    designer: [
      {
        title: "Thiết kế hoàn thành",
        value: "23",
        change: "+3 tuần này",
        icon: Palette,
        color: "text-purple-600",
        show: true,
      },
      {
        title: "Template đang thiết kế",
        value: "4",
        change: "Đang tiến hành",
        icon: Globe,
        color: "text-blue-600",
        show: true,
      },
    ],
    editor: [
      {
        title: "Bài viết đã xuất bản",
        value: "156",
        change: "+12 tuần này",
        icon: FileText,
        color: "text-green-600",
        show: true,
      },
      {
        title: "Nội dung đang chỉnh sửa",
        value: "8",
        change: "Cần hoàn thành",
        icon: Edit,
        color: "text-orange-600",
        show: true,
      },
    ],
  }

  return [...(roleSpecificStats[role as keyof typeof roleSpecificStats] || []), ...baseStats].filter(
    (stat) => stat.show,
  )
}

const getRoleSpecificActions = (role: string) => {
  const actions = {
    admin: [
      { icon: Plus, label: "Tạo website mới", href: "/dashboard/create" },
      { icon: Users, label: "Quản lý người dùng", href: "/dashboard/users" },
      { icon: BarChart3, label: "Xem báo cáo chi tiết", href: "/dashboard/analytics" },
      { icon: Globe, label: "Quản lý domain", href: "/dashboard/domains" },
    ],
    leader: [
      { icon: Plus, label: "Tạo dự án mới", href: "/dashboard/create" },
      { icon: Users, label: "Quản lý team", href: "/dashboard/users" },
      { icon: BarChart3, label: "Báo cáo tiến độ", href: "/dashboard/analytics" },
      { icon: Globe, label: "Xem website team", href: "/dashboard/websites" },
    ],
    developer: [
      { icon: Plus, label: "Tạo website mới", href: "/dashboard/create" },
      { icon: Code, label: "Quản lý code", href: "/dashboard/code" },
      { icon: Globe, label: "Website của tôi", href: "/dashboard/websites" },
      { icon: BarChart3, label: "Performance metrics", href: "/dashboard/analytics" },
    ],
    designer: [
      { icon: Plus, label: "Tạo thiết kế mới", href: "/dashboard/create" },
      { icon: Palette, label: "Thư viện template", href: "/dashboard/templates" },
      { icon: Globe, label: "Website đang thiết kế", href: "/dashboard/websites" },
      { icon: Eye, label: "Xem portfolio", href: "/dashboard/portfolio" },
    ],
    editor: [
      { icon: Plus, label: "Tạo nội dung mới", href: "/dashboard/create" },
      { icon: FileText, label: "Quản lý bài viết", href: "/dashboard/content" },
      { icon: Globe, label: "Website đang chỉnh sửa", href: "/dashboard/websites" },
      { icon: Edit, label: "Nháp đang làm", href: "/dashboard/drafts" },
    ],
  }

  return actions[role as keyof typeof actions] || actions.developer
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="h-5 w-5 text-yellow-500" />
    case "leader":
      return <Shield className="h-5 w-5 text-blue-500" />
    case "developer":
      return <Code className="h-5 w-5 text-green-500" />
    case "designer":
      return <Palette className="h-5 w-5 text-purple-500" />
    case "editor":
      return <FileText className="h-5 w-5 text-orange-500" />
    default:
      return <Globe className="h-5 w-5" />
  }
}

const getRoleWelcome = (role: string) => {
  const welcomeMessages = {
    admin: "Chào mừng quản trị viên! Hệ thống đang hoạt động tốt.",
    leader: "Chào mừng team leader! Team của bạn đang làm việc hiệu quả.",
    developer: "Chào mừng developer! Sẵn sàng code những tính năng tuyệt vời?",
    designer: "Chào mừng designer! Hãy tạo ra những thiết kế đẹp mắt.",
    editor: "Chào mừng editor! Nội dung chất lượng đang chờ bạn.",
  }
  return welcomeMessages[role as keyof typeof welcomeMessages] || "Chào mừng bạn đến với VSM CMS!"
}

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [stats, setStats] = useState(getDashboardData(currentUser.role))
  const [quickActions, setQuickActions] = useState(getRoleSpecificActions(currentUser.role))
  const [recentWebsites, setRecentWebsites] = useState(getRoleSpecificWebsites(currentUser.role))

  // Update data when role changes
  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    setStats(getDashboardData(user.role))
    setQuickActions(getRoleSpecificActions(user.role))
    setRecentWebsites(getRoleSpecificWebsites(user.role))
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            {getRoleIcon(currentUser.role)}
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Badge variant="outline" className="capitalize">
              {currentUser.role}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
              Mock-up Mode
            </Badge>
          </div>
          <p className="text-muted-foreground">{getRoleWelcome(currentUser.role)}</p>
        </div>
        {hasPermission(currentUser.role, "create_websites") && (
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Tạo mới
            </Link>
          </Button>
        )}
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
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Websites */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentUser.role === "admin"
                ? "Tất cả website"
                : currentUser.role === "leader"
                  ? "Website team"
                  : "Website của tôi"}
            </CardTitle>
            <CardDescription>
              {currentUser.role === "admin"
                ? "Quản lý tất cả website trong hệ thống"
                : currentUser.role === "leader"
                  ? "Website do team bạn quản lý"
                  : "Các website bạn đã tạo hoặc chỉnh sửa"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWebsites.slice(0, 3).map((website) => (
                <div key={website.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{website.name}</h4>
                    <p className="text-sm text-muted-foreground">{website.url}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={website.status === "published" ? "default" : "secondary"}>
                        {website.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {Number(website.views).toLocaleString()} lượt xem
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(website.lastModified).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {hasPermission(currentUser.role, "edit_websites") && (
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {hasPermission(currentUser.role, "edit_websites") && (
              <div className="mt-4">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard/websites">Xem tất cả website</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hành động nhanh</CardTitle>
            <CardDescription>
              {currentUser.role === "admin"
                ? "Quản trị hệ thống"
                : currentUser.role === "leader"
                  ? "Quản lý team và dự án"
                  : currentUser.role === "developer"
                    ? "Công cụ phát triển"
                    : currentUser.role === "designer"
                      ? "Công cụ thiết kế"
                      : "Công cụ chỉnh sửa nội dung"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button key={index} className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href={action.href} className="flex items-center w-full">
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart - Only for roles with analytics permission */}
      {hasPermission(currentUser.role, "view_analytics") && (
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất {currentUser.role === "admin" ? "hệ thống" : "công việc"}</CardTitle>
            <CardDescription>
              {currentUser.role === "admin"
                ? "Tổng quan về hiệu suất toàn hệ thống"
                : currentUser.role === "leader"
                  ? "Hiệu suất team trong 30 ngày qua"
                  : "Hiệu suất công việc của bạn trong 30 ngày qua"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {currentUser.role === "admin"
                    ? "Uptime hệ thống"
                    : currentUser.role === "leader"
                      ? "Tiến độ dự án"
                      : currentUser.role === "developer"
                        ? "Code quality"
                        : currentUser.role === "designer"
                          ? "Thiết kế hoàn thành"
                          : "Nội dung xuất bản"}
                </span>
                <span className="text-sm font-medium">
                  {currentUser.role === "admin"
                    ? "99.9%"
                    : currentUser.role === "leader"
                      ? "87%"
                      : currentUser.role === "developer"
                        ? "92%"
                        : currentUser.role === "designer"
                          ? "85%"
                          : "78%"}
                </span>
              </div>
              <Progress
                value={
                  currentUser.role === "admin"
                    ? 99.9
                    : currentUser.role === "leader"
                      ? 87
                      : currentUser.role === "developer"
                        ? 92
                        : currentUser.role === "designer"
                          ? 85
                          : 78
                }
              />

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {currentUser.role === "admin"
                    ? "Hiệu suất server"
                    : currentUser.role === "leader"
                      ? "Hiệu suất team"
                      : "Năng suất cá nhân"}
                </span>
                <span className="text-sm font-medium">
                  {currentUser.role === "admin" ? "95%" : currentUser.role === "leader" ? "92%" : "88%"}
                </span>
              </div>
              <Progress value={currentUser.role === "admin" ? 95 : currentUser.role === "leader" ? 92 : 88} />

              {currentUser.role === "admin" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bảo mật hệ thống</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <Progress value={98} />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
