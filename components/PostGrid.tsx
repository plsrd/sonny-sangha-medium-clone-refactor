import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/sanity'
import { Post } from '../lib/typings'

interface Props {
  posts: [Post]
}

export default function PostGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border hover:shadow-lg">
            {post.mainImage && (
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
                alt=""
              />
            )}
            <div className="flex justify-between bg-white p-5">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-sm">
                  {post.description} by{' '}
                  <span className="text-green-600">{post.author.name}</span>
                </p>
              </div>
              <img
                className="h-12 w-12 rounded-full"
                src={urlFor(post.author.image).height(120).width(120).url()!}
                alt="author image"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
