import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getWorkouts } from '@/lib/workouts';
import Link from 'next/link';

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
        redirect('/login')
    }

    const workouts = await getWorkouts();

    return (
        <main className="mx-auto max-w-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Workouts</h1>
                <Link href="/workouts/new" className="rounded bg-black px-3 py-1 text-white">
                    New
                </Link>
            </div>

            {workouts.length === 0 ? (
                <p className="text-gray-500">
                    No workouts yet. Create your first one.
                </p>
            ): (
                <ul className="space-y-3">
                    {workouts.map((workout) => (
                        <li key={workout.id} className="rounded border p-4 hover:bg-gray-50">
                            <Link href={`/workouts/${workout.id}`}>
                                <h2 className="font-semibold">{workout.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {workout.workout_date}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}