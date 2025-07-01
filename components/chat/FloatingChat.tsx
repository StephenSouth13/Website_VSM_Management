"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: number
  user: string
  avatar: string
  message: string
  time: string
  isMe: boolean
}

const mockMessages: Message[] = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    avatar: "NA",
    message: "Chào mọi người! Có ai online không?",
    time: "10:30",
    isMe: false,
  },
  {
    id: 2,
    user: "Bạn",
    avatar: "ME",
    message: "Chào A! Mình đang online đây",
    time: "10:32",
    isMe: true,
  },
  {
    id: 3,
    user: "Trần Thị B",
    avatar: "TB",
    message: "Website mới của team đã hoàn thành chưa?",
    time: "10:35",
    isMe: false,
  },
]

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: "Bạn",
        avatar: "ME",
        message: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full w-14 h-14 shadow-lg" size="icon">
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96"
          >
            <Card className="h-full flex flex-col shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Chat Team</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${message.isMe ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{message.avatar}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p
                              className={`text-xs mt-1 ${message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                            >
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
