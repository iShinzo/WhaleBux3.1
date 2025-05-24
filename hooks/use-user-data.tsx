// hooks/use-user-data.ts
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Define the type for user data
export interface UserData {
  username: string;
  level: number;
  coins: number;
  tokens: number;
  rateUpgradeLevel: number;
  boostUpgradeLevel: number;
  timeUpgradeLevel: number;
  vipLevel: number;
  vipExpiryDate: string | null;
  // Add other fields as needed
}

// Define the type for updates to avoid implicit 'any' error
interface UserDataUpdates {
  username?: string;
  level?: number;
  coins?: number;
  tokens?: number;
  rateUpgradeLevel?: number;
  boostUpgradeLevel?: number;
  timeUpgradeLevel?: number;
  vipLevel?: number;
  vipExpiryDate?: string | null;
  // Add other fields as needed
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    level: 1,
    coins: 0,
    tokens: 0,
    rateUpgradeLevel: 0,
    boostUpgradeLevel: 0,
    timeUpgradeLevel: 0,
    vipLevel: 0,
    vipExpiryDate: null,
    // Add other fields as needed
  })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user data from Supabase
  useEffect(() => {
    async function fetchUserData() {
      const { data: session } = await supabase.auth.getSession()
      if (session?.session?.user) {
        const userId = session.session.user.id
        // Get user profile data from your profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single()
        if (data && !error) {
          setUserData({
            username: data.username || 'User',
            level: data.level || 1,
            coins: data.coins || 0,
            tokens: data.tokens || 0,
            rateUpgradeLevel: data.rate_upgrade_level || 0,
            boostUpgradeLevel: data.boost_upgrade_level || 0,
            timeUpgradeLevel: data.time_upgrade_level || 0,
            vipLevel: data.vip_level || 0,
            vipExpiryDate: data.vip_expiry_date || null,
            // Map other fields
          })
        }
      }
      setIsLoading(false)
    }
    fetchUserData()
  }, [])

  // Update user data in Supabase
  const updateUserData = async (updates: UserDataUpdates) => {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user) return
    const userId = session.session.user.id
    setUserData(prev => ({ ...prev, ...updates }))
    // Convert to snake_case for database
    const dbUpdates = {
      username: updates.username,
      level: updates.level,
      coins: updates.coins,
      tokens: updates.tokens,
      rate_upgrade_level: updates.rateUpgradeLevel,
      boost_upgrade_level: updates.boostUpgradeLevel,
      time_upgrade_level: updates.timeUpgradeLevel,
      vip_level: updates.vipLevel,
      vip_expiry_date: updates.vipExpiryDate,
      // Map other fields
    }
    // Only include fields that were actually updated
    const filteredUpdates = Object.entries(dbUpdates)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    // Update in Supabase
    const { data: updateResult, error } = await supabase
      .from('profiles')
      .update(filteredUpdates)
      .eq('user_id', userId)
      .select()
    if (error || !updateResult || updateResult.length === 0) {
      console.error('Error updating user data:', error, updateResult)
    }
  }

  return { userData, updateUserData, isLoading }
}