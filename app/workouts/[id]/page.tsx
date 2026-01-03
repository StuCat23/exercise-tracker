import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getExercises, createExercise, deleteExercise } from '@/lib/exercises';

type Props = {
    params: { id: string }
}

export default async function WorkoutDetailPage({ params }: Props) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        redirect('/login')
    }

    const { data: workout } = await supabase
        .from('workouts')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!workout) {
        redirect('/dashboard')
    }

    const exercises = await getExercises(params.id)

    async function addExercise(formData: FormData) {
        'use server'

        await createExercise(
            params.id,
            formData.get('name') as string,
            Number(formData.get('sets')),
            Number(formData.get('reps')),
            Number(formData.get('weight')) || undefined
        )
    }

    async function removeExercise(id: string) {
        'use server'
        await deleteExercise(id)
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="mb-2 text-2xl font-bold">{workout.name}</h1>
            <p className="mb-6 text-gray-500">{workout.workout_date}</p>

            {/* Add Exercise */}
            <form action={addExercise} className="mb-6 grid grid-cols-5 gap-2">
                <input
                    name="name"
                    placeholder="Exercise"
                    required
                    className="col-span-2 rounded border p-2"
                />
                <input
                    name="sets"
                    type="number"
                    placeholder="Sets"
                    required
                    className="rounded border p-2"
                />
                <input
                    name="reps"
                    type="number"
                    placeholder="Reps"
                    required
                    className="rounded border p-2"
                />
                <input
                    name="weight"
                    type="number"
                    step="0.5"
                    placeholder="Weight"
                    className="rounded border p-2"
                />
                <button className="col-span-5 rounded bg-black p-2 text-white">
                    Add Exercise
                </button>
            </form>

            {/* Exercise List */}
            {exercises.length === 0 ? (
                <p className="text-gray-500">No Exercises yet.</p>
            ) : (
                <ul className="space-y-2">
                    {exercises.map((exercise) => (
                        <li
                            key={exercise.id}
                            className="flex items-center justify-between rounded border p-3"
                        >
                            <div>
                                <p className="font-medium">{exercise.name}</p>
                                <p className="text-sm text-gray-500">
                                    {exercise.sets} x {exercise.reps}
                                    {exercise.weight && ` @ ${exercise.weight}`}
                                </p>
                            </div>

                            <form action={removeExercise.bind(null, exercise.id)}>
                                <button className="text-sm text-red-600 hover: underline">
                                    Delete
                                </button>
                            </form>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}