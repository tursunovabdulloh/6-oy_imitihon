import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import style from "./style.module.css";

function Dashboard() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("usersData")) || []);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [userInput, setUserInput] = useState({
    title: "",
    categoryId: "",
    price: "",
    images: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
     
  function save() {
  
  }

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

  const validate = () => {
    const newErrors = {};

    if (!userInput.title) newErrors.title = "Name is required.";
    if (!userInput.categoryId) newErrors.categoryId = "Category is required.";
    if (!userInput.price) newErrors.price = "Price is required.";
    if (userInput.price && userInput.price <= 0) newErrors.price = "Price must be greater than zero.";
    if (!userInput.images) newErrors.images = "Image link is required.";
    if (!userInput.description) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const newArr = [] 

  const handleSubmit = async (e) => {


    e.preventDefault();
    if (!validate()) return;

    const productData = {
      ...userInput,
      images: [userInput.images],
    };
    if(productData){
      productData,
      newArr.push(productData)
    }
    console.log(newArr)
    try {
      const req = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
           Access: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const res = await req.json();
      console.log(res);
      localStorage.setItem("ProductsData", JSON.stringify([ ...JSON.parse(localStorage.getItem('ProductsData')), res]));
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Layout />
 <p className={style.location}><span className={style.loc}>Pages</span> {location.pathname}</p>
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
                {errors.title && <span className={style.error}>{errors.title}</span>}
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
                {errors.categoryId && <span className={style.error}>{errors.categoryId}</span>}
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
                {errors.price && <span className={style.error}>{errors.price}</span>}
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
                {errors.images && <span className={style.error}>{errors.images}</span>}
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
                {errors.description && <span className={style.error}>{errors.description}</span>}
              </div>
              <button onClick={()=>{
              save()
              }} className={style.submitBtn} type="submit">
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
