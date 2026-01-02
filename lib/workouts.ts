import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getWorkouts() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('workout_date', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createWorkout(
  name: string,
  workout_date: string
) {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('workouts').insert({
    name,
    workout_date,
    user_id: (await supabase.auth.getUser()).data.user?.id,
  })

  if (error) {
    throw new Error(error.message)
  }
}
