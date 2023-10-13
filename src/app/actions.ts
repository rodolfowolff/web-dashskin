'use server'

import { createUser } from '@/services/api-url'
import { revalidateTag } from 'next/cache'


export default async function submit(data: { username: string, email: string, age: number, avatar: string }) {
  await createUser(
    data
  )
  revalidateTag('users')
}