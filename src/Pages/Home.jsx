import React from 'react'

import { useEffect } from 'react';
import { Categories } from '../Components/Categories'
import { Sort } from '../Components/Sotr'
import { PizzaBlock } from '../Components/PizzaBlock';
import { Skeleton } from '../Components/PizzaBlock/Skeleton';


export const Home = () => {

  const [items, setItems] = React.useState([])
  const [categoryId, setCategoryId] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  })



  useEffect(() => {
    setIsLoading(true)
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sotrBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

  
    fetch(`https://6281a8369fac04c654078cb9.mockapi.io/items?${category}&sortBy=${sotrBy}&order=${order}`)
      .then(res => {
        return res.json()
      }).then((json) => {
        setItems(json)
        setIsLoading(false)

      })
    window.scrollTo(0, 0)
  }, [categoryId,sortType])
  console.log(categoryId)

  return (
    <div className="container">
      <div className="content__top">

        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) :
            items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)
        }

      </div>
    </div>
  )
}
