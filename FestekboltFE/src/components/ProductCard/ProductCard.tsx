import { useState } from 'react';
import { OrangeButton } from "../orangeButton/OrangeButton";
import { Link } from 'react-router-dom';
type ProductCardProps = {
    product_name: string;
    product_image: string;
    product_price: number;
    product_available: boolean;
};


export const ProductCard = ({ product_name, product_image, product_price, product_available }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <><Link to={"/product"}>
            <div style={{
                width: "200px",
                height: "320px",
                borderRadius: "10px",
                border: "1px solid black",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginLeft: "100px",
                paddingBottom: "15px"
            }}>
                <img src={product_image} 
                    alt={product_name}
                    style={{
                        width: "160px",
                        height: "160px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }} />

                <h2 style={{ textAlign: "center", fontSize: "1.1em" }}>{product_name}</h2>
                <h4 style={{ textAlign: "center", margin: "5px 0" }}>{product_price.toLocaleString('hu-HU')} Ft</h4>
                
                {product_available ?
                    <h5 style={{ color: "darkgreen", textAlign: "center", margin: "5px 0" }}>Raktáron</h5> :
                    <h5 style={{ color: "darkred", textAlign: "center", margin: "5px 0" }}>Nincs raktáron</h5>
                }

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '15px 0'
                }}>
                    <button 
                        onClick={handleDecrease}
                        style={counterButtonStyle}
                        disabled={quantity <= 1}
                    >
                        -
                    </button>

                    <span style={{ margin: '0 15px', fontSize: '1.2em', minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                    </span>

                    <button 
                        onClick={handleIncrease}
                        style={counterButtonStyle}
                    >
                        +
                    </button>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '15px 0'
                }}>
                <OrangeButton button_text = "Kosárba" />
                </div>
            </div>
            </Link>
        </>
    )
}

const counterButtonStyle = {
    padding: '4px 10px',
    fontSize: '1em',
    cursor: 'pointer',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px'
};