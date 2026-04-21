import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children } : { children: React.ReactNode}) => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='absolute top-5 left-5'>
                <Link href={'/'} className={cn(buttonVariants({variant: "secondary"}), "rounded-2xl")}>
                    <ArrowLeft className='size-5'/> <span>Go Back</span>
                </Link>
            </div>
            <div className='w-full max-w-md m-auto'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout