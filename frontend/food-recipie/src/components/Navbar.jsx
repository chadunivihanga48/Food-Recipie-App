import React from 'react'
import Model from './Model'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])

  const checkLogin = ()=> {
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else{
       setIsOpen(true)
    }
  }
  return (
   <>
   <header>
    <h2>Food Blog</h2>
    <ul>
        <li><NavLink to= "/">Home</NavLink></li>
        <li onClick = {()=> isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
        <li onClick = {()=> isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
        <li onClick = {checkLogin}><p className = 'login'>{(isLogin)? "Login": "Logout"}{user?.email ? `(${user?.email})` : ""}</p></li>
    </ul>
   </header>
   { (isOpen) && <Model onClose = {() => setIsOpen(false)}><InputForm setIsOpen={()=> setIsOpen(false)}/></Model>}
   </>
  )
}
