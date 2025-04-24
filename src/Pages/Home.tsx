import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store'
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
import { useAppDispatch } from '../Redux/store';

type SearchValueProps = {
  searchValue: string;
}

export const Home: React.FC<SearchValueProps> = ({ searchValue }) => {
  const naviget = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { categoryId, sort, page } = useSelector((state: RootState) => state.filter)
  const { items, status } = useSelector((state: RootState) => state.pizza)

  const onClickCategory = (i: number) => {
    dispatch(setCategoryId(i))
    dispatch(setPage(1))
  }

  const getPizzas = async () => {


    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''



    dispatch(fetchPizzas({
      order,
      sortBy,
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
      const params: any = qs.parse(window.location.search.substring(1)) as unknown
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

  console.log(items)
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



