'use client'

import { useState } from 'react';
import { signUp } from '@/lib/supabase/auth';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        
        const { error } = await signUp(email, password)
        if (error) {
            setError(error.message)
            return
        }

        router.push('/dashboard')
    };

    return (
        <main className="flex min-h-screen items-center justify-center">
            <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">Create account</h1>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded border p-2"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full rounded border p-2"
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button className="w-full rounded bg-black p-2 text-white">
                    Sign up
                </button>
            </form>
        </main>
    )
}