"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Rocket,
  Palette,
  Zap,
  Star,
  Download,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Crown,
  Trophy,
  Play,
  Code,
  Layers,
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  Save,
  Undo,
  Redo,
  Type,
  ImageIcon,
  Square,
  Layout,
  Grid,
  Move,
  Copy,
  Trash2,
  Settings,
  List,
  Quote,
  Heading1,
  Plus,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: 1,
    name: "Corporate Champion",
    category: "business",
    description: "Template chuyên nghiệp cho doanh nghiệp hàng đầu",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 0,
    downloads: 1250,
    rating: 4.8,
    tags: ["business", "corporate", "professional"],
    featured: true,
    premium: false,
    blocks: ["hero", "about", "services", "testimonials", "contact"],
    responsive: true,
    seoOptimized: true,
  },
  {
    id: 2,
    name: "Creative Powerhouse",
    category: "creative",
    description: "Template sáng tạo cho agency và studio",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 99000,
    downloads: 890,
    rating: 4.9,
    tags: ["creative", "agency", "portfolio"],
    featured: true,
    premium: true,
    blocks: ["hero", "portfolio", "about", "services", "contact"],
    responsive: true,
    seoOptimized: true,
  },
  {
    id: 3,
    name: "E-commerce Pro",
    category: "ecommerce",
    description: "Template mạnh mẽ cho cửa hàng online",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 199000,
    downloads: 650,
    rating: 4.7,
    tags: ["ecommerce", "shop", "store"],
    featured: false,
    premium: true,
    blocks: ["hero", "products", "categories", "cart", "checkout"],
    responsive: true,
    seoOptimized: true,
  },
  {
    id: 4,
    name: "Blog Master",
    category: "blog",
    description: "Template hiện đại cho blog và tin tức",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 0,
    downloads: 2100,
    rating: 4.6,
    tags: ["blog", "news", "content"],
    featured: false,
    premium: false,
    blocks: ["hero", "posts", "sidebar", "comments", "newsletter"],
    responsive: true,
    seoOptimized: true,
  },
  {
    id: 5,
    name: "Landing Victory",
    category: "landing",
    description: "Template tối ưu cho landing page",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 149000,
    downloads: 780,
    rating: 4.8,
    tags: ["landing", "marketing", "conversion"],
    featured: true,
    premium: true,
    blocks: ["hero", "features", "pricing", "testimonials", "cta"],
    responsive: true,
    seoOptimized: true,
  },
  {
    id: 6,
    name: "Portfolio Elite",
    category: "portfolio",
    description: "Template đẳng cấp cho portfolio cá nhân",
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 0,
    downloads: 1450,
    rating: 4.7,
    tags: ["portfolio", "personal", "showcase"],
    featured: false,
    premium: false,
    blocks: ["hero", "about", "portfolio", "skills", "contact"],
    responsive: true,
    seoOptimized: true,
  },
]

// Advanced Block Types for Drag & Drop Builder
const blockTypes = [
  {
    category: "Layout",
    blocks: [
      { type: "container", label: "Container", icon: Layout, description: "Khung chứa nội dung" },
      { type: "section", label: "Section", icon: Grid, description: "Phần trang với background" },
      { type: "columns", label: "Columns", icon: Layers, description: "Bố cục nhiều cột" },
      { type: "spacer", label: "Spacer", icon: Move, description: "Khoảng trống" },
    ],
  },
  {
    category: "Content",
    blocks: [
      { type: "heading", label: "Heading", icon: Heading1, description: "Tiêu đề các cấp" },
      { type: "text", label: "Text", icon: Type, description: "Đoạn văn bản" },
      { type: "image", label: "Image", icon: ImageIcon, description: "Hình ảnh" },
      { type: "video", label: "Video", icon: Play, description: "Video embed" },
      { type: "gallery", label: "Gallery", icon: Grid, description: "Thư viện ảnh" },
    ],
  },
  {
    category: "Interactive",
    blocks: [
      { type: "button", label: "Button", icon: Square, description: "Nút bấm" },
      { type: "form", label: "Form", icon: Layout, description: "Biểu mẫu" },
      { type: "map", label: "Map", icon: Layout, description: "Bản đồ" },
      { type: "social", label: "Social", icon: Layout, description: "Mạng xã hội" },
    ],
  },
  {
    category: "Advanced",
    blocks: [
      { type: "slider", label: "Slider", icon: Layout, description: "Trình chiếu" },
      { type: "testimonial", label: "Testimonial", icon: Quote, description: "Đánh giá khách hàng" },
      { type: "pricing", label: "Pricing", icon: Layout, description: "Bảng giá" },
      { type: "countdown", label: "Countdown", icon: Layout, description: "Đếm ngược" },
      { type: "accordion", label: "Accordion", icon: List, description: "Danh sách mở rộng" },
    ],
  },
]

interface Block {
  id: string
  type: string
  content: any
  style: {
    [key: string]: any
  }
  settings: {
    [key: string]: any
  }
}

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [websiteName, setWebsiteName] = useState("")
  const [websiteDescription, setWebsiteDescription] = useState("")
  const [showBuilder, setShowBuilder] = useState(false)
  const [builderMode, setBuilderMode] = useState<"visual" | "code">("visual")
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [draggedBlockType, setDraggedBlockType] = useState<string | null>(null)
  const router = useRouter()

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const featuredTemplates = templates.filter((t) => t.featured)

  const createFromTemplate = (templateId: number) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    // Initialize blocks based on template
    const initialBlocks: Block[] = template.blocks.map((blockType, index) => ({
      id: `block-${Date.now()}-${index}`,
      type: blockType,
      content: getDefaultContent(blockType),
      style: getDefaultStyle(blockType),
      settings: getDefaultSettings(blockType),
    }))

    setBlocks(initialBlocks)
    setShowBuilder(true)
    setSelectedTemplate(null)
  }

  const createFromScratch = () => {
    setBlocks([])
    setShowBuilder(true)
  }

  const getDefaultContent = (type: string) => {
    const defaults = {
      hero: {
        title: "Chào mừng đến với website của chúng tôi",
        subtitle: "Tạo ra những trải nghiệm tuyệt vời",
        buttonText: "Tìm hiểu thêm",
      },
      heading: { text: "Tiêu đề mới", level: 1 },
      text: { text: "Đây là đoạn văn bản mẫu. Bạn có thể chỉnh sửa nội dung này." },
      button: { text: "Nhấn vào đây", link: "#" },
      image: { src: "/placeholder.svg?height=300&width=400", alt: "Hình ảnh mẫu" },
    }
    return defaults[type as keyof typeof defaults] || {}
  }

  const getDefaultStyle = (type: string) => {
    const defaults = {
      hero: { backgroundColor: "#f8fafc", padding: "80px 20px", textAlign: "center" },
      heading: { fontSize: "2rem", fontWeight: "bold", color: "#1f2937" },
      text: { fontSize: "1rem", color: "#6b7280", lineHeight: "1.6" },
      button: { backgroundColor: "#3b82f6", color: "white", padding: "12px 24px", borderRadius: "6px" },
      image: { width: "100%", height: "auto", borderRadius: "8px" },
    }
    return defaults[type as keyof typeof defaults] || {}
  }

  const getDefaultSettings = (type: string) => {
    const defaults = {
      hero: { fullWidth: true, overlay: false },
      heading: { seo: true, anchor: "" },
      text: { markdown: false },
      button: { newTab: false, noFollow: false },
      image: { lazy: true, responsive: true },
    }
    return defaults[type as keyof typeof defaults] || {}
  }

  const addBlock = (type: string, position?: number) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      settings: getDefaultSettings(type),
    }

    if (position !== undefined) {
      const newBlocks = [...blocks]
      newBlocks.splice(position, 0, newBlock)
      setBlocks(newBlocks)
    } else {
      setBlocks([...blocks, newBlock])
    }
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
    if (selectedBlock?.id === id) {
      setSelectedBlock(null)
    }
  }

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === id)
    if (!blockToDuplicate) return

    const duplicatedBlock: Block = {
      ...blockToDuplicate,
      id: `block-${Date.now()}`,
    }

    const index = blocks.findIndex((block) => block.id === id)
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, duplicatedBlock)
    setBlocks(newBlocks)
  }

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks]
    const [movedBlock] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, movedBlock)
    setBlocks(newBlocks)
  }

  const getViewportClass = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      default:
        return "max-w-6xl"
    }
  }

  const saveWebsite = () => {
    // Save logic here
    console.log("Saving website:", { websiteName, websiteDescription, blocks })
    router.push("/dashboard/websites")
  }

  const renderBlockContent = (block: Block) => {
    switch (block.type) {
      case "hero":
        return (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">{block.content.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{block.content.subtitle}</p>
            <Button size="lg">{block.content.buttonText}</Button>
          </div>
        )
      case "heading":
        const HeadingTag = `h${block.content.level}` as keyof JSX.IntrinsicElements
        return <HeadingTag>{block.content.text}</HeadingTag>
      case "text":
        return <p>{block.content.text}</p>
      case "button":
        return <Button>{block.content.text}</Button>
      case "image":
        return <img src={block.content.src || "/placeholder.svg"} alt={block.content.alt} style={block.style} />
      default:
        return <div className="p-4 bg-muted rounded">Block: {block.type}</div>
    }
  }

  const renderBlockSettings = (block: Block) => {
    switch (block.type) {
      case "hero":
        return (
          <>
            <div>
              <Label className="text-xs">Tiêu đề</Label>
              <Input
                value={block.content.title}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Phụ đề</Label>
              <Input
                value={block.content.subtitle}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, subtitle: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Text nút</Label>
              <Input
                value={block.content.buttonText}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, buttonText: e.target.value },
                  })
                }
              />
            </div>
          </>
        )
      case "heading":
        return (
          <>
            <div>
              <Label className="text-xs">Nội dung</Label>
              <Input
                value={block.content.text}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, text: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Cấp độ</Label>
              <Select
                value={block.content.level.toString()}
                onValueChange={(value) =>
                  updateBlock(block.id, {
                    content: { ...block.content, level: Number.parseInt(value) },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                  <SelectItem value="5">H5</SelectItem>
                  <SelectItem value="6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "text":
        return (
          <div>
            <Label className="text-xs">Nội dung</Label>
            <Textarea
              value={block.content.text}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value },
                })
              }
            />
          </div>
        )
      case "button":
        return (
          <>
            <div>
              <Label className="text-xs">Text</Label>
              <Input
                value={block.content.text}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, text: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Link</Label>
              <Input
                value={block.content.link}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, link: e.target.value },
                  })
                }
              />
            </div>
          </>
        )
      case "image":
        return (
          <>
            <div>
              <Label className="text-xs">URL hình ảnh</Label>
              <Input
                value={block.content.src}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, src: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs">Alt text</Label>
              <Input
                value={block.content.alt}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, alt: e.target.value },
                  })
                }
              />
            </div>
          </>
        )
      default:
        return <p className="text-xs text-muted-foreground">Không có cài đặt cho block này</p>
    }
  }

  if (showBuilder) {
    return (
      <div className="h-screen flex bg-background">
        {/* Left Panel - Block Library */}
        <div className="w-80 bg-card border-r flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-4">Thư viện Block</h3>
            <div className="space-y-4">
              {blockTypes.map((category) => (
                <div key={category.category}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">{category.category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.blocks.map((block) => (
                      <Button
                        key={block.type}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-center space-y-2 bg-transparent hover:bg-primary/5"
                        onClick={() => addBlock(block.type)}
                        draggable
                        onDragStart={() => setDraggedBlockType(block.type)}
                        onDragEnd={() => setDraggedBlockType(null)}
                      >
                        <block.icon className="h-5 w-5" />
                        <div className="text-center">
                          <div className="text-xs font-medium">{block.label}</div>
                          <div className="text-xs text-muted-foreground">{block.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-card border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={builderMode === "visual" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBuilderMode("visual")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Visual
                </Button>
                <Button
                  variant={builderMode === "code" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setBuilderMode("code")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Code
                </Button>
              </div>

              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewport === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewport("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewport === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewport("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewport === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewport("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Xem trước
              </Button>
              <Button onClick={saveWebsite}>
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-muted/30 p-8 overflow-auto">
            <div className={`mx-auto bg-white shadow-lg transition-all duration-300 ${getViewportClass()}`}>
              {builderMode === "visual" ? (
                <div className="min-h-screen">
                  {blocks.length === 0 ? (
                    <div className="h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                      <div className="text-center">
                        <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Bắt đầu xây dựng website</h3>
                        <p className="text-muted-foreground mb-4">Kéo thả các block từ thư viện bên trái</p>
                        <Button onClick={() => addBlock("hero")}>
                          <Plus className="mr-2 h-4 w-4" />
                          Thêm Hero Section
                        </Button>
                      </div>
                    </div>
                  ) : (
                    blocks.map((block, index) => (
                      <div
                        key={block.id}
                        className={`relative group ${selectedBlock?.id === block.id ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setSelectedBlock(block)}
                      >
                        {/* Block Content */}
                        <div style={block.style}>{renderBlockContent(block)}</div>

                        {/* Block Controls */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center space-x-1 bg-background border rounded-lg p-1 shadow-lg">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Move className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                duplicateBlock(block.id)
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteBlock(block.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Drop Zone */}
                        <div
                          className="h-2 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            if (draggedBlockType) {
                              addBlock(draggedBlockType, index + 1)
                            }
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm">
                  <pre>{JSON.stringify(blocks, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-card border-l flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Thuộc tính</h3>
          </div>
          <div className="flex-1 p-4">
            {selectedBlock ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Block Type</Label>
                  <p className="text-sm text-muted-foreground capitalize">{selectedBlock.type}</p>
                </div>

                {/* Content Settings */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Nội dung</Label>
                  {renderBlockSettings(selectedBlock)}
                </div>

                {/* Style Settings */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Kiểu dáng</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Padding</Label>
                      <Input
                        size="sm"
                        value={selectedBlock.style.padding || ""}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, padding: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Margin</Label>
                      <Input
                        size="sm"
                        value={selectedBlock.style.margin || ""}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, margin: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        className="w-12 h-8 p-1 border rounded"
                        value={selectedBlock.style.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, backgroundColor: e.target.value },
                          })
                        }
                      />
                      <Input
                        size="sm"
                        value={selectedBlock.style.backgroundColor || ""}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, backgroundColor: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Cài đặt nâng cao</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Responsive</Label>
                      <input
                        type="checkbox"
                        checked={selectedBlock.settings.responsive || false}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            settings: { ...selectedBlock.settings, responsive: e.target.checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">SEO Optimized</Label>
                      <input
                        type="checkbox"
                        checked={selectedBlock.settings.seo || false}
                        onChange={(e) =>
                          updateBlock(selectedBlock.id, {
                            settings: { ...selectedBlock.settings, seo: e.target.checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4" />
                <p>Chọn một block để chỉnh sửa thuộc tính</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Tạo Website Mới
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Xây dựng website chuyên nghiệp với công cụ drag & drop mạnh mẽ, vượt trội hơn WordPress
          </p>
        </motion.div>

        <div className="flex items-center justify-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="mr-1 h-3 w-3" />
            No-Code
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Crown className="mr-1 h-3 w-3" />
            Professional
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scratch">Từ đầu</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Featured Templates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Templates Nổi Bật</h2>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <Trophy className="mr-1 h-3 w-3" />
                Được yêu thích nhất
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <div className="relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {template.premium && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                          <Crown className="mr-1 h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                        <Button size="sm" variant="secondary">
                          <Eye className="mr-2 h-4 w-4" />
                          Xem trước
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">{template.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{template.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{template.downloads} downloads</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold">
                            {template.price === 0 ? (
                              <span className="text-green-600">Miễn phí</span>
                            ) : (
                              <span>{template.price.toLocaleString("vi-VN")}đ</span>
                            )}
                          </div>
                          <Button
                            onClick={() => createFromTemplate(template.id)}
                            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                          >
                            <Rocket className="mr-2 h-4 w-4" />
                            Sử dụng
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4">
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
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="business">Doanh nghiệp</SelectItem>
                  <SelectItem value="creative">Sáng tạo</SelectItem>
                  <SelectItem value="ecommerce">Thương mại điện tử</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* All Templates */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tất cả Templates</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {template.premium && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                          <Crown className="mr-1 h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span>{template.downloads}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="font-bold">
                            {template.price === 0 ? (
                              <span className="text-green-600">Miễn phí</span>
                            ) : (
                              <span>{template.price.toLocaleString("vi-VN")}đ</span>
                            )}
                          </div>
                          <Button onClick={() => createFromTemplate(template.id)} size="sm">
                            Sử dụng
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scratch" className="space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Palette className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Tạo từ đầu</h2>
                <p className="text-muted-foreground">
                  Bắt đầu với một trang trắng và xây dựng website theo ý tưởng của bạn
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
                <CardDescription>Nhập thông tin cơ bản cho website của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website-name">Tên website</Label>
                  <Input
                    id="website-name"
                    placeholder="Ví dụ: Website Công ty ABC"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website-description">Mô tả</Label>
                  <Textarea
                    id="website-description"
                    placeholder="Mô tả ngắn về website của bạn..."
                    value={websiteDescription}
                    onChange={(e) => setWebsiteDescription(e.target.value)}
                  />
                </div>
                <Button
                  onClick={createFromScratch}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  disabled={!websiteName.trim()}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Bắt đầu xây dựng
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="text-center p-6">
                <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Drag & Drop</h3>
                <p className="text-sm text-muted-foreground">Kéo thả dễ dàng, không cần code</p>
              </Card>
              <Card className="text-center p-6">
                <Smartphone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Responsive</h3>
                <p className="text-sm text-muted-foreground">Tự động tối ưu cho mọi thiết bị</p>
              </Card>
              <Card className="text-center p-6">
                <Rocket className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Tốc độ cao</h3>
                <p className="text-sm text-muted-foreground">Tối ưu hiệu suất và SEO</p>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Import Website</h2>
                <p className="text-muted-foreground">Import website từ các nền tảng khác hoặc file backup</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Từ URL</h3>
                  <p className="text-sm text-muted-foreground">Import website từ URL hiện có</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Từ File</h3>
                  <p className="text-sm text-muted-foreground">Upload file backup hoặc template</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">WordPress</h3>
                  <p className="text-sm text-muted-foreground">Chuyển đổi từ WordPress</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                    <Layers className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Figma</h3>
                  <p className="text-sm text-muted-foreground">Import thiết kế từ Figma</p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Selection Dialog */}
      <Dialog open={selectedTemplate !== null} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chi tiết Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              {/* Template preview and details would go here */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Hủy
                </Button>
                <Button onClick={() => createFromTemplate(selectedTemplate)}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Sử dụng Template
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
