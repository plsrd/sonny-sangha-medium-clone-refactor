import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import PortableText from 'react-portable-text'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-05',
  useCDN: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

export const sanityClient = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const SanityPortableText = ({ content }) => (
  <PortableText
    {...config}
    content={content}
    serializers={{
      h1: (props) => <h1 className="my-5 text-2xl font-bold" {...props} />,
      h2: (props) => <h2 className="my-5 text-xl font-bold" {...props} />,
      li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
      link: ({ href, children }) => (
        <a href={href} className="hover-underline text-blue-500">
          {children}
        </a>
      ),
    }}
  />
)
