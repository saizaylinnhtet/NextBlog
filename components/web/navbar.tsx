import Link from 'next/link'
import React from 'react'
import NavButtons from './navbuttons'

const Navbar = () => {

    return (
        <nav className='w-full py-3 flex items-center justify-between'>
            <div className='w-full flex items-center relative'>
                <Link href='/' >
                    <h1 className='text-[2rem] font-bold'>
                        Next<span className='text-blue-500'>Blog</span>
                    </h1>
                </Link>
                <ul className='text-[1.1rem] hidden lg:flex items-center gap-2 ml-2'>
                    <li className='px-8 hover:scale-110 transition duration-500'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='px-8 hover:scale-110 transition duration-500'>
                        <Link href='/blog'>Blog</Link>
                    </li>
                    <li className='px-8 hover:scale-110 transition duration-500'>
                        <Link href='/create'>Create</Link>
                    </li>
                </ul>

            </div>
            <NavButtons />
        </nav>

    )
}

export default Navbar