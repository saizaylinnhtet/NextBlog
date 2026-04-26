"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { SignInFormData, SignUpFormData, SignUpResult } from '@/lib/type'
import { signInSchema } from '@/lib/schema'
import { signin, signup } from '@/lib/auth'
import { setTimeout } from 'timers/promises'
import SignUpModel from '@/components/models/sign-up-model'

const Signin = () => {

  const [signInMessage, setSignInMessage] = useState('')
  const timeoutRef = useRef<number| null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const result = await signin(data)
    if (!result) return

    const { success, message }: SignUpResult = result
    if (success === false) {
      setSignInMessage(message)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setSignInMessage(''), 4000)
    }
    reset()
  }

  return (
    <div className='relative'>
      {signInMessage && <SignUpModel message={signInMessage} />}
      <Card className='rounded'>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input className="rounded" aria-invalid={fieldState.invalid} placeholder='johndoe@gmail.com' {...field} />
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
                  </Field>
                )}
              />
              <Button type="submit" className="rounded">Login</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default Signin