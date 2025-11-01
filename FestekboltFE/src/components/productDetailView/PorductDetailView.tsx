import styles from './ProductDetailView.module.css'


export const ProductDetailView = () => {

    
return(<>
    <div className={styles.oneProductContainer}>
        <div className={styles.productPicture}>
            <img src="https://www.bauhaus.hu/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/f/a/festekbolt_fe_kep_2_14.jpg" alt="Product Image" />


        </div>


        <div className={styles.productDetails}>
            <h2>Product Name</h2>
        </div>


    </div>

</>)
};