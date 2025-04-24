import React from 'react'
import cartEmptyImg from '../../assets/img/empty-catr2.svg'
import { Link } from 'react-router-dom'

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <img src={cartEmptyImg} alt="Empty cart" />
        <h2>Ой, пусто!</h2>
        <p style={{paddingBottom: '30px'}}>
          Вероятней всего, вы не заказывали ещё пиццу.<br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>

        <Link to='/' className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  )
}
