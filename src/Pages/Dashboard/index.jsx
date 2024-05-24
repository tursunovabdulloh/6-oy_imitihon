import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import style from "./style.module.css";

function Dashboard() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("usersData")) || []);
  const [categories, setCategories] = useState([]);
  const [userInput, setUserInput] = useState({
    title: "",
    categoryId: "",
    price: "",
    images: "",
    description: "",
  });
  const navigate = useNavigate();
   
  useEffect(() => {
    async function fetchCategories() {
      try {
        const req = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await req.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...userInput,
      images: [userInput.images], 
    };
    console.log(productData);

    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const res = await req.json();
      console.log(res);
      localStorage.setItem("ProductsData", JSON.stringify([res]));
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Layout />
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.title}>
            <h2 className={style.h2}>Create Products</h2>
          </div>
          <div className={style.box}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.NameDiv}>
                <p className={style.Name}>Name</p>
                <input
                  value={userInput.title}
                  onChange={(e) =>
                    setUserInput((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className={style.NameInp}
                  type="text"
                  placeholder="Product name"
                />
              </div>
              <div className={style.categoryDiv}>
                <p className={style.category}>Category</p>
                <select
                  className={style.categoryInp}
                  value={userInput.categoryId}
                  onChange={(e) =>
                    setUserInput((prev) => ({ ...prev, categoryId: e.target.value }))
                  }
                >
                  <option value="">Select category</option>
                  {categories.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.priceDiv}>
                <p className={style.price}>Price</p>
                <input
                  value={userInput.price}
                  onChange={(e) =>
                    setUserInput((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className={style.priceInp}
                  type="number"
                  placeholder="Product price"
                />
              </div>
              <div className={style.imageDiv}>
                <p className={style.image}>Image link</p>
                <input
                  value={userInput.images}
                  onChange={(e) =>
                    setUserInput((prev) => ({ ...prev, images: e.target.value }))
                  }
                  className={style.imageInp}
                  type="url"
                  placeholder="Product image link"
                />
              </div>
              <div className={style.descriptionDiv}>
                <p className={style.description}>Description</p>
                <textarea
                  value={userInput.description}
                  onChange={(e) =>
                    setUserInput((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className={style.textarea}
                  cols="30"
                  rows="10"
                />
              </div>
              <button onClick={()=> {navigate("/products")}} className={style.submitBtn} type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
