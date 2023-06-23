import React, { useRef } from 'react';
import data from './data.json'
import style from './slider.module.scss'



export const Slider = () => {

  const slider = useRef(null)

  const handleLeftClick = () => slider.current.scrollLeft += slider.current.offsetWidth
  const handleRightClick = () => slider.current.scrollLeft -= slider.current.offsetWidth


  return (
    <div className={style.slider} >
      <div  className={style.slider__track} ref={slider} >

        {
          data.map((e) => {
            return (
              <div className={style.slider__item} >
                <img className={style.slider__item_img} src={e.image} alt="" />
              </div>
            )
          })
        }

      </div>
      <button onClick={handleLeftClick} className={style.slider__btn_prev}>&lt;</button>
      <button onClick={handleRightClick} className={style.slider__btn_next} >&gt;</button>
    </div>
  )
}
