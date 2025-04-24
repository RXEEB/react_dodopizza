import React from 'react'

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number,categories: string[])=> void;
}

export const Categories:React.FC<CategoriesProps> = ({value,onChangeCategory}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  

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
