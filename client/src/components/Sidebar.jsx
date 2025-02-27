"use client"

import { Link } from "react-router-dom"
import { LayoutDashboard, Package, PackageMinus, Percent, Clock, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { logout } from "@/utils/auth"

export function Sidebar({ isOpen, setIsOpen, setAuth }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    logout()
    setAuth(false)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-gray-200 p-4 transition-transform duration-200 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0", // Always show on large screens
        )}
      >
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="text-xl font-bold mb-4 px-4">Time2Deal</h2>
            <nav className="space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/inventory"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </Link>
              <Link
                to="/out-of-stock"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <PackageMinus className="h-5 w-5" />
                <span>Out Of Stock</span>
              </Link>
              <Link
                to="/discounts"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Percent className="h-5 w-5" />
                <span>Discounts</span>
              </Link>
              <Link
                to="/expired-medicines"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Clock className="h-5 w-5" />
                <span>Expired Medicines</span>
              </Link>
            </nav>
          </div>

          <div className="absolute bottom-8 space-y-2 w-[calc(100%-2rem)]">
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <button
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors w-full"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>You will need to login again to access your account.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

