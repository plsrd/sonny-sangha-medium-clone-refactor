import React, { useState } from 'react'
import { sanityClient, urlFor } from '../../lib/sanity'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Post as PostType } from '../../lib/typings'
import Layout from '../../components/Layout'
import { SanityPortableText } from '../../lib/sanity'
import CommentForm from '../../components/CommentForm'

interface Props {
  post: PostType
}

export default function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <Layout>
      <img
        className="h-60 w-full object-cover"
        src={urlFor(post.mainImage).url()}
        alt="main image"
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-5 mb-3 text-3xl">{post.title}</h1>
        <h2 className="text-grey-500 mb-2 text-xl font-light">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).height(40).width(40).url()}
            alt="author image"
          />
          <p className="text-sm font-extralight">
            Blog post by{' '}
            <span className="text-green-600">{post.author.name}</span> -
            Published At {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <SanityPortableText content={post.body} />
        </div>
      </article>
      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
          <h3 className="text-3xl font-bold">Thanks for your comment!</h3>
          <p>Once it has been approved it will appear.</p>
        </div>
      ) : (
        <CommentForm _id={post._id} setSubmitted={setSubmitted} />
      )}
      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}:</span>{' '}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    'slug': slug.current
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: PostType) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    body,
    'slug': slug.current,
    author->{
      name,
      image
    },
    description,
    mainImage,
    'comments': *[ _type == 'comment' && references(^._id) && approved]
  }`

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
