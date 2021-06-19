import { NextLink } from './Link'
import { PER_PAGE, range } from '../pages/api/pagination'

import styles from '../styles/Pagination.module.scss'

const PREV_COUNT = 2
const NEXT_COUNT = 2

export const Pagination = ({ totalCount, activePage }: { totalCount: number; activePage: number }) => {
  return (
    <ul className={styles.pagination}>
      {activePage > 1 && (
        <li>
          <NextLink to={'/page/' + (activePage - 1)}>back</NextLink>
        </li>
      )}
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => {
        if (activePage > number + PREV_COUNT || activePage < number - NEXT_COUNT) {
          return null
        }
        return (
          <li key={index} className={number === activePage ? styles.active : ''}>
            <NextLink to={'/page/' + number}>{number}</NextLink>
          </li>
        )
      })}
      {activePage < Math.ceil(totalCount / PER_PAGE) && (
        <li>
          <NextLink to={'/page/' + (activePage + 1)}>next</NextLink>
        </li>
      )}
    </ul>
  )
}
