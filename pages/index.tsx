import React from 'react'
import { sanityClient } from '../lib/sanity'
import { PostProps } from '../lib/typings'
import Layout from '../components/Layout'
import Header from '../components/Header'
import PostGrid from '../components/PostGrid'

export default function Home({ posts }: PostProps) {
  return (
    <Layout>
      <Header />
      <PostGrid posts={posts} />
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author->{
      name,
      image
    },
    description,
    mainImage
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
