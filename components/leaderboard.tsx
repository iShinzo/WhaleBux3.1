// components/leaderboard.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, level, tokens')
        .order('tokens', { ascending: false })
        .limit(10)
      
      if (data && !error) {
        setLeaderboardData(data)
      }
      
      setIsLoading(false)
    }
    
    fetchLeaderboard()
  }, [])
  
  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaderboardData.map((user, idx) => (
          <li key={user.username}>
            #{idx + 1} {user.username} - Level {user.level} - {user.tokens} $WBUX
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Leaderboard