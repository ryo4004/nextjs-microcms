import { createClient } from 'microcms-js-sdk' //ES6

const client = createClient({
  serviceDomain: 'nextjs-microcms',
  apiKey: String(process.env.NEXT_SECRET_MICROCMS_TOKEN),
})

export const request = async <T>(path: string): Promise<T> => {
  return await client.get({ endpoint: path })
}

export const getPost = async <T>(path: string, id: string): Promise<T> => {
  return await client.get({ endpoint: path + '/' + id })
}

export const getPosts = async <T>(): Promise<T> => {
  return await request('post')
}

export const getAbout = async <T>(): Promise<T> => {
  return await request('about')
}
