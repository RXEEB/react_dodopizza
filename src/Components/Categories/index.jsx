import React from 'react'

export const Categories = ({value,onChangeCategory}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  

  // const [activeIndex, setActiveIndex] = React.useState(0)


  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => {
            return <li onClick={() => onChangeCategory(index, categories)}
              className={value === index ? 'active' : ''} key={index}
            >{categoryName}</li>

          })
        }
      </ul>
    </div>
  )
}
