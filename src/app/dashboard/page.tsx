'use client';
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <main className="container mx-auto px-4 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋</h1>
              <p className="text-gray-600">
                Here's what's happening with your boards today.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Tasks</h2>
              </div>
            </div>
          </main>
        </div>
    )
}