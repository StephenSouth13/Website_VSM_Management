"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Plus,
  Search,
  Send,
  Smile,
  Paperclip,
  MoreHorizontal,
  Users,
  User,
  Phone,
  Video,
  Info,
  Edit,
  Trash2,
  Reply,
  CheckCheck,
  Pin,
  Archive,
  MicOffIcon as Mute,
  UserPlus,
  Settings,
  Crown,
  Shield,
  Code,
  Palette,
  FileText,
} from "lucide-react"
import { mockUsers, mockChatRooms, mockChatMessages, currentUser } from "@/lib/mockData"

const reactions = [
  { emoji: "👍", name: "thumbs_up" },
  { emoji: "❤️", name: "heart" },
  { emoji: "😂", name: "laugh" },
  { emoji: "😮", name: "wow" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
]

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
      return <User className="h-3 w-3" />
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "text-yellow-600 bg-yellow-50"
    case "leader":
      return "text-blue-600 bg-blue-50"
    case "developer":
      return "text-green-600 bg-green-50"
    case "designer":
      return "text-purple-600 bg-purple-50"
    case "editor":
      return "text-orange-600 bg-orange-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export default function MessagesPage() {
  const [selectedRoom, setSelectedRoom] = useState(mockChatRooms[0])
  const [messages, setMessages] = useState(mockChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isTyping, setIsTyping] = useState(false)
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [editingMessage, setEditingMessage] = useState<number | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null)
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [chatRooms, setChatRooms] = useState(mockChatRooms)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const filteredRooms = chatRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "groups" && room.type === "group") ||
      (activeTab === "private" && room.type === "private") ||
      (activeTab === "unread" && room.unreadCount > 0)
    return matchesSearch && matchesTab
  })

  const roomMessages = messages.filter((msg) => msg.roomId === selectedRoom.id)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      roomId: selectedRoom.id,
      userId: currentUser.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: "text" as const,
      reactions: [],
      isEdited: false,
      replyTo,
    }

    setMessages([...messages, message])
    setNewMessage("")
    setReplyTo(null)

    // Update last message in room
    setChatRooms((rooms) =>
      rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, lastMessage: { ...message, userId: currentUser.id } } : room,
      ),
    )
  }

  const createPrivateChat = (userId: number) => {
    const otherUser = mockUsers.find((u) => u.id === userId)
    if (!otherUser) return

    // Check if private chat already exists
    const existingChat = chatRooms.find(
      (room) =>
        room.type === "private" &&
        room.members.some((m) => m.id === userId) &&
        room.members.some((m) => m.id === currentUser.id),
    )

    if (existingChat) {
      setSelectedRoom(existingChat)
      setShowNewChatDialog(false)
      return
    }

    const newRoom = {
      id: Date.now(),
      name: otherUser.name,
      type: "private" as const,
      avatar: otherUser.avatar,
      description: `Chat riêng với ${otherUser.name}`,
      members: [currentUser, otherUser],
      lastMessage: {
        id: 0,
        userId: 0,
        message: "Bắt đầu cuộc trò chuyện",
        timestamp: new Date().toISOString(),
        type: "text" as const,
      },
      unreadCount: 0,
      isOnline: true,
      isPinned: false,
      createdAt: new Date().toISOString(),
    }

    setChatRooms([newRoom, ...chatRooms])
    setSelectedRoom(newRoom)
    setShowNewChatDialog(false)
  }

  const createGroupChat = () => {
    if (selectedUsers.length < 2) return

    const members = [currentUser, ...mockUsers.filter((u) => selectedUsers.includes(u.id))]
    const newRoom = {
      id: Date.now(),
      name: `Nhóm ${members.map((m) => m.name.split(" ").pop()).join(", ")}`,
      type: "group" as const,
      avatar: "GR",
      description: `Nhóm chat với ${members.length} thành viên`,
      members,
      lastMessage: {
        id: 0,
        userId: currentUser.id,
        message: "Nhóm chat đã được tạo",
        timestamp: new Date().toISOString(),
        type: "text" as const,
      },
      unreadCount: 0,
      isOnline: true,
      isPinned: false,
      createdAt: new Date().toISOString(),
    }

    setChatRooms([newRoom, ...chatRooms])
    setSelectedRoom(newRoom)
    setShowNewChatDialog(false)
    setSelectedUsers([])
  }

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji)
          if (existingReaction) {
            if (existingReaction.users.includes(currentUser.id)) {
              // Remove reaction
              return {
                ...msg,
                reactions: msg.reactions
                  .map((r) =>
                    r.emoji === emoji
                      ? { ...r, users: r.users.filter((u) => u !== currentUser.id), count: r.count - 1 }
                      : r,
                  )
                  .filter((r) => r.count > 0),
              }
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: msg.reactions.map((r) =>
                  r.emoji === emoji ? { ...r, users: [...r.users, currentUser.id], count: r.count + 1 } : r,
                ),
              }
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [currentUser.id], count: 1 }],
            }
          }
        }
        return msg
      }),
    )
    setShowEmojiPicker(null)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 bg-card border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Tin nhắn</h2>
            <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
              <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Tạo cuộc trò chuyện mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Chọn người dùng:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mockUsers
                        .filter((u) => u.id !== currentUser.id)
                        .map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{user.name}</p>
                                <div className="flex items-center space-x-1">
                                  {getRoleIcon(user.role)}
                                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => createPrivateChat(user.id)}>
                                Chat riêng
                              </Button>
                              <Button
                                size="sm"
                                variant={selectedUsers.includes(user.id) ? "default" : "outline"}
                                onClick={() => {
                                  if (selectedUsers.includes(user.id)) {
                                    setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                                  } else {
                                    setSelectedUsers([...selectedUsers, user.id])
                                  }
                                }}
                              >
                                {selectedUsers.includes(user.id) ? "Đã chọn" : "Chọn"}
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {selectedUsers.length >= 2 && (
                    <Button onClick={createGroupChat} className="w-full">
                      Tạo nhóm chat ({selectedUsers.length + 1} thành viên)
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-2">
            <TabsTrigger value="all" className="text-xs">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">
              Nhóm
            </TabsTrigger>
            <TabsTrigger value="private" className="text-xs">
              Riêng tư
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Chưa đọc
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 mt-2">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-2">
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRoom.id === room.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={room.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {room.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {room.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{room.name}</h4>
                          <div className="flex items-center space-x-1">
                            {room.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                            {room.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                                {room.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{room.lastMessage.message}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(room.lastMessage.timestamp).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {room.type === "group" && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{room.members.length} thành viên</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedRoom.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {selectedRoom.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedRoom.name}</h3>
                <div className="flex items-center space-x-2">
                  {selectedRoom.type === "private" ? (
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${selectedRoom.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      <span className="text-sm text-muted-foreground">
                        {selectedRoom.isOnline ? "Đang hoạt động" : "Không hoạt động"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedRoom.members.length} thành viên</span>
                    </div>
                  )}
                  {isTyping && <span className="text-sm text-muted-foreground italic">đang nhập...</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pin className="mr-2 h-4 w-4" />
                    Ghim cuộc trò chuyện
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mute className="mr-2 h-4 w-4" />
                    Tắt thông báo
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Lưu trữ
                  </DropdownMenuItem>
                  {selectedRoom.type === "group" && (
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Thêm thành viên
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {roomMessages.map((message) => {
              const sender = mockUsers.find((u) => u.id === message.userId)
              const isOwn = message.userId === currentUser.id
              const replyMessage = message.replyTo ? roomMessages.find((m) => m.id === message.replyTo) : null
              const replySender = replyMessage ? mockUsers.find((u) => u.id === replyMessage.userId) : null

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
                    {!isOwn && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={sender?.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {sender?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{sender?.name}</span>
                        <div className="flex items-center space-x-1">
                          {getRoleIcon(sender?.role || "")}
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0.5 ${getRoleColor(sender?.role || "")}`}
                          >
                            {sender?.role}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="group relative">
                      <div className={`p-3 rounded-lg ${isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        {replyMessage && (
                          <div className="mb-2 p-2 bg-black/10 rounded border-l-2 border-primary">
                            <div className="text-xs font-medium">{replySender?.name}</div>
                            <div className="text-xs opacity-75 truncate">{replyMessage.message}</div>
                          </div>
                        )}

                        <div className="flex items-start justify-between">
                          <p className="flex-1">{message.message}</p>
                          {isOwn && (
                            <div className="flex items-center space-x-1 ml-2">
                              {message.isEdited && <span className="text-xs opacity-75">(đã chỉnh sửa)</span>}
                              <CheckCheck className="h-3 w-3 opacity-75" />
                            </div>
                          )}
                        </div>

                        {message.reactions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.reactions.map((reaction, index) => (
                              <button
                                key={index}
                                onClick={() => addReaction(message.id, reaction.emoji)}
                                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                                  reaction.users.includes(currentUser.id)
                                    ? "bg-primary/20 text-primary"
                                    : "bg-background/50 hover:bg-background/75"
                                }`}
                              >
                                <span>{reaction.emoji}</span>
                                <span>{reaction.count}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Message Actions */}
                      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center space-x-1 bg-background border rounded-lg p-1 shadow-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setReplyTo(message.id)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Smile className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <div className="grid grid-cols-3 gap-1 p-2">
                                {reactions.map((reaction) => (
                                  <button
                                    key={reaction.name}
                                    onClick={() => addReaction(message.id, reaction.emoji)}
                                    className="p-2 hover:bg-muted rounded text-lg"
                                  >
                                    {reaction.emoji}
                                  </button>
                                ))}
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {isOwn && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setEditingMessage(message.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {isOwn && (
                      <div className="flex items-center justify-end space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Reply Preview */}
        {replyTo && (
          <div className="bg-muted p-3 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Reply className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Trả lời {mockUsers.find((u) => u.id === roomMessages.find((m) => m.id === replyTo)?.userId)?.name}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setReplyTo(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mt-1 truncate">{roomMessages.find((m) => m.id === replyTo)?.message}</p>
          </div>
        )}

        {/* Message Input */}
        <div className="bg-card border-t p-4">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            />
            <div className="flex-1">
              <Textarea
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                className="min-h-[40px] max-h-32 resize-none"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
