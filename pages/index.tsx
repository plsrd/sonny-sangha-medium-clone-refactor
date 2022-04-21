import React from 'react'
import { sanityClient } from '../lib/sanity'
import { Post } from '../lib/typings'
import Layout from '../components/Layout'
import Header from '../components/Header'
import PostGrid from '../components/PostGrid'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
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
    'slug': slug.current,
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
