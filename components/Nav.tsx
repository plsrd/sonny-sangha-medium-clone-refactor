import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <nav className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://links.papareact.com/yvf"
            alt="medium logo"
          ></img>
        </Link>
        <ul className="hidden items-center space-x-5 md:inline-flex">
          <li>About</li>
          <li>Contact</li>
          <li className="rounded-full bg-green-600 px-4 py-1 text-white">
            Follow
          </li>
        </ul>
      </div>

      <ul className="flex items-center space-x-5 text-green-600">
        <li>Sign In</li>
        <li className="rounded-full border border-green-600 px-4 py-1 hover:bg-green-600 hover:text-white">
          Get Started
        </li>
      </ul>
    </nav>
  )
}

export default Nav
