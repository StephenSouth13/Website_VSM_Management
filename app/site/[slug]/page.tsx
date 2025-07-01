"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for a public website
const websiteData = {
  title: "Công ty ABC - Giải pháp công nghệ hàng đầu",
  description: "Chúng tôi cung cấp các giải pháp công nghệ tiên tiến cho doanh nghiệp",
  hero: {
    title: "Chuyển đổi số thành công cùng ABC",
    subtitle: "Giải pháp công nghệ toàn diện cho doanh nghiệp hiện đại",
    cta: "Tìm hiểu thêm",
  },
  services: [
    {
      title: "Phát triển Website",
      description: "Thiết kế và phát triển website chuyên nghiệp",
      icon: "🌐",
    },
    {
      title: "Ứng dụng Mobile",
      description: "Phát triển ứng dụng di động đa nền tảng",
      icon: "📱",
    },
    {
      title: "Tư vấn IT",
      description: "Tư vấn giải pháp công nghệ phù hợp",
      icon: "💡",
    },
  ],
}

export default function PublicSitePage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ABC</span>
              </div>
              <span className="text-xl font-bold">Công ty ABC</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Trang chủ
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Dịch vụ
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Về chúng tôi
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Liên hệ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-500/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{websiteData.hero.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{websiteData.hero.subtitle}</p>
            <Button size="lg" className="text-lg px-8 py-3">
              {websiteData.hero.cta}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dịch vụ của chúng tôi</h2>
            <p className="text-xl text-muted-foreground">Giải pháp công nghệ toàn diện cho mọi nhu cầu</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {websiteData.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng bắt đầu dự án của bạn?</h2>
          <p className="text-xl mb-8 opacity-90">Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí</p>
          <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
            Liên hệ ngay
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ABC</span>
                </div>
                <span className="text-xl font-bold">Công ty ABC</span>
              </div>
              <p className="text-muted-foreground">Giải pháp công nghệ hàng đầu cho doanh nghiệp</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Phát triển Website
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Ứng dụng Mobile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Tư vấn IT
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: info@abc.com</li>
                <li>Phone: (84) 123 456 789</li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            © 2025 VSM | Được phát triển bởi Phòng Công nghệ Thông tin
          </div>
        </div>
      </footer>
    </div>
  )
}
