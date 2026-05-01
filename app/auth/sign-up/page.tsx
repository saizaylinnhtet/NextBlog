"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { SignUpFormData, SignUpResult } from '@/lib/type'
import { signUpSchema } from '@/lib/schema'
import { signup } from '@/lib/auth'
import { setTimeout } from 'timers/promises'
import SignUpModel from '@/components/models/sign-up-model'
import Link from 'next/link'

const Signup = () => {

  const [signUpMessage, setSignUpMessage] = useState('')
  const timeoutRef = useRef<number| null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const result = await signup(data)
    if (!result) return

    const { success, message }: SignUpResult = result
    if (success === false) {
      setSignUpMessage(message)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setSignUpMessage(''), 4000)
    }
    reset()
  }

  return (
    <div className='relative'>
      {signUpMessage && <SignUpModel message={signUpMessage} />}
      <Card className='rounded'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input className="rounded" aria-invalid={fieldState.invalid} placeholder='John Doe' {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input className="rounded" aria-invalid={fieldState.invalid} placeholder='johndoe@gmail.com' {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input className="rounded" aria-invalid={fieldState.invalid} placeholder='********' type='password' {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="submit" className="rounded">
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <div className='mt-5 text-center text-sm'>Already have account? Go to <Link href='/auth/sign-in' className='text-blue-500'>Sign In</Link></div>
    </div>

  )
}

export default Signup