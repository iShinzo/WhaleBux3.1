import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setIsLoading(false)
    return { error }
  }

  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    setIsLoading(false)
    return { error }
  }

  return { signIn, signUp, isLoading }
}
