"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Palette,
  Search,
  Star,
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Crown,
  Zap,
  Heart,
  Share,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
} from "lucide-react"
import { mockTemplates } from "@/lib/mockData"
import Image from "next/image"

const categoryColors = {
  business: "bg-blue-100 text-blue-800",
  creative: "bg-purple-100 text-purple-800",
  ecommerce: "bg-green-100 text-green-800",
  blog: "bg-orange-100 text-orange-800",
  landing: "bg-pink-100 text-pink-800",
  portfolio: "bg-indigo-100 text-indigo-800",
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && template.price === 0) ||
      (priceFilter === "premium" && template.price > 0)
    return matchesSearch && matchesCategory && matchesPrice
  })

  const categories = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "business", label: "Doanh nghiệp" },
    { value: "creative", label: "Sáng tạo" },
    { value: "ecommerce", label: "Thương mại điện tử" },
    { value: "blog", label: "Blog" },
    { value: "landing", label: "Landing Page" },
    { value: "portfolio", label: "Portfolio" },
  ]

  const formatPrice = (price: number) => {
    return price === 0 ? "Miễn phí" : `${price.toLocaleString()}đ`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Palette className="mr-3 h-8 w-8 text-primary" />
            Templates
          </h1>
          <p className="text-muted-foreground mt-2">Khám phá và sử dụng các template chuyên nghiệp</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo template mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tổng templates</p>
                <p className="text-2xl font-bold">{mockTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Crown className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Premium</p>
                <p className="text-2xl font-bold">{mockTemplates.filter((t) => t.premium).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Lượt tải</p>
                <p className="text-2xl font-bold">{mockTemplates.reduce((acc, t) => acc + t.downloads, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Đánh giá TB</p>
                <p className="text-2xl font-bold">
                  {(mockTemplates.reduce((acc, t) => acc + t.rating, 0) / mockTemplates.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm template..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Lọc theo giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="free">Miễn phí</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="featured" className="space-y-6">
        <TabsList>
          <TabsTrigger value="featured">Nổi bật</TabsTrigger>
          <TabsTrigger value="popular">Phổ biến</TabsTrigger>
          <TabsTrigger value="newest">Mới nhất</TabsTrigger>
          <TabsTrigger value="free">Miễn phí</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden">
                  {template.premium && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="mr-1 h-3 w-3" />
                        Premium
                      </Badge>
                    </div>
                  )}

                  <div className="relative">
                    <Image
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-white text-black hover:bg-gray-100"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <Eye className="mr-2 h-3 w-3" />
                          Xem trước
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem demo
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Tải xuống
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Heart className="mr-2 h-4 w-4" />
                            Yêu thích
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Chia sẻ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {template.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="font-bold text-primary text-lg">{formatPrice(template.price)}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                        {template.category}
                      </Badge>
                      <div className="text-xs text-muted-foreground">by {template.author}</div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template)}>
                        Sử dụng template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .sort((a, b) => b.downloads - a.downloads)
              .map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Same card structure as featured */}
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Zap className="mr-1 h-3 w-3" />
                          Phổ biến
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{template.rating}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{template.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div className="font-bold text-primary">{formatPrice(template.price)}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Mới
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Cập nhật: {formatDate(template.lastUpdated)}
                        </div>
                        <div className="font-bold text-primary">{formatPrice(template.price)}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="free" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates
              .filter((template) => template.price === 0)
              .map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Miễn phí
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{template.rating}</span>
                        </div>
                        <Button size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Tải miễn phí
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedTemplate.name}</span>
                <div className="flex items-center space-x-2">
                  {selectedTemplate.premium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="mr-1 h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                  <Badge className={categoryColors[selectedTemplate.category as keyof typeof categoryColors]}>
                    {selectedTemplate.category}
                  </Badge>
                </div>
              </DialogTitle>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Preview */}
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={selectedTemplate.thumbnail || "/placeholder.svg"}
                    alt={selectedTemplate.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Globe className="mr-2 h-4 w-4" />
                    Xem demo
                  </Button>
                  <Button variant="outline">
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Giá</label>
                    <p className="mt-1 text-2xl font-bold text-primary">{formatPrice(selectedTemplate.price)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Đánh giá</label>
                    <div className="flex items-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="ml-1 font-medium">{selectedTemplate.rating}</span>
                      <span className="ml-2 text-muted-foreground">({selectedTemplate.downloads} downloads)</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tác giả</label>
                    <p className="mt-1">{selectedTemplate.author}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phiên bản</label>
                    <p className="mt-1">{selectedTemplate.version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cập nhật</label>
                    <p className="mt-1">{formatDate(selectedTemplate.lastUpdated)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tương thích</label>
                    <p className="mt-1">{selectedTemplate.compatibility.join(", ")}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTemplate.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tính năng</label>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>✅ Responsive design</li>
                    <li>✅ SEO optimized</li>
                    <li>✅ Fast loading</li>
                    <li>✅ Cross-browser compatible</li>
                    <li>✅ Easy customization</li>
                  </ul>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <Button className="flex-1">
                    {selectedTemplate.price === 0 ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Tải miễn phí
                      </>
                    ) : (
                      <>
                        <Crown className="mr-2 h-4 w-4" />
                        Mua ngay - {formatPrice(selectedTemplate.price)}
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Yêu thích
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
