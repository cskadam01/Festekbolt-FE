import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import styles from "./Slider.module.css"

type SliderProps = {
  images: string[]
}

export const Slider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)


  //megnézzük, hogy az első képen van, ha igen akkor az utolsó kép indexére ugrunk
  const toPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  //megnézzük, hogy az utolsó képen vagyunk-e, ha igen akkor az első képre ugrunk
  const toNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.arrowLeft} onClick={toPrevious}>
        <IoIosArrowBack className={styles.arrowIcon} />
      </div>

      <div className={styles.arrowRight} onClick={toNext}>
        <IoIosArrowForward className={styles.arrowIcon} />
      </div>

      <div
        className={styles.slide}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
    </div>
  )
}
