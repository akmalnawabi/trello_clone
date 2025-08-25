'use client';
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useBoards } from "@/lib/hooks/useBoards";

export default function DashboardPage() {
    const { user } = useUser();
    const {createBoard} = useBoards();

    const handleCreateBoard = async () => {
      await createBoard({title: 'New Board'});
        console.log('Create Board');
    }

    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <main className="container mx-auto px-4 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName ?? user?.emailAddresses[0].emailAddress}! 👋</h1>
              <p className="text-gray-600">
                Here's what's happening with your boards today.
              </p>

              <Button className="w-full sm:w-auto mt-2" onClick={handleCreateBoard}>
                <PlusIcon className="w-4 h-4" />
                Create Board
              </Button>
            </div>
          </main>
        </div>
    )
}