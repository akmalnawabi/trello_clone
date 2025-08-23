import { createClient } from "@/lib/supabase/server";
import { Board } from "./supabase/models";

export const boardsService = {
  async getBoards(userId: string): Promise<Board[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('boards').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

   async createBoards(board: Omit<Board, 'id' | 'created_at' | 'updated_at'>): Promise<Board> {
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('boards').insert(board).select().single();
    if (error) throw error;
    return data || [];
  }
};