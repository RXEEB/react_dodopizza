import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setFilters, setPage } from '../Redux/slices/filterSlice';
import { fetchPizzas } from '../Redux/slices/pizzaSlice';
import { Categories } from '../Components/Categories'
import { Sort } from '../Components/Sotr'
import { PizzaBlock } from '../Components/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/Skeleton';
import { Pagination } from '../Components/Pagination'
import { sortList } from '../Components/Sotr';
import { ContentError } from '../Components/ContentError'
import { Slider } from '../Components/Slider'

export const Home = ({ searchValue }) => {
  const naviget = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { categoryId, sort, page } = useSelector(state => state.filter)
  const { items, status } = useSelector(state => state.pizza)

  const onClickCategory = (i) => {
    dispatch(setCategoryId(i))
    dispatch(setPage(1))
  }

  const getPizzas = async () => {


    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sotrBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''



    dispatch(fetchPizzas({
      order,
      sotrBy,
      category,
      search,
      page,
    }))


  }

  React.useEffect(() => {                       //если изменили параметры и был первый рендер
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        page,
      })
      naviget(`?${queryString}`)
    }
    isMounted.current = true

  }, [categoryId, sort.sortProperty, page,])

  React.useEffect(() => {                          // если был первый рендер . проверяем url и сохраняем в redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({
        ...params,
        sort,
      })
      )
      isSearch.current = true
    }
  }, [])


  React.useEffect(() => {         //  если был первый рендер . запрашиваем items
    getPizzas()

    isSearch.current = false

  }, [categoryId, sort.sortProperty, searchValue, page])

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />)
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)


  return (
    <div className="container">
      <div className="content__top">

        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <Slider />
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (<div className='content__error'><ContentError /></div>) :              //  !!! Не работает !!//
        (<div className="content__items"> {status === 'loading' ? skeletons : pizzas}</div>)

      }
      <Pagination />
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

