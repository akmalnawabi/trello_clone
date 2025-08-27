"use client";
import { useUser } from "@clerk/nextjs";
import { boardDataService } from "../services";
import { Board } from "../supabase/models";
import { useState } from "react";
import { useSupabase } from "../supabase/SupabaseProvider";

export function useBoards() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const [board, setBoard] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function createBoard(boardData: {
    title: string;
    description?: string;
    user_id?: string;
  }) {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const newBoard = await boardDataService.createBoardWithDefaultColumns(supabase!, {
        ...boardData,
        userId:  user?.id,
      });

      setBoard((prev) => [newBoard, ...prev]);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create board");
    }
  }

  return {
    board,
    loading,
    error,
    createBoard
  }
}