import { useState } from "react";
import styles from "./ProductFeedBack.module.css"

type FeedBack={
    long_disc: string | undefined

}

export const ProductFeedBack = ({long_disc}:FeedBack) => {
    const [activeTab, setActiveTab] = useState('description');

return(
<>
    <div className={styles.tabsContainer}>

        {/* Felső gombok (az "ajánlatkérés" am sztem nálunk nem kell, de egyik oldalon ezt láttam, szóval ez lesz) */}
      <div className={styles.tabHeader}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Leírás és Paraméterek
        </button>

        <button 
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Vélemények
        </button>

        <button 
          className={`${styles.tabButton} ${activeTab === 'quote' ? styles.active : ''}`}
          onClick={() => setActiveTab('quote')}
        >
          Ajánlatkérés
        </button>
      </div>

        {/* Tartalom rész */}
      <div className={styles.tabContent}>
        {activeTab === 'description' && (
          <div className={styles.contentFadeIn}>
            <h3>Termék leírás</h3>
            <p>
              {long_disc}
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.contentFadeIn}>
            <h3>Vásárlói vélemények</h3>
            <p>Jelenleg még nem érkezett vélemény ehhez a termékhez.</p>
          </div>
        )}

        {activeTab === 'quote' && (
          <div className={styles.contentFadeIn}>
            <h3>Ajánlatkérés</h3>
            <p>Nagyobb mennyiségre van szüksége? Kérjen egyedi árajánlatot!</p>
          </div>
        )}

      </div>
    </div>
</>
)
};