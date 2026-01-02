import { redirect } from 'next/navigation';
import { createWorkout } from '@/lib/workouts'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function NewWorkoutPage() {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
        redirect('/login')
    }

    async function action(formData: FormData) {
        'use server'

        const name = formData.get('name') as string
        const workout_date = formData.get('workout_date') as string

        await createWorkout(name, workout_date)
        redirect('/dashboard')
    }

    return (
        <main className="mx-auto max-w-md p-6">
            <h1 className="mb-4 text-2xl font-bold">New Workout</h1>

            <form action={action} className="space-y-4">
                <input
                    name="name"
                    placeholder="Workout name"
                    required
                    className="w-full rounded border p-2"
                />

                <input
                    type="date"
                    name="workout_date"
                    required
                    className="w-full rounded border p-2"
                />

                <button className="w-full rounded bg-black p-2 text-white">
                    Create Workout
                </button>
            </form>
        </main>
    );
}