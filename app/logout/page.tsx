"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  Settings,
  Crown,
  Code,
  Palette,
  FileText,
  User,
} from "lucide-react"
import { currentUser } from "@/lib/mockData"
import { useRouter } from "next/navigation"

const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="h-4 w-4 text-yellow-500" />
    case "leader":
      return <Shield className="h-4 w-4 text-blue-500" />
    case "developer":
      return <Code className="h-4 w-4 text-green-500" />
    case "designer":
      return <Palette className="h-4 w-4 text-purple-500" />
    case "editor":
      return <FileText className="h-4 w-4 text-orange-500" />
    default:
      return <User className="h-4 w-4" />
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "leader":
      return "text-blue-600 bg-blue-50 border-blue-200"
    case "developer":
      return "text-green-600 bg-green-50 border-green-200"
    case "designer":
      return "text-purple-600 bg-purple-50 border-purple-200"
    case "editor":
      return "text-orange-600 bg-orange-50 border-orange-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export default function LogoutPage() {
  const [step, setStep] = useState<"confirm" | "processing" | "success">("confirm")
  const [progress, setProgress] = useState(0)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  const sessionDuration = "2 giờ 45 phút"
  const loginTime = new Date(Date.now() - 2 * 60 * 60 * 1000 - 45 * 60 * 1000)

  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStep("success")
            return 100
          }
          return prev + 10
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [step])

  useEffect(() => {
    if (step === "success") {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            router.push("/login")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [step, router])

  const handleLogout = () => {
    setStep("processing")
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {step === "confirm" && (
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <LogOut className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Đăng xuất khỏi VSM CMS</CardTitle>
                <CardDescription className="mt-2">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{currentUser.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleIcon(currentUser.role)}
                    <Badge variant="outline" className={`text-xs ${getRoleColor(currentUser.role)}`}>
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">• {currentUser.department}</span>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Thời gian phiên</span>
                  </div>
                  <span className="font-medium">{sessionDuration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Đăng nhập lúc</span>
                  </div>
                  <span className="font-medium">
                    {loginTime.toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">Lưu ý bảo mật</p>
                    <p className="text-blue-600 mt-1">
                      Đảm bảo đăng xuất hoàn toàn khỏi tất cả thiết bị khi sử dụng máy tính chung.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại
                </Button>
                <Button onClick={handleLogout} className="flex-1 bg-red-600 hover:bg-red-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">Hoặc bạn có thể:</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-3 w-3" />
                    Hồ sơ
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/settings")}>
                    <Settings className="mr-2 h-3 w-3" />
                    Cài đặt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "processing" && (
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <LogOut className="h-8 w-8 text-blue-600" />
                </motion.div>
              </div>
              <div>
                <CardTitle className="text-2xl">Đang đăng xuất...</CardTitle>
                <CardDescription className="mt-2">
                  Vui lòng chờ trong khi chúng tôi xử lý yêu cầu của bạn
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Tiến trình đăng xuất</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress >= 20 ? 1 : 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className={`h-4 w-4 ${progress >= 20 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Lưu dữ liệu phiên làm việc</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress >= 50 ? 1 : 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className={`h-4 w-4 ${progress >= 50 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Xóa token xác thực</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress >= 80 ? 1 : 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className={`h-4 w-4 ${progress >= 80 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Đóng kết nối bảo mật</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress >= 100 ? 1 : 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className={`h-4 w-4 ${progress >= 100 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Hoàn tất đăng xuất</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-green-200">
              <CardHeader className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl text-green-800">Đăng xuất thành công!</CardTitle>
                  <CardDescription className="mt-2">Bạn đã đăng xuất an toàn khỏi VSM CMS</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 text-center">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    Cảm ơn bạn đã sử dụng VSM CMS. Phiên làm việc của bạn đã được lưu an toàn.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Tự động chuyển đến trang đăng nhập trong</p>
                  <motion.div
                    key={countdown}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-primary"
                  >
                    {countdown}
                  </motion.div>
                  <p className="text-xs text-muted-foreground">giây</p>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => router.push("/login")} className="flex-1">
                    Đăng nhập lại
                  </Button>
                  <Button onClick={() => router.push("/")} className="flex-1">
                    Về trang chủ
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Để bảo mật tài khoản, hãy đóng trình duyệt nếu bạn đang sử dụng máy tính chung.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
