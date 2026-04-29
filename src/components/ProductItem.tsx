import React from 'react'
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';
import CustomButton from './CustomButton';

function ProductItem({ product }: { product: Product }) {
      const addToCart = useCartStore((state) => state.addToCart);
    
        const handleCart = (product: Product) => {
            addToCart({
                id: product.id,
                name: product.name,
                price: 100
            });
        }

  return (<div style={styles.product} key={product.id}>
                <h2 style={{ textAlign: "center", color: '#fff' }}>{product.name}</h2>
                <img width="100%" style={{ minHeight: 400 }} src={product.image} />
                <p>{product.price}</p>
                <CustomButton 
                    customStyle={styles.btn} 
                    handleSubmit={() => handleCart(product)} 
                    btnName="Add to cart"
                    type="button"
                />
            </div>)
}

export default ProductItem

const styles: { [key: string]: React.CSSProperties } = {
    product: {
        border: "1px solid #c5aa6a",
        padding: 10,
        margin: 10,
        background: "#c5aa6a",
        width: 250,
        height: "auto",
        minHeight: 400,
        position: "relative",
        borderRadius: 10
    },
    btn: {
        padding: 10,
        minWidth: 100,
        maxWidth: 100,
        position: "absolute",
        bottom: 10,
        right: '30%'
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    }
}