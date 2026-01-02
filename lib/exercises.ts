import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getExercises(workoutId: string) {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('workout_id', workoutId)
        .order('created_at', { ascending: true })

    if (error) {
        throw new Error(error.message)
    }

    return data;
}

export async function createExercise(
    workoutId: string,
    name: string,
    sets: number,
    reps: number,
    weight?: number
) {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.from('exercises').insert({
        workout_id: workoutId,
        name,
        sets,
        reps,
        weight,
    })

    if (error) {
        throw new Error(error.message)
    }
}

export async function deleteExercise(id: string) {
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }
};

