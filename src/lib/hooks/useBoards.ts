"use client";
import { useUser } from "@clerk/nextjs";
import { boardDataService } from "../services";

export function useBoards() {
  const { user } = useUser();
  
  async function createBoard(boardData: {
    title: string;
    description?: string;
    user_id?: string;
  }) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const newBoard = await boardDataService.createBoardWithDefaultColumns({
        ...boardData,
        userId:  user?.id,
      });
    } catch (error) {
      console.error("Error creating board:", error);
      throw error;
    }
  }

  return {
    createBoard
  }
}