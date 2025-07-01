"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  CalendarDays,
  Clock,
  Plus,
  Users,
  MapPin,
  Bell,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Copy,
  AlertTriangle,
  Star,
  Video,
  Phone,
} from "lucide-react"
import { mockCalendarEvents, mockUsers, currentUser, hasPermission } from "@/lib/mockData"

const eventTypes = [
  { value: "meeting", label: "Cuộc họp", color: "#3b82f6", icon: Users },
  { value: "deadline", label: "Deadline", color: "#dc2626", icon: AlertTriangle },
  { value: "presentation", label: "Thuyết trình", color: "#059669", icon: Star },
  { value: "training", label: "Đào tạo", color: "#7c3aed", icon: Calendar },
  { value: "reminder", label: "Nhắc nhở", color: "#f59e0b", icon: Bell },
]

const priorityLevels = [
  { value: "low", label: "Thấp", color: "#6b7280" },
  { value: "medium", label: "Trung bình", color: "#f59e0b" },
  { value: "high", label: "Cao", color: "#dc2626" },
  { value: "urgent", label: "Khẩn cấp", color: "#991b1b" },
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState(mockCalendarEvents)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    type: "meeting",
    priority: "medium",
    location: "",
    attendees: [] as number[],
    isRecurring: false,
    recurringPattern: "weekly",
    reminders: [15],
  })

  const canCreateEvents = hasPermission(currentUser.role, "create_events") || hasPermission(currentUser.role, "all")
  const canManageTeam = hasPermission(currentUser.role, "manage_team") || hasPermission(currentUser.role, "all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || event.type === filterType
    return matchesSearch && matchesFilter
  })

  const todayEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.startTime)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  })

  const upcomingEvents = filteredEvents
    .filter((event) => {
      const eventDate = new Date(event.startTime)
      const today = new Date()
      return eventDate > today
    })
    .slice(0, 5)

  const handleCreateEvent = () => {
    if (!canCreateEvents) return

    const event = {
      id: events.length + 1,
      ...newEvent,
      startTime: new Date(newEvent.startTime).toISOString(),
      endTime: new Date(newEvent.endTime).toISOString(),
      attendees: mockUsers.filter((user) => newEvent.attendees.includes(user.id)),
      createdBy: currentUser,
      status: "confirmed",
      color: eventTypes.find((t) => t.value === newEvent.type)?.color || "#3b82f6",
    }

    setEvents([...events, event])
    setIsCreateModalOpen(false)
    setNewEvent({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      type: "meeting",
      priority: "medium",
      location: "",
      attendees: [],
      isRecurring: false,
      recurringPattern: "weekly",
      reminders: [15],
    })
  }

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find((t) => t.value === type) || eventTypes[0]
  }

  const getPriorityInfo = (priority: string) => {
    return priorityLevels.find((p) => p.value === priority) || priorityLevels[1]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📅 Lịch làm việc</h1>
          <p className="text-muted-foreground">Quản lý lịch họp và sự kiện của team</p>
        </div>
        <div className="flex items-center space-x-3">
          {canCreateEvents && (
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-emerald-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo sự kiện
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tạo sự kiện mới</DialogTitle>
                  <DialogDescription>
                    {canManageTeam ? "Tạo sự kiện và gán cho các thành viên trong team" : "Tạo sự kiện cá nhân"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Tiêu đề sự kiện *</Label>
                      <Input
                        id="title"
                        placeholder="Nhập tiêu đề sự kiện"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Loại sự kiện</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về sự kiện"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Thời gian bắt đầu *</Label>
                      <Input
                        id="startTime"
                        type="datetime-local"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Thời gian kết thúc *</Label>
                      <Input
                        id="endTime"
                        type="datetime-local"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Địa điểm</Label>
                      <Input
                        id="location"
                        placeholder="Phòng họp, địa chỉ hoặc link online"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Mức độ ưu tiên</Label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value) => setNewEvent({ ...newEvent, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: priority.color }} />
                                <span>{priority.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {canManageTeam && (
                    <div className="space-y-2">
                      <Label>Người tham gia</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {mockUsers.map((user) => (
                          <div key={user.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`user-${user.id}`}
                              checked={newEvent.attendees.includes(user.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewEvent({ ...newEvent, attendees: [...newEvent.attendees, user.id] })
                                } else {
                                  setNewEvent({
                                    ...newEvent,
                                    attendees: newEvent.attendees.filter((id) => id !== user.id),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`user-${user.id}`} className="text-sm flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {user.role}
                              </Badge>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recurring"
                        checked={newEvent.isRecurring}
                        onCheckedChange={(checked) => setNewEvent({ ...newEvent, isRecurring: !!checked })}
                      />
                      <Label htmlFor="recurring">Lặp lại</Label>
                    </div>
                    {newEvent.isRecurring && (
                      <Select
                        value={newEvent.recurringPattern}
                        onValueChange={(value) => setNewEvent({ ...newEvent, recurringPattern: value })}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Hàng ngày</SelectItem>
                          <SelectItem value="weekly">Hàng tuần</SelectItem>
                          <SelectItem value="monthly">Hàng tháng</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button
                      onClick={handleCreateEvent}
                      disabled={!newEvent.title || !newEvent.startTime || !newEvent.endTime}
                    >
                      Tạo sự kiện
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
          <TabsList>
            <TabsTrigger value="month">Tháng</TabsTrigger>
            <TabsTrigger value="week">Tuần</TabsTrigger>
            <TabsTrigger value="day">Ngày</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Mini Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                {selectedDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
              </CardTitle>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div key={day} className="p-2 font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6
                const isToday = day === new Date().getDate()
                const hasEvent =
                  day > 0 &&
                  day <= 31 &&
                  filteredEvents.some((event) => {
                    const eventDate = new Date(event.startTime)
                    return eventDate.getDate() === day
                  })

                return (
                  <motion.div
                    key={i}
                    className={`p-2 cursor-pointer rounded-md relative ${
                      day > 0 && day <= 31
                        ? isToday
                          ? "bg-primary text-primary-foreground font-bold"
                          : "hover:bg-muted"
                        : "text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {day > 0 && day <= 31 ? day : ""}
                    {hasEvent && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sự kiện hôm nay</span>
              <Badge variant="secondary">{todayEvents.length} sự kiện</Badge>
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Không có sự kiện nào hôm nay</p>
                </div>
              ) : (
                todayEvents.map((event, index) => {
                  const typeInfo = getEventTypeInfo(event.type)
                  const priorityInfo = getPriorityInfo(event.priority)

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full mt-1" style={{ backgroundColor: event.color }} />
                        <div className="w-px h-8 bg-border mt-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium truncate">{event.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: priorityInfo.color, color: priorityInfo.color }}
                            >
                              {priorityInfo.label}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {typeInfo.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(event.startTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.endTime).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {event.location && (
                            <>
                              <MapPin className="ml-4 mr-1 h-3 w-3" />
                              <span className="truncate">{event.location}</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{event.description}</p>
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center mt-2 space-x-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 3).map((attendee: any, i: number) => (
                                <Avatar key={i} className="w-6 h-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">
                                    {attendee.name
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {event.attendees.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                  <span className="text-xs">+{event.attendees.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Sự kiện sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {upcomingEvents.map((event, index) => {
                const typeInfo = getEventTypeInfo(event.type)
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm truncate">{event.title}</h5>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(event.startTime).toLocaleDateString("vi-VN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {typeInfo.label}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Sự kiện tuần này</p>
                <p className="text-2xl font-bold">
                  {
                    filteredEvents.filter((e) => {
                      const eventDate = new Date(e.startTime)
                      const weekStart = new Date()
                      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
                      const weekEnd = new Date(weekStart)
                      weekEnd.setDate(weekEnd.getDate() + 6)
                      return eventDate >= weekStart && eventDate <= weekEnd
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Cuộc họp</p>
                <p className="text-2xl font-bold">{filteredEvents.filter((e) => e.type === "meeting").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Deadline</p>
                <p className="text-2xl font-bold">{filteredEvents.filter((e) => e.type === "deadline").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Nhắc nhở</p>
                <p className="text-2xl font-bold">{filteredEvents.filter((e) => e.type === "reminder").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedEvent.color }} />
                  <span>{selectedEvent.title}</span>
                </DialogTitle>
                <div className="flex items-center space-x-2">
                  {selectedEvent.location?.includes("zoom") && (
                    <Button size="sm" variant="outline">
                      <Video className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Thời gian</Label>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(selectedEvent.startTime).toLocaleString("vi-VN")} -
                      {new Date(selectedEvent.endTime).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Loại & Ưu tiên</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{getEventTypeInfo(selectedEvent.type).label}</Badge>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: getPriorityInfo(selectedEvent.priority).color,
                        color: getPriorityInfo(selectedEvent.priority).color,
                      }}
                    >
                      {getPriorityInfo(selectedEvent.priority).label}
                    </Badge>
                  </div>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Địa điểm</Label>
                  <div className="flex items-center mt-1">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Mô tả</Label>
                  <p className="mt-1 text-sm">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Người tham gia</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedEvent.attendees.map((attendee: any, i: number) => (
                      <div key={i} className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {attendee.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{attendee.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {attendee.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Tạo bởi {selectedEvent.createdBy?.name} •{" "}
                  {new Date(selectedEvent.startTime).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Sao chép
                  </Button>
                  {(canCreateEvents || selectedEvent.createdBy?.id === currentUser.id) && (
                    <>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
