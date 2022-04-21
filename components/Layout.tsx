import React from 'react'
import Head from 'next/head'
import Nav from './Nav'

interface Props {
  children?: JSX.Element[]
}

export default function Layout({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <body>{children}</body>
    </div>
  )
}
