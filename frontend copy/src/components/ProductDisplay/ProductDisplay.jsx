import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../context/ShopContext'

export const ProductDisplay = (props) => {
    const {product}=props;

    const {addToCart} =useContext(ShopContext);

  return (
    <div className="productdisplay">
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <h3>{product.mob}</h3>
            <h4>{product.address}</h4>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-prices-old">${product.old_price}</div>
                <div className="productdisplay-right-prices-new">${product.new_price}</div>
            </div>
            <button >Get The Details in Mail</button>
        </div>
    </div>
  )
}
