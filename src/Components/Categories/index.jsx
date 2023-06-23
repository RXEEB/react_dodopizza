import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setPage } from '../../Redux/slices/filterSlice'

export const Categories = ({value,onChangeCategory,}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  

  // const dispatch = useDispatch()
  // const page = useSelector(state => state.filter.page)



  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => {
            return <li onClick={() => onChangeCategory(index, categories)  }
              className={value === index ? 'active' : ''} key={index}
            >{categoryName}</li>

          })
        }
      </ul>
    </div>
  )
}
