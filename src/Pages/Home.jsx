import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setCategoryId } from '../Redux/slices/filterSlice';
import { Categories } from '../Components/Categories'
import { Sort } from '../Components/Sotr'
import { PizzaBlock } from '../Components/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/Skeleton';
import { Pagination } from '../Components/Pagination'





export const Home = ({ searchValue }) => {
  const dispatch = useDispatch()
  const {categoryId,sort} = useSelector(state => state.filter)
 
  

  const [items, setItems] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  
 
  const onClickCategory =(i)=> {
    dispatch(setCategoryId(i))
  }



  useEffect(() => {
    setIsLoading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sotrBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''


    fetch(`https://6281a8369fac04c654078cb9.mockapi.io/items?page=${page}&limit=8&${category}&sortBy=${sotrBy}&order=${order}${search}`)
      .then(res => {
        return res.json()
      }).then((json) => {
        setItems(json)
        setIsLoading(false)

      })
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, page])

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)

  return (
    <div className="container">
      <div className="content__top">

        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {
          isLoading ? skeletons :
            pizzas
        }


      </div>

      <Pagination page={page} setPage={setPage} onChangePage={(index) => setPage(index)} />


    </div>
  )
}

 // filter((obj) => {
  //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {                 // Локальный поиск.
  //     return true
  //   }
  //   return false
  // }).map((obj) => <PizzaBlock {...obj} key={obj.id} />)


  // https://6352d329d0bca53a8eb5fae8.mockapi.io/items                  // доп. ключ  mockapi 

