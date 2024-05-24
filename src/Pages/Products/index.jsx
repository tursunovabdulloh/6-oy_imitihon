import React, { useState } from 'react';
import Layout from "../../Layout";
import style from "./style.module.css";

function Products() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("ProductsData")) || []);

  const relaiseArray = (images) => {
    try {
      const parsedImages = JSON.parse(images); 
      return parsedImages.flat(); 
    } catch (error) {
      console.error("Error parsing images:", error);
      return [];
    }
  };

  return (
    <>
      <Layout />
      <div className={style.wrapper}>
       <p className={style.wText}>Products</p>
       <div className={style.subWrapper}>
        {data.map((item, index) => (
          <div className={style.box} key={index}>
            <div className={style.img}>
              {relaiseArray(item.images).map((img) => (
                <img  src={img} alt="" className={style.rasm} />
              ))}
            </div>
            <div className={style.desk}>
              <p>id: {item.category.id}</p>
              <p>Product name: {item.title}</p>
              <p>Product Category: {item.category.name}</p>
              <p>Product Price: {item.price} $</p>
              <p>Product desc: {item.description}</p>
              <button className={style.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
       </div>
      </div>
    </>
  );
}

export default Products;
