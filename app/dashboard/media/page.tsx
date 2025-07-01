"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ImageIcon,
  Video,
  FileText,
  Music,
  Upload,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Download,
  Share,
  Trash2,
  Edit,
  Eye,
  Copy,
  FolderPlus,
  Folder,
  Star,
} from "lucide-react"
import { mockMediaFiles } from "@/lib/mockData"
import Image from "next/image"

const fileTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText,
}

const fileTypeColors = {
  image: "text-blue-600",
  video: "text-purple-600",
  audio: "text-green-600",
  document: "text-orange-600",
}

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [folderFilter, setFolderFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const filteredFiles = mockMediaFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || file.type === typeFilter
    const matchesFolder = folderFilter === "all" || file.folder === folderFilter
    return matchesSearch && matchesType && matchesFolder
  })

  const folders = [...new Set(mockMediaFiles.map((file) => file.folder))]
  const totalSize = mockMediaFiles.reduce((acc, file) => {
    const size = Number.parseFloat(file.size.split(" ")[0])
    const unit = file.size.split(" ")[1]
    const sizeInMB = unit === "KB" ? size / 1024 : size
    return acc + sizeInMB
  }, 0)

  const formatFileSize = (size: string) => {
    return size
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  const getFileTypeIcon = (type: string) => {
    const Icon = fileTypeIcons[type as keyof typeof fileTypeIcons] || FileText
    return Icon
  }

  const getFileTypeColor = (type: string) => {
    return fileTypeColors[type as keyof typeof fileTypeColors] || "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <ImageIcon className="mr-3 h-8 w-8 text-primary" />
            Media Library
          </h1>
          <p className="text-muted-foreground mt-2">Quản lý hình ảnh, video và tài liệu của bạn</p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Tải lên
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tải lên tệp mới</DialogTitle>
                <DialogDescription>Kéo thả hoặc chọn tệp để tải lên</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Kéo thả tệp vào đây</p>
                  <p className="text-muted-foreground mb-4">hoặc</p>
                  <Button variant="outline">Chọn tệp</Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Hỗ trợ: JPG, PNG, GIF, MP4, PDF, DOC (tối đa 50MB)
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            Tạo thư mục
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tổng tệp</p>
                <p className="text-2xl font-bold">{mockMediaFiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Folder className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Thư mục</p>
                <p className="text-2xl font-bold">{folders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Lượt tải</p>
                <p className="text-2xl font-bold">{mockMediaFiles.reduce((acc, file) => acc + file.downloads, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Dung lượng</p>
                <p className="text-2xl font-bold">{totalSize.toFixed(1)} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tệp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="image">Hình ảnh</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Tài liệu</SelectItem>
            </SelectContent>
          </Select>
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo thư mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả thư mục</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder} value={folder}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Files Display */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map((file, index) => {
            const FileIcon = getFileTypeIcon(file.type)
            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                    {file.type === "image" ? (
                      <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileIcon className={`h-12 w-12 ${getFileTypeColor(file.type)}`} />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Tải xuống
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép link
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <Badge variant="outline" className="text-xs">
                        {file.type}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Download className="mr-1 h-3 w-3" />
                      <span>{file.downloads} downloads</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredFiles.map((file, index) => {
                const FileIcon = getFileTypeIcon(file.type)
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {file.type === "image" ? (
                          <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            width={48}
                            height={48}
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <FileIcon className={`h-6 w-6 ${getFileTypeColor(file.type)}`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <span>{file.dimensions}</span>
                          <span>{formatDate(file.uploadedAt)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {file.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {file.uploadedBy.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{file.uploadedBy.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Download className="h-3 w-3" />
                        <span>{file.downloads}</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Tải xuống
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Sao chép link
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedFile.name}</DialogTitle>
              <DialogDescription>Chi tiết tệp và thông tin metadata</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Preview */}
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {selectedFile.type === "image" ? (
                    <Image
                      src={selectedFile.url || "/placeholder.svg"}
                      alt={selectedFile.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {React.createElement(getFileTypeIcon(selectedFile.type), {
                        className: `h-24 w-24 ${getFileTypeColor(selectedFile.type)}`,
                      })}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share className="mr-2 h-4 w-4" />
                    Chia sẻ
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Loại tệp</label>
                    <p className="mt-1">{selectedFile.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Kích thước</label>
                    <p className="mt-1">{selectedFile.size}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Kích thước ảnh</label>
                    <p className="mt-1">{selectedFile.dimensions}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lượt tải</label>
                    <p className="mt-1">{selectedFile.downloads}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Thư mục</label>
                    <p className="mt-1">{selectedFile.folder}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
                    <p className="mt-1">
                      <Badge variant={selectedFile.isPublic ? "default" : "secondary"}>
                        {selectedFile.isPublic ? "Công khai" : "Riêng tư"}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Người tải lên</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {selectedFile.uploadedBy.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedFile.uploadedBy.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{formatDate(selectedFile.uploadedAt)}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFile.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">URL</label>
                  <div className="flex space-x-2 mt-1">
                    <Input value={selectedFile.url} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
