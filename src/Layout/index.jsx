import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./style.module.css"
import home from "../assets/home.png"
import chat from "../assets/bar-chart.png"
import file from "../assets/file.png"
import rocket from "../assets/rocket.png"
import { useState } from "react";

 function Layout() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("usersData")) || [])
  const navigate = useNavigate();


  function deleteData(id){
    const updatedRows = data.filter((row)=> row.id !== id)
    setData(updatedRows) 
   localStorage.setItem('usersData', JSON.stringify(updatedRows))
   localStorage.setItem("user", JSON.stringify(false));
   navigate("/signup")
  }

  return (
   <>
    <div className={style.sidebarWrapper}>
      <div className={style.firstDiv}>
       <div  className={style.UserDiv}>
        {data.map((item, index) => (
          <>
          <img className={style.avatar} src={item.avatar} alt="" />
          <h1 className={style.userText}>{item.name}</h1>
          </>
           ))}
       </div>
       <div className={style.hrDiv}>
         <hr className={style.hr}/>
       </div>
        <NavLink to={"/dashboard"} className={style.nawlink1}>
        <span className={style.spanImg}>
        <img className={style.bg1} src={home} />    
        </span>
        <p className={style.p1}>Dashboard</p>
      </NavLink> 
        <NavLink to={"/products"} className={style.nawlink2}>
         <span className={style.spanImg}>
        <img className={style.bg2} src={chat} />    
        </span>
        <p className={style.p2}>Products</p>
        </NavLink>
       <div className={style.pDiv}>
           <p className={style.sidebarText}>ACCOUNT PAGES</p>
       </div>      
         <NavLink to="/signup" className={style.nawlink3}>
          <span className={style.spanImg}>
        <img className={style.bg3} src={file} />    
        </span>
         <p className={style.p3}>Sign Up</p>
         </NavLink> 
         <Link className={style.nawlink4}>
        {data.map((column, index) => (
          <>
       <span className={style.spanImg}>
        <img className={style.bg4} src={rocket} />    
        </span>
         <p onClick={() => {deleteData(column.id)}} className={style.p4}>Log out</p>
          </>
        ))}
         </Link>
       </div>
    </div>
   </>
  )
}

export default Layout;
