'use client'
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";

type SupabaseContext = {
  supabase: SupabaseClient | null;
  isLoaded: boolean;
}

const Context = createContext<SupabaseContext>({
  supabase: null,
  isLoaded: false,
})

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    // Check if environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY; // Fixed to match .env file

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return;
    }

    const client = createClient(
      supabaseUrl,
      supabaseKey,
      {
        accessToken: async () => session?.getToken() ?? null,
      }
    )

    setSupabase(client);
    setIsLoaded(true);
  }, [session])

  return <Context.Provider value={{ supabase, isLoaded }}>
    {children}
  </Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}