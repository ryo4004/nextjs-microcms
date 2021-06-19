export type Post = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
}

export type PostList = {
  contents: Array<Post>
  totalCount: number
  offset: number
  limit: number
}
