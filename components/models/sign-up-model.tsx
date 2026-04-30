import React from 'react'

const SignUpModel = ({ message }: { message: string }) => {
  return (
    <div className='absolute w-[70%] left-[50%] translate-x-[-50%] translate-y-[-70%] transform py-3
     bg-red-500 text-white text-center rounded-xl'>
      {message}
    </div>
  )
}

export default SignUpModel