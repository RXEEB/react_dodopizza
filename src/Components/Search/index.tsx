import React from 'react'
import styles from './search.module.scss'

type SearchValueProps = {
    searchValue: string;
    setSearchValue: (value: string ) => void;
}

export const Search: React.FC<SearchValueProps> = ({ searchValue, setSearchValue }) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        setSearchValue('')
        inputRef.current?.focus()
      

    }
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }



    return (
        <div className={styles.root}>

            <svg className={styles.icon} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>

            <input ref={inputRef} className={styles.input} type="text" placeholder='Найти вкусняшку....'
                value={searchValue}
                onChange={onChangeInput}
            />
            {searchValue && (
                <svg onClick={onClickClear} className={styles.clear} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" /></svg>
            )
            }

        </div>


    )
}
