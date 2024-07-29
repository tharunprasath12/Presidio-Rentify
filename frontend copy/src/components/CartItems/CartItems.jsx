import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'

export const CartItems = () => {

    const {all_product,cartItems,removeFromCart}=useContext(ShopContext);

  return (
    <div className='cart-items'>
        <div className="cart-items-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Remove</p>
        </div>
        <hr/>
        {console.log(cartItems)}
        {all_product.map((e)=>{
            
            if(cartItems[e.id]>0){
                return <div>
                    <div className="cart-items-format cart-items-format-main">
                        <img src={e.image} alt="" className="cart-items-producticon" />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <img className='cart-items-removeicon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr/>
                </div>
            }
            return null;
        })}
    </div>
  );
}
