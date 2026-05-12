"use client"

import React from 'react'
import { ThemeToggle } from './theme-toggle'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { useSession } from '@/contexts/session-context'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { logout } from '@/lib/auth'

const NavButtons = () => {

    const session = useSession()

    return (
        <div className='flex items-center gap-2'>
            {session ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className={cn(buttonVariants({ variant: "secondary" }), "p-5 rounded")}>Logout</Button>
                    </AlertDialogTrigger> 
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will logout your
                                account from using NextBlog.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=> logout()} className=' bg-red-500 text-white!'>Logout</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) :
                (
                    <>
                        <Link href='/auth/sign-up' className={cn(buttonVariants(), "p-5 rounded bg-blue-500! text-white!")}>Sign up</Link>
                        <Link href='/auth/sign-in' className={cn(buttonVariants({ variant: "secondary" }), "p-5 rounded")}>Login</Link>
                    </>
                )}
            <ThemeToggle />
        </div>
    )
}

export default NavButtons