import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSort, setSort } from '../../Redux/slices/filterSlice'


type SortItem = {
  name: string;
  sortProperty: string
}

export const sortList: SortItem[] = [
  { name: 'популярности ▲', sortProperty: 'rating' },
  { name: 'популярности ▼', sortProperty: '-rating' },
  { name: 'цене ▲', sortProperty: 'price' },
  { name: 'цене ▼', sortProperty: '-price' },
  { name: 'алфавиту (а-я)', sortProperty: 'title' },
  { name: 'алфавиту (я-а)', sortProperty: '-title' }]

export const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const sortRef = React.useRef<HTMLDivElement>(null)

  const [open, setOpen] = React.useState(false)

  const onClickListItem = (obj: any) => {
    dispatch(setSort(obj))
    setOpen(false)

  }

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const path = event.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open &&
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) =>
              <li
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickListItem(obj)}
                key={index}
              >{obj.name}</li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}

