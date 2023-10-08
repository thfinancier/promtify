'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()

  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(null)

  // Getting providers data next-auth. Because of the square brackets in the end
  // this useEffect statement gonna run just once, in the start of an app
  // This will allow to sign in with Google and other providers 
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
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create a Post
            </Link>

            <buttion type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </buttion>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt='Profile'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
          {/* Only if both statements are true, meaning we have access to  providers it'll show the buttons  */}
            {providers &&
            // Object.values(obj) is needed to map through an object 
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

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt='Profile'
              className='rounded-full'
              // The better way to switch between boolean states
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {/* When dropdown is toggled will open a dropdown menu */}
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  // Close the dropdown menu when clicked
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  // Close the dropdown menu when clicked
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Promt
                </Link>
                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
            // Object.values(obj) is needed to map through an object 
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
