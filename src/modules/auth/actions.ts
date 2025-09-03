'use server';

import { signIn } from '@/auth';

export async function login(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      throw new Error('Invalid credentials.');
    }
    throw error;
  }
}