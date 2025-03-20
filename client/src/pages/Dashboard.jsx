"use client"

import { useState } from "react"
import { Bell, Search, Menu, Check, User, Settings, LogOut, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { logout } from "@/utils/auth"

// Sample notification data - in a real app, this would come from an API or context
const initialNotifications = [
  {
    id: 1,
    type: "outOfStock",
    title: "Amoxicillin is out of stock",
    description: "Amoxicillin 500mg is now out of stock. Please reorder soon.",
    time: "2 hours ago",
    read: false,
    link: "/out-of-stock",
  },
  {
    id: 2,
    type: "expired",
    title: "Medicines Expiring Soon",
    description: "5 medicines will expire within the next 30 days.",
    time: "1 day ago",
    read: false,
    link: "/expired-medicines",
  },
  {
    id: 3,
    type: "discount",
    title: "New Discount Available",
    description: "New discount available for Panadol. Check it out!",
    time: "2 days ago",
    read: true,
    link: "/discounts",
  },
  {
    id: 4,
    type: "preOrder",
    title: "Low Stock Alert",
    description: "Ibuprofen is running low. Consider pre-ordering.",
    time: "3 hours ago",
    read: false,
    link: "/out-of-stock",
  },
]

export default function Dashboard({ sidebarOpen, setSidebarOpen, setAuth }) {
  console.log("Dashboard is rendering")
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  // In a real app, this would come from a user context or API
  const userName = "John Doe"

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))

    // Navigate to the relevant page
    navigate(notification.link)
    setIsDropdownOpen(false)
  }

  const markAllAsRead = (e) => {
    e.stopPropagation()
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleLogout = () => {
    logout()
    setAuth(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "outOfStock":
        return <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
      case "expired":
        return <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
      case "discount":
        return <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
      case "preOrder":
        return <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
      default:
        return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Welcome back, Time2Deal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notification Dropdown */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 text-white border-gray-800">
              <div className="flex items-center justify-between p-2 border-b border-gray-800">
                <h3 className="font-medium text-gray-200">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs flex items-center gap-1 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={markAllAsRead}
                  >
                    <Check className="h-3 w-3" />
                    Mark all as read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator className="bg-gray-800" />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex flex-col items-start p-3 cursor-pointer hover:bg-gray-800",
                        !notification.read && "bg-gray-800",
                      )}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-center w-full">
                        {getNotificationIcon(notification.type)}
                        <span className="font-medium text-white">{notification.title}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 ml-4">{notification.description}</p>
                      <span className="text-xs text-gray-500 mt-1 ml-4">{notification.time}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </div>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="justify-center text-center text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => {
                  navigate("/notifications")
                  setIsDropdownOpen(false)
                }}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 text-white border-gray-800">
              <div className="p-3 border-b border-gray-800">
                <div className="font-medium text-white">Welcome!</div>
                <div className="text-sm text-gray-400">{userName}</div>
              </div>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="p-3 cursor-pointer hover:bg-gray-800 flex items-center gap-2"
                onClick={() => {
                  navigate("/settings")
                  setIsProfileOpen(false)
                }}
              >
                <User className="h-4 w-4 text-gray-400" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-3 cursor-pointer hover:bg-gray-800 flex items-center gap-2"
                onClick={() => {
                  navigate("/settings")
                  setIsProfileOpen(false)
                }}
              >
                <Settings className="h-4 w-4 text-gray-400" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem
                className="p-3 cursor-pointer hover:bg-gray-800 flex items-center gap-2 text-red-400 hover:text-red-300"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">890</div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">1,234</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">567</div>
          </CardContent>
        </Card>

        <Card className="bg-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">123</div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Expire Date Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              <p>Name: panadol</p>
              <p>Batch: 78678</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name: citizen</p>
              <p>Batch: 78679</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name: citizen</p>
              <p>Batch: 78679</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Out Of Stock</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigate("/out-of-stock")}
            >
              <ShoppingCart className="h-4 w-4" />
              Pre-order
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name: amoxilin</p>
              <p>Batch: 78690</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name: demo1</p>
              <p>Batch: 78690</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

