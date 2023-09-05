'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const isUserLoggedIn = true

  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setResponse = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setResponse()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promtify Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-promt' className='black_btn'>
              Create a Post
            </Link>

            <buttion type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </buttion>

            <Link href='/profile'>
              <Image
                src='/assets/images/profile.svg'
                width={37}
                height={37}
                alt='Profile'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
