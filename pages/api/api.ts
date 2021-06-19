import { createClient } from 'microcms-js-sdk'
import type { PostList, Post } from './types'

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

export const fetchAllPosts = async (offset: number = 0, posts: Array<Post> = []): Promise<Array<Post>> => {
  const limit = 5
  const allPosts = posts
  const response = await getPosts<PostList>({ offset, limit })
  const newAllPosts = [...allPosts, ...response.contents]
  if (response.contents.length === limit) {
    return await fetchAllPosts(offset + response.contents.length, newAllPosts)
  } else {
    return newAllPosts
  }
}
