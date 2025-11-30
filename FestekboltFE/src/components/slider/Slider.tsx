import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Slider.module.css";

type SliderProps = {
    images: string[];
};

export const Slider = ({ images }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const toPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const toNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setTimeout(toNext, 5000); // Auto-play every 5 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, toNext]);

    return (
        <div className={styles.slider}>
            <div
                className={styles.slideTrack}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((imageUrl, index) => (
                    <div className={styles.slide} key={index}>
                        <img src={imageUrl} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            <button className={styles.arrowLeft} onClick={toPrevious}>
                <IoIosArrowBack className={styles.arrowIcon} />
            </button>
            <button className={styles.arrowRight} onClick={toNext}>
                <IoIosArrowForward className={styles.arrowIcon} />
            </button>

            <div className={styles.dotsContainer}>
                {images.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        className={`${styles.dot} ${currentIndex === slideIndex ? styles.active : ''}`}
                        onClick={() => goToSlide(slideIndex)}
                    ></div>
                ))}
            </div>
        </div>
    );
};
