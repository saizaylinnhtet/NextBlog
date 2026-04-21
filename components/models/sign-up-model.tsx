import React from 'react'

const SignUpModel = ({ message }: { message: string }) => {
  return (
    <div className='absolute top-0 left-50 transform translate-x-[-50%] px-10 py-5'>{message}</div>
  )
}

export default SignUpModel