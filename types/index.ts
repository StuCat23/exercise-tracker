export type Workout = {
    id: string
    name: string
    workout_date: string
    create_at: string
};

export type Exercise = {
  id: string
  workout_id: string
  name: string
  sets: number
  reps: number
  weight?: number
  created_at: string
}
