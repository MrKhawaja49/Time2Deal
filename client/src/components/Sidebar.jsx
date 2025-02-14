import { Link } from "react-router-dom"
import { LayoutDashboard, Package, PackageMinus, Percent, Clock, Settings, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { logout } from "@/utils/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function Sidebar({ isOpen, setIsOpen, setAuth }) {
  const handleLogout = () => {
    logout()
    setAuth(false)
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
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h2 className="text-xl font-bold mb-4 px-4">Time2Deal</h2>
            <nav className="space-y-2">
              <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsOpen(false)} />
              <SidebarLink to="/inventory" icon={Package} label="Inventory" onClick={() => setIsOpen(false)} />
              <SidebarLink to="/out-of-stock" icon={PackageMinus} label="Out Of Stock" onClick={() => setIsOpen(false)} />
              <SidebarLink to="/discounts" icon={Percent} label="Discounts" onClick={() => setIsOpen(false)} />
              <SidebarLink to="/expired-medicines" icon={Clock} label="Expired Medicines" onClick={() => setIsOpen(false)} />
            </nav>
          </div>
          <div className="mt-auto">
            <SidebarLink to="/settings" icon={Settings} label="Settings" onClick={() => setIsOpen(false)} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors w-full justify-start">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will log you out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </aside>
    </>
  )
}

function SidebarLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  )
}