import React from 'react'
import Head from 'next/head'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <body>{children}</body>
    </div>
  )
}
