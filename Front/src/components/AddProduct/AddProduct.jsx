import React, { useContext, useState } from 'react'
import './AddProduct.css'
import upload_area from '../assets/upload_area.svg'   
import { ShopContext } from '../../context/ShopContext'

const AddProduct = () => {

    const [image,setImage]=useState(false);
    const {addToCart} =useContext(ShopContext);
    
    const [productDetails,setproductDetails]=useState({
        name:"",
        mob:"",
        address:"",
        image:"",
        old_price:"",
        new_price:"",
        category:"School",
        bhk:"2BHK"
    });

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setproductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
        console.log(productDetails);
        let responceData;
        let product = productDetails;
        
        let formData =new FormData();
        formData.append('product',image);
        
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{
            console.log(data);
            responceData=data
        })
        
        console.log(productDetails);
        if(responceData.success){
            product.image=responceData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                // data.success?alert("Uploaded"):alert("Failed");
                if(data.success)
                console.log(data.id);
                {addToCart(data.id)}
            })
        }
    }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Owner Name</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Owner moblie</p>
            <input value={productDetails.mob} onChange={changeHandler} type="text" name="mob" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Owner Addres</p>
            <input value={productDetails.address} onChange={changeHandler} type="text" name="address" placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Category</p>
            <select  value={productDetails.category} onChange={changeHandler}  name="category" className='addproduct-selector'>
                <option value="School">School</option>
                <option value="College">College</option>
                <option value="Hospital">Hospital</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>BHK</p>
            <select  value={productDetails.bhk} onChange={changeHandler}  name="bhk" className='addproduct-selector'>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumnail'/>
            </label>
            <input onChange = {imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={()=>{Add_Product()}}>ADD</button>

    </div>
  )
}

export default AddProduct