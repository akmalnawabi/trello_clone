'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { ArrowRight, Kanban } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {

    const { isSignedIn, user } = useUser()
    const pathname = usePathname();

    // check if the page is the home page, dashboard page
    const isDashboardPage = pathname === '/dashboard';
    const isBoardPage = pathname.startsWith('/boards/');

    if (isDashboardPage) {
        return (
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                    {/* logo part  */}
                    <div className="flex items-center space-x-2">
                        <Kanban className="w-6 h-6 sm:h-8 sm:w-8 text-blue-500" />
                        <span className="texl-xl sm:text-2xl font-bold text-gray-900">Akmal Nawabi</span>
                    </div>
                    {/* user part  */}
                    <div className="flex items-center space-x-2">
                       <UserButton />
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                {/* logo part  */}
                <div className="flex items-center space-x-2">
                    <Kanban className="w-6 h-6 sm:h-8 sm:w-8 text-blue-500" />
                    <span className="texl-xl sm:text-2xl font-bold text-gray-900">Akmal Nawabi</span>
                </div>
                {/* user part  */}
                <div className="flex items-center space-x-2">
                    {isSignedIn ? <div className="flex flex-col sm:flex-row 
                    items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <span className="text-sm sm:text-base text-gray-600 hidden sm:block">
                            Welcome, {user?.firstName ?? user?.emailAddresses[0].emailAddress}
                        </span>
                        <Link href="/dashboard">
                            <Button>
                                <span>Dashboard</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div> : <div>
                        <SignInButton>
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </div>}
                </div>
            </div>
        </header>
    )
}