import React from 'react'
import styles from './Pagination.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../Redux/slices/filterSlice'

export const Pagination = () => {
  
  const dispatch = useDispatch()
  const page = useSelector(state => state.filter.page)

  const onChangePage = (i) => {
    dispatch(setPage(i))
     
  }
   
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
