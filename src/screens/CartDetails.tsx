import React, { useContext } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '@/context/ThemeContext';
import type { CartItem, CartState } from '../types/cart';

function CartDetails() {
    
  const context = useContext(ThemeContext);

  const cart = useCartStore((state: CartState) => state.cart);
  const navigate = useNavigate();
    const handleClick = () => {
        navigate("/products");
    }

    const removeFromCart =useCartStore((state: CartState) => state.removeFromCart)

    const handleRemove = (id: number) => {
        removeFromCart(id);
    }

  return (
    <div className='container'>
        <h1>Cart</h1>

        <p>current theme is : {context?.theme}</p>    

       {cart?.length > 0 &&  <div style={styles.innerWrapper}>
            {cart.map((item : CartItem)  => {
                return (
                    <div style={styles.cartItem} key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                )
            })}
        </div> }

        { cart?.length === 0 && (
            <div>
                <p>Cart is empty</p>
                <button onClick={handleClick}>Add Products</button> 
            </div>
            )}
    </div>
  )
}

export default CartDetails

const styles: { [key: string]: React.CSSProperties } =  {
    cartItem: {
        border: "1px solid red",
        padding: 10,
        margin: 10,
        background: "green",
        width: 200,
        height: "auto",
        minHeight: 300,
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap'
    }
}