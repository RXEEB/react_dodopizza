import React from 'react'
import styles from './Pagination.module.scss'

export const Pagination = ({page, onChangePage, }) => {
  
    
  return (
    
    <div className={styles.pagination}>
          <ul>
       {
        [...Array(3)].map((_, index) => (
          <li className={`${page === index +1 ? styles.active : ''}`}
          onClick={() => onChangePage(index +1)}
          key={index}>{index+ 1}</li>
        ))
       }
      </ul>
    </div>
  )
}
