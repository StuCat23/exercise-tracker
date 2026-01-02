'use client'

import { signOut } from '@/lib/supabase/auth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded border px-3 py-1"
    >
      Logout
    </button>
  )
}
