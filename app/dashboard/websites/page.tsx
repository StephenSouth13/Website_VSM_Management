"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Globe,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  BarChart3,
  Settings,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Download,
  Share,
  Crown,
  Shield,
  Code,
  Palette,
  FileText,
} from "lucide-react"
import { currentUser, hasPermission } from "@/lib/mockData"
import Link from "next/link"
import Image from "next/image"

// Mock website data with role-based filtering
const getAllWebsites = () => [
  {
    id: 1,
    name: "Website Công ty ABC",
    url: "abc-company.vsm.vn",
    domain: "abc-company.com",
    status: "published",
    template: "Corporate Champion",
    thumbnail: "/placeholder.svg?height=200&width=300",
    views: 12450,
    visitors: 8920,
    lastModified: "2025-01-07T10:30:00Z",
    createdAt: "2024-12-15T09:00:00Z",
    owner: {
      id: 1,
      name: "Nguyễn Văn Admin",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "admin",
    },
    collaborators: [
      { id: 2, name: "Trần Thị Leader", role: "leader" },
      { id: 3, name: "Lê Văn Dev", role: "developer" },
    ],
    tags: ["business", "corporate"],
    performance: {
      speed: 95,
      seo: 88,
      accessibility: 92,
    },
    analytics: {
      viewsChange: 12,
      visitorsChange: 8,
      bounceRate: 35,
    },
  },
  {
    id: 2,
    name: "Landing Page Sản phẩm X",
    url: "product-x.vsm.vn",
    domain: "product-x.com",
    status: "draft",
    template: "Landing Victory",
    thumbnail: "/placeholder.svg?height=200&width=300",
    views: 3420,
    visitors: 2180,
    lastModified: "2025-01-06T15:20:00Z",
    createdAt: "2024-12-20T14:30:00Z",
    owner: {
      id: 3,
      name: "Lê Văn Dev",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "developer",
    },
    collaborators: [{ id: 4, name: "Phạm Thị Designer", role: "designer" }],
    tags: ["landing", "product"],
    performance: {
      speed: 88,
      seo: 75,
      accessibility: 85,
    },
    analytics: {
      viewsChange: -5,
      visitorsChange: 15,
      bounceRate: 42,
    },
  },
  {
    id: 3,
    name: "Blog Cá nhân",
    url: "my-blog.vsm.vn",
    domain: "myblog.com",
    status: "published",
    template: "Blog Master",
    thumbnail: "/placeholder.svg?height=200&width=300",
    views: 8760,
    visitors: 5430,
    lastModified: "2025-01-05T11:45:00Z",
    createdAt: "2024-11-10T16:20:00Z",
    owner: {
      id: 5,
      name: "Hoàng Văn Editor",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "editor",
    },
    collaborators: [],
    tags: ["blog", "personal"],
    performance: {
      speed: 92,
      seo: 95,
      accessibility: 88,
    },
    analytics: {
      viewsChange: 25,
      visitorsChange: 18,
      bounceRate: 28,
    },
  },
  {
    id: 4,
    name: "Portfolio Design",
    url: "portfolio.vsm.vn",
    domain: "myportfolio.com",
    status: "draft",
    template: "Portfolio Elite",
    thumbnail: "/placeholder.svg?height=200&width=300",
    views: 1250,
    visitors: 890,
    lastModified: "2025-01-04T09:15:00Z",
    createdAt: "2024-12-01T10:00:00Z",
    owner: {
      id: 4,
      name: "Phạm Thị Designer",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "designer",
    },
    collaborators: [],
    tags: ["portfolio", "design"],
    performance: {
      speed: 90,
      seo: 70,
      accessibility: 82,
    },
    analytics: {
      viewsChange: 8,
      visitorsChange: 12,
      bounceRate: 38,
    },
  },
  {
    id: 5,
    name: "E-commerce Store",
    url: "store.vsm.vn",
    domain: "mystore.com",
    status: "published",
    template: "E-commerce Pro",
    thumbnail: "/placeholder.svg?height=200&width=300",
    views: 15680,
    visitors: 9240,
    lastModified: "2025-01-07T08:30:00Z",
    createdAt: "2024-10-15T12:00:00Z",
    owner: {
      id: 2,
      name: "Trần Thị Leader",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "leader",
    },
    collaborators: [
      { id: 3, name: "Lê Văn Dev", role: "developer" },
      { id: 4, name: "Phạm Thị Designer", role: "designer" },
    ],
    tags: ["ecommerce", "store"],
    performance: {
      speed: 85,
      seo: 90,
      accessibility: 87,
    },
    analytics: {
      viewsChange: 22,
      visitorsChange: 16,
      bounceRate: 32,
    },
  },
]

const getFilteredWebsites = (role: string) => {
  const allWebsites = getAllWebsites()

  if (role === "admin") {
    return allWebsites // Admin sees all websites
  } else if (role === "leader") {
    return allWebsites.filter(
      (w) =>
        w.owner.role === "leader" ||
        w.collaborators.some((c) => c.role === "leader") ||
        w.owner.role === "developer" ||
        w.owner.role === "designer" ||
        w.owner.role === "editor",
    )
  } else {
    return allWebsites.filter((w) => w.owner.role === role || w.collaborators.some((c) => c.role === role))
  }
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="h-3 w-3 text-yellow-500" />
    case "leader":
      return <Shield className="h-3 w-3 text-blue-500" />
    case "developer":
      return <Code className="h-3 w-3 text-green-500" />
    case "designer":
      return <Palette className="h-3 w-3 text-purple-500" />
    case "editor":
      return <FileText className="h-3 w-3 text-orange-500" />
    default:
      return <Globe className="h-3 w-3" />
  }
}

export default function WebsitesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastModified")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedWebsite, setSelectedWebsite] = useState<any>(null)

  const websites = getFilteredWebsites(currentUser.role)

  const filteredWebsites = websites
    .filter((website) => {
      const matchesSearch =
        website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || website.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "views":
          return b.views - a.views
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default: // lastModified
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      }
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Đã xuất bản</Badge>
      case "draft":
        return <Badge variant="secondary">Bản nháp</Badge>
      case "archived":
        return <Badge variant="outline">Đã lưu trữ</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Vừa xong"
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    if (diffInHours < 48) return "1 ngày trước"
    return date.toLocaleDateString("vi-VN")
  }

  const getTotalStats = () => {
    return {
      total: websites.length,
      published: websites.filter((w) => w.status === "published").length,
      draft: websites.filter((w) => w.status === "draft").length,
      totalViews: websites.reduce((sum, w) => sum + w.views, 0),
      totalVisitors: websites.reduce((sum, w) => sum + w.visitors, 0),
    }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {currentUser.role === "admin"
              ? "Tất cả Website"
              : currentUser.role === "leader"
                ? "Website Team"
                : "Website của tôi"}
          </h1>
          <p className="text-muted-foreground">
            {currentUser.role === "admin"
              ? "Quản lý tất cả website trong hệ thống"
              : currentUser.role === "leader"
                ? "Quản lý website của team bạn"
                : "Quản lý các website bạn đã tạo"}
          </p>
        </div>
        {hasPermission(currentUser.role, "create_websites") && (
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Tạo website mới
            </Link>
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng website</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã xuất bản</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bản nháp</CardTitle>
            <Edit className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.draft}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng lượt xem</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString("vi-VN")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng khách</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalVisitors.toLocaleString("vi-VN")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm website..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="published">Đã xuất bản</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
              <SelectItem value="archived">Đã lưu trữ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastModified">Sửa đổi gần nhất</SelectItem>
              <SelectItem value="name">Tên A-Z</SelectItem>
              <SelectItem value="views">Lượt xem cao nhất</SelectItem>
              <SelectItem value="created">Tạo mới nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Websites Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website) => (
            <motion.div
              key={website.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <Image
                    src={website.thumbnail || "/placeholder.svg"}
                    alt={website.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 left-2">{getStatusBadge(website.status)}</div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/site/${website.url.split(".")[0]}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem website
                          </Link>
                        </DropdownMenuItem>
                        {hasPermission(currentUser.role, "edit_websites") && (
                          <DropdownMenuItem asChild>
                            <Link href={`/editor/${website.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Thống kê
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Chia sẻ
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Nhân bản
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Xuất file
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {hasPermission(currentUser.role, "delete_websites") && (
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{website.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <span>{website.url}</span>
                        <ExternalLink className="h-3 w-3" />
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Owner and Collaborators */}
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={website.owner.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {website.owner.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{website.owner.name}</span>
                      {getRoleIcon(website.owner.role)}
                      {website.collaborators.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          +{website.collaborators.length} cộng tác viên
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{website.views.toLocaleString("vi-VN")} lượt xem</span>
                        {website.analytics.viewsChange > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{website.visitors.toLocaleString("vi-VN")} khách</span>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Hiệu suất</span>
                        <span className="font-medium">
                          {Math.round(
                            (website.performance.speed + website.performance.seo + website.performance.accessibility) /
                              3,
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div
                          className={`h-1 flex-1 rounded ${website.performance.speed >= 90 ? "bg-green-500" : website.performance.speed >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        />
                        <div
                          className={`h-1 flex-1 rounded ${website.performance.seo >= 90 ? "bg-green-500" : website.performance.seo >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        />
                        <div
                          className={`h-1 flex-1 rounded ${website.performance.accessibility >= 90 ? "bg-green-500" : website.performance.accessibility >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        />
                      </div>
                    </div>

                    {/* Tags and Last Modified */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {website.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {website.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{website.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(website.lastModified)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/site/${website.url.split(".")[0]}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem
                        </Link>
                      </Button>
                      {hasPermission(currentUser.role, "edit_websites") && (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/editor/${website.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredWebsites.map((website) => (
                <div
                  key={website.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={website.thumbnail || "/placeholder.svg"}
                      alt={website.name}
                      width={60}
                      height={40}
                      className="rounded object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{website.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{website.url}</span>
                        <span>•</span>
                        <span>{formatDate(website.lastModified)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(website.status)}

                    <div className="text-right text-sm">
                      <div className="font-medium">{website.views.toLocaleString("vi-VN")} lượt xem</div>
                      <div className="text-muted-foreground">{website.visitors.toLocaleString("vi-VN")} khách</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/site/${website.url.split(".")[0]}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      {hasPermission(currentUser.role, "edit_websites") && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/editor/${website.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Thống kê
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Cài đặt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Nhân bản
                          </DropdownMenuItem>
                          {hasPermission(currentUser.role, "delete_websites") && (
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredWebsites.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Không tìm thấy website</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                : "Bạn chưa có website nào. Hãy tạo website đầu tiên!"}
            </p>
            {hasPermission(currentUser.role, "create_websites") && (
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo website mới
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
