import React from 'react'
import styles from './Pagination.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../Redux/slices/filterSlice'

export const Pagination: React.FC = () => {
  
  const dispatch = useDispatch()
  const page = useSelector((state: any) => state.filter.page)

  const onChangePage = (i: number) => {
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
