import { createClient } from 'microcms-js-sdk' //ES6

const client = createClient({
  serviceDomain: 'nextjs-microcms',
  apiKey: String(process.env.NEXT_PUBLIC_MICROCMS_TOKEN),
})

export const getPosts = async <T>(path: string): Promise<T> => {
  return await client.get({ endpoint: path })
}

export const getPost = async <T>(path: string, id: string): Promise<T> => {
  return await client.get({ endpoint: path + '/' + id })
}
