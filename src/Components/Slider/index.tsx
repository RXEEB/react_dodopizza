import React, { useRef } from 'react';
import data from './data.json';
import style from './slider.module.scss';

export const Slider: React.FC = () => {

  const [isHovered, setIsHovered] = React.useState(false);

  const slider = useRef<HTMLDivElement>(null);

  const handleLeftClick = () => {
    if (slider.current !== null) {
      slider.current.scrollLeft += slider.current.offsetWidth;
    }
  };

  const handleRightClick = () => {
    if (slider.current !== null) {
      slider.current.scrollLeft -= slider.current.offsetWidth;
    }
  };

  return (
    <div className={style.slider}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <div className={style.slider__track} ref={slider}>
        {data.map((e, index) => {
          return (
            <div className={style.slider__item} key={index}>
              <img className={style.slider__item_img} src={e.image} alt="" />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleLeftClick}
        className={`${style.slider__btn_prev} ${isHovered ? style.visible : ''}`}
      >
        &lt;
      </button>
      <button
        onClick={handleRightClick}
        className={`${style.slider__btn_next} ${isHovered ? style.visible : ''}`}
      >
        &gt;
      </button>
    </div>
  );
};
