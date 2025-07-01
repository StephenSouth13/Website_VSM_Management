"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Moon, Sun, Sparkles, Zap, Shield, Trophy, Target, Rocket } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { setCurrentUser } from "@/lib/mockData"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check credentials for different roles
    const credentials = [
      { email: "admin@vsm.vn", password: "admin123", userId: 1 },
      { email: "leader@vsm.vn", password: "leader123", userId: 2 },
      { email: "dev@vsm.vn", password: "dev123", userId: 3 },
      { email: "designer@vsm.vn", password: "designer123", userId: 4 },
      { email: "editor@vsm.vn", password: "editor123", userId: 5 },
    ]

    const validCredential = credentials.find((cred) => cred.email === email && cred.password === password)

    if (validCredential) {
      // Set the current user based on login
      setCurrentUser(validCredential.userId)
      router.push("/dashboard")
    } else {
      // Show error for invalid credentials
      alert("Email hoặc mật khẩu không đúng!")
    }
    setIsLoading(false)
  }

  const quickLoginButtons = [
    { role: "Admin", email: "admin@vsm.vn", password: "admin123", color: "bg-yellow-500", icon: "👑" },
    { role: "Leader", email: "leader@vsm.vn", password: "leader123", color: "bg-blue-500", icon: "🛡️" },
    { role: "Developer", email: "dev@vsm.vn", password: "dev123", color: "bg-green-500", icon: "💻" },
    { role: "Designer", email: "designer@vsm.vn", password: "designer123", color: "bg-purple-500", icon: "🎨" },
    { role: "Editor", email: "editor@vsm.vn", password: "editor123", color: "bg-orange-500", icon: "✍️" },
  ]

  const handleQuickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* VSM Professional Sports Background */}
      <div className="absolute inset-0">
        {/* Base gradient - VSM colors with sports energy */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600" />

        {/* Dynamic overlay patterns */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-500/20" />

        {/* Geometric sports-inspired shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white rotate-45 rounded-lg" />
          <div className="absolute top-40 right-32 w-24 h-24 border-4 border-white/60 rotate-12 rounded-full" />
          <div className="absolute bottom-32 left-40 w-28 h-28 border-4 border-white/40 -rotate-12" />
          <div className="absolute bottom-20 right-20 w-20 h-20 border-4 border-white/80 rotate-45 rounded-lg" />
        </div>

        {/* Dynamic grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated energy waves */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-transparent via-white/20 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Floating Sports Elements */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Trophy className="w-8 h-8 text-white/60" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 w-14 h-14 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Target className="w-7 h-7 text-white/60" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-40 w-18 h-18 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Rocket className="w-8 h-8 text-white/60" />
      </motion.div>

      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo & Theme Toggle */}
          <div className="flex items-center justify-between mb-8">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-2xl border-2 border-white/20">
                  <span className="text-emerald-600 font-bold text-xl">VSM</span>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                </motion.div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white drop-shadow-lg">VSM CMS</span>
                <p className="text-sm text-white/80 font-medium">Professional Builder</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </motion.div>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/95 border-2 border-white/50 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800">Chào mừng trở lại! 🏆</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Đăng nhập để truy cập hệ thống quản lý website VSM
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@vsm.vn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pl-4 pr-4 bg-white/80 border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300 text-gray-800"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-4 pr-12 bg-white/80 border-2 border-gray-200 focus:border-emerald-500 transition-all duration-300 text-gray-800"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-10 w-10 hover:bg-gray-100 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Đăng nhập
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Quick Login Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="text-center mb-3">
                    <span className="text-sm font-medium text-gray-600">🚀 Quick Login (Demo)</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {quickLoginButtons.map((btn) => (
                      <Button
                        key={btn.role}
                        variant="outline"
                        size="sm"
                        className="h-12 flex flex-col items-center justify-center p-1 hover:scale-105 transition-transform bg-transparent"
                        onClick={() => handleQuickLogin(btn.email, btn.password)}
                        title={`${btn.role}: ${btn.email} / ${btn.password}`}
                      >
                        <span className="text-lg mb-1">{btn.icon}</span>
                        <span className="text-xs font-medium">{btn.role}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs text-gray-500">Click để tự động điền thông tin đăng nhập</p>
                  </div>
                </motion.div>

                {/* Credentials Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">📋 Tài khoản Demo:</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>
                        <strong>Admin:</strong> admin@vsm.vn / admin123
                      </div>
                      <div>
                        <strong>Leader:</strong> leader@vsm.vn / leader123
                      </div>
                      <div>
                        <strong>Developer:</strong> dev@vsm.vn / dev123
                      </div>
                      <div>
                        <strong>Designer:</strong> designer@vsm.vn / designer123
                      </div>
                      <div>
                        <strong>Editor:</strong> editor@vsm.vn / editor123
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <span className="text-xs text-gray-600 font-medium">Bảo mật cao</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                      <span className="text-xs text-gray-600 font-medium">AI-Powered</span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex flex-1 items-center justify-center p-8 relative z-10"
      >
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 relative"
          >
            <div className="relative mx-auto w-80 h-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
              <Image
                src="/login/hero.png"
                alt="VSM Team"
                width={320}
                height={240}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-bold">VSM Development Team</p>
                <p className="text-xs opacity-90">Building championship websites</p>
              </div>
            </div>

            {/* Floating achievement badges */}
            <motion.div
              className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              🏆 #1 CMS
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              ⚡ Pro Speed
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Xây dựng website <span className="text-yellow-300">chuyên nghiệp</span>
            </h2>
            <p className="text-xl text-white/90 mb-6 drop-shadow">
              Hệ thống CMS hiện đại, mạnh mẽ như một đội thể thao chuyên nghiệp
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="font-medium">1000+ Templates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="font-medium">Team Collab</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
