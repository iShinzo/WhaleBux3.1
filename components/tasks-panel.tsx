// components/tasks-panel.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Task {
  id: number;
  name: string;
  completed: boolean;
  // Add other fields as needed
}

const TasksPanel = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      const { data: session } = await supabase.auth.getSession()
      
      if (!session?.session?.user) return
      
      const userId = session.session.user.id
      
      // Get all available tasks
      const { data: allTasks } = await supabase
        .from('tasks')
        .select('*')
      
      // Get user's completed tasks
      const { data: userTasks } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', userId)
      
      // Mark completed tasks
      const processedTasks = (allTasks ?? []).map(task => ({
        ...task,
        completed: (userTasks ?? []).some(ut => ut.task_id === task.id)
      }))
      
      setTasks(processedTasks)
      setIsLoading(false)
    }
    
    fetchTasks()
  }, [])
  
  // Complete task function
  const completeTask = async (taskId: number) => {
    const { data: session } = await supabase.auth.getSession()
    if (!session?.session?.user) return
    
    const userId = session.session.user.id
    
    // Add to user_tasks table
    await supabase
      .from('user_tasks')
      .upsert({ user_id: userId, task_id: taskId })
    
    // Update UI
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? {...task, completed: true} : task
      )
    )
    
    // Get reward info
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      // Update user stats
      // This would call your updateUserData function
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name} - {task.completed ? 'Completed' : 'Pending'}
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete Task</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TasksPanel