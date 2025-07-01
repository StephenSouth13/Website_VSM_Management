"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Type, ImageIcon, Square, Layout, Smartphone, Monitor, Tablet, Eye, Save, Undo, Redo } from "lucide-react"

interface Block {
  id: string
  type: "text" | "image" | "button" | "container"
  content: string
  style: {
    bgColor?: string
    textColor?: string
    fontSize?: string
    padding?: string
    margin?: string
  }
  action?: {
    type: "link" | "popup" | "scroll"
    value: string
  }
}

const blockTypes = [
  { type: "text", label: "Văn bản", icon: Type },
  { type: "image", label: "Hình ảnh", icon: ImageIcon },
  { type: "button", label: "Nút bấm", icon: Square },
  { type: "container", label: "Container", icon: Layout },
]

export default function EditorPage({ params }: { params: { siteId: string } }) {
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "block-1",
      type: "text",
      content: "Chào mừng đến với website của chúng tôi",
      style: {
        fontSize: "2xl",
        textColor: "black",
        padding: "4",
      },
    },
  ])

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: type === "text" ? "Nội dung mới" : type === "button" ? "Nút bấm" : "",
      style: {
        padding: "4",
      },
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }

  const getViewportClass = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      default:
        return "max-w-4xl"
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Left Panel - Block Library */}
      <div className="w-64 bg-card border-r">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Thư viện Block</h3>
          <div className="space-y-2">
            {blockTypes.map((blockType) => (
              <Button
                key={blockType.type}
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => addBlock(blockType.type as Block["type"])}
              >
                <blockType.icon className="mr-2 h-4 w-4" />
                {blockType.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel - Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-1">
                <Button
                  variant={viewport === "desktop" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewport("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewport === "tablet" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewport("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewport === "mobile" ? "default" : "outline"}
                  size="icon"
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
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 overflow-auto bg-muted/20">
          <div className={`mx-auto bg-white min-h-full shadow-lg ${getViewportClass()}`}>
            <div className="p-6 space-y-4">
              {blocks.map((block) => (
                <motion.div
                  key={block.id}
                  className={`border-2 border-dashed border-transparent hover:border-primary cursor-pointer p-${block.style.padding || "4"}`}
                  onClick={() => setSelectedBlock(block)}
                  whileHover={{ scale: 1.02 }}
                >
                  {block.type === "text" && (
                    <div className={`text-${block.style.fontSize || "base"} text-${block.style.textColor || "black"}`}>
                      {block.content}
                    </div>
                  )}
                  {block.type === "button" && (
                    <Button className={`bg-${block.style.bgColor || "primary"}`}>{block.content}</Button>
                  )}
                  {block.type === "image" && (
                    <div className="w-full h-48 bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className="w-80 bg-card border-l">
        <div className="p-4">
          <h3 className="font-semibold mb-4">Thuộc tính</h3>
          {selectedBlock ? (
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Nội dung</TabsTrigger>
                <TabsTrigger value="style">Kiểu dáng</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="content">Nội dung</Label>
                  <Input
                    id="content"
                    value={selectedBlock.content}
                    onChange={(e) => updateBlock(selectedBlock.id, { content: e.target.value })}
                  />
                </div>
                {selectedBlock.type === "button" && (
                  <div>
                    <Label htmlFor="action">Hành động</Label>
                    <Input
                      id="action"
                      placeholder="https://example.com"
                      value={selectedBlock.action?.value || ""}
                      onChange={(e) =>
                        updateBlock(selectedBlock.id, {
                          action: { type: "link", value: e.target.value },
                        })
                      }
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="style" className="space-y-4">
                <div>
                  <Label htmlFor="textColor">Màu chữ</Label>
                  <Input
                    id="textColor"
                    value={selectedBlock.style.textColor || ""}
                    onChange={(e) =>
                      updateBlock(selectedBlock.id, {
                        style: { ...selectedBlock.style, textColor: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bgColor">Màu nền</Label>
                  <Input
                    id="bgColor"
                    value={selectedBlock.style.bgColor || ""}
                    onChange={(e) =>
                      updateBlock(selectedBlock.id, {
                        style: { ...selectedBlock.style, bgColor: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="fontSize">Kích thước chữ</Label>
                  <Input
                    id="fontSize"
                    value={selectedBlock.style.fontSize || ""}
                    onChange={(e) =>
                      updateBlock(selectedBlock.id, {
                        style: { ...selectedBlock.style, fontSize: e.target.value },
                      })
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-muted-foreground">Chọn một block để chỉnh sửa</p>
          )}
        </div>
      </div>
    </div>
  )
}
