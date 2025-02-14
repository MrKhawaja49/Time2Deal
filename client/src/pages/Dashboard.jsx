import { Bell, Search, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard({ sidebarOpen, setSidebarOpen }) {
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">out of stock</CardTitle>
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
          <CardHeader>
            <CardTitle>Expire Date Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              <p>Name : panadol</p>
              <p>Batch :78678</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name : citizen</p>
              <p>Batch :78679</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name : citizen</p>
              <p>Batch :78679</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Out Of Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name : amoxilin</p>
              <p>Batch :78690</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p>Name : demo1</p>
              <p>Batch :78690</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}