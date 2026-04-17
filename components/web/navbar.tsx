import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
    return (
        <nav className='w-full py-5 flex items-center justify-between'>
            <div className='w-full flex items-center relative'>
                <Link href='/' >
                    <h1 className='text-[2.5rem] font-bold'>
                        Next<span className='text-blue-500'>Blog</span>
                    </h1>
                </Link>
                <ul className='text-[1.3rem] hidden lg:flex items-center gap-2 absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                    <li className='px-10 hover:scale-110 transition duration-500'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='px-10 hover:scale-110 transition duration-500'>
                        <Link href='/blog'>Blog</Link>
                    </li>
                    <li className='px-10 hover:scale-110 transition duration-500'>
                        <Link href='/create'>Create</Link>
                    </li>
                </ul>

            </div>
            <div className='flex items-center gap-2'>
                <Link href='/signup' className={cn(buttonVariants(), "text-[1.1rem] p-5 rounded")}>Sign up</Link>
                <Link href='/login' className={cn(buttonVariants({variant: "secondary"}), "text-[1.1rem] p-5 rounded")}>Login</Link>
                <ThemeToggle />
            </div>
        </nav>

    )
}

export default Navbar