'use client'

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Kanban } from "lucide-react"
import { Button } from "./ui/button"

export default function Navbar() {
    const { isSignedIn, user } = useUser()
    return (
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Kanban className="w-6 h-6 sm:h-8 sm:w-8 text-blue-500" />
                    <span className="texl-xl sm:text-2xl font-bold text-gray-900">Akmal Nawabi</span>
                </div>
                <div className="flex items-center space-x-2">
                    {isSignedIn ? <div className="flex flex-col sm:flex-row 
                    items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <span className="text-sm sm:text-base text-gray-600">Welcome, {user?.firstName ?? user?.emailAddresses[0].emailAddress}</span>
                        
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