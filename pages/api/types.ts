export type Post = {
  id: string

  title: string
  body: string
} & Date

export type PostList = {
  contents: Array<Post>
  totalCount: number
  offset: number
  limit: number
}

export type About = {
  body: string
} & Date

type Date = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}
