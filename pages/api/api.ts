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

export const getPosts = async <T>(option?: { offset: number; limit: number }): Promise<T> => {
  const query = option ? '?offset=' + option.offset + '&limit=' + option.limit : ''
  return await request('post' + query)
}

export const getAbout = async <T>(): Promise<T> => {
  return await request('about')
}
