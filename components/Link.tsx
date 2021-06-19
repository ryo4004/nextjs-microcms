import Link from 'next/link'

export const NextLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link href={to}>
    <a>{children}</a>
  </Link>
)
