import { NextLink } from './Link'
import { PER_PAGE, range } from '../pages/api/pagination'

import styles from '../styles/Pagination.module.scss'

export const Pagination = ({ totalCount }: { totalCount: number }) => {
  return (
    <ul className={styles.pagination}>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <NextLink to={'/page/' + number}>{number}</NextLink>
        </li>
      ))}
    </ul>
  )
}
