import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
        redirect('/login')
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>
            <p className="text-gray-600">
                You are signed in.
            </p>
        </main>
    );
}