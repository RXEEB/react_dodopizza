import React from 'react'
import styles from './contenterror.module.scss'

export const ContentError = () => {
    return (
        <div className={styles.content__error}>
            <h1>Произошла ошибка</h1>
            <p>К сожалению, не удалось получить данные. Попробуйте повторить попытку позже.</p>
        </div>
    )
}
