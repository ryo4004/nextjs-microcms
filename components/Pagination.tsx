import { NextLink } from './Link'
import { PER_PAGE, range } from '../pages/api/pagination'

import styles from '../styles/Pagination.module.scss'

const NEXT_COUNT = 2
const PREV_COUNT = 2
const MIN_COUNT = NEXT_COUNT + PREV_COUNT + 1

export const Pagination = ({ totalCount, activePage }: { totalCount: number; activePage: number }) => {
  const maxPage = Math.ceil(totalCount / PER_PAGE)
  return (
    <ul className={styles.pagination}>
      {activePage > 1 && (
        <li>
          <NextLink to={'/page/' + (activePage - 1)}>prev</NextLink>
        </li>
      )}
      {activePage === 1 && <li className={styles.disabled}>prev</li>}
      {range(1, maxPage).map((number, index) => {
        if (activePage < number - NEXT_COUNT && !(number <= MIN_COUNT)) {
          return null
        }
        if (activePage > number + PREV_COUNT && !(number > maxPage - MIN_COUNT)) {
          return null
        }
        return (
          <li key={index} className={number === activePage ? styles.active : ''}>
            <NextLink to={'/page/' + number}>{number}</NextLink>
          </li>
        )
      })}
      {activePage < maxPage && (
        <li>
          <NextLink to={'/page/' + (activePage + 1)}>next</NextLink>
        </li>
      )}
      {activePage === maxPage && <li className={styles.disabled}>next</li>}
    </ul>
  )
}
