import React, { useState } from "react";
import Layout from "../../Layout";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";

function Products() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("ProductsData")) || []
  );
  const location = useLocation();
  const relaiseArray = (images) => {
    try {
      const parsedImages = JSON.parse(images);
      return parsedImages.flat();
    } catch (error) {
      console.error("Error parsing images:", error);
      return [];
    }
  };
  function handleDelete(id) {
    const updated = data.filter((row) => row.id !== id);
    setData(updated);
    localStorage.setItem("ProductsData", JSON.stringify(updated));
  }
  return (
    <>
      <Layout />
      <p className={style.location}>
        <span className={style.loc}>Pages</span> {location.pathname}{" "}
      </p>
      <div className={style.wrapper}>
        <p className={style.wText}>Products</p>
        <div className={style.subWrapper}>
          {data.map((item, index) => (
            <div className={style.box} key={index}>
              <div className={style.img}>
                {relaiseArray(item.images).map((img) => (
                  <img src={img} alt="" className={style.rasm} />
                ))}
              </div>
              <div className={style.desk}>
                <p className={style.id}>
                  <span className={style.deskSpan}>
                    id: #{item.category.id}
                  </span>
                </p>
                <p className={style.productName}>
                  <span className={style.deskSpan}>Product name: </span>
                  {item.title}
                </p>
                <p className={style.productCategory}>
                  <span className={style.deskSpan}>Product Category:</span>{" "}
                  {item.category.name}
                </p>
                <p className={style.productPrica}>
                  <span className={style.deskSpan}>Product Price: </span>
                  {item.price} $
                </p>
                <p className={style.description}>
                  <span className={style.deskSpan}>Product desc: </span>
                  {item.description}
                </p>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className={style.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
