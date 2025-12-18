import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import food1 from '../assets/food1.jpg'
import InputForm from '../components/InputForm'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import RecipeItems from '../components/RecipeItems'
import Model from '../components/Model'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const addRecipe = ()=> {
    let token = localStorage.getItem("token")
    if(token)
    navigate("/addRecipie")
  else{
    setIsOpen(true)
  }
  }
 
  return (
    <>
    <Navbar />
    <section className = 'home'>
        <div className = 'left'>
            <h1>Food Recipe</h1>
            <h5>Welcome to your kitchen’s best companion! Discover delicious recipes, simple ingredients, and easy-to-follow cooking instructions that turn everyday meals into something special. Whether you’re cooking for yourself or your family, inspiration starts here.</h5>
            <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className = 'right'>
            <img src = {food1} width ="320px" height= "300px"></img>
        </div>
         </section>
        <div className = 'bg'>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
            preserveAspectRatio="none">
                <path 
                fill="#d4f6e8" 
                fillOpacity="1" 
                d="M0,64L24,69.3C48,75,96,85,144,80C192,75,240,53,288,85.3C336,117,384,203,432,208C480,213,528,139,576,128C624,117,672,171,720,192C768,213,816,203,864,186.7C912,171,960,149,1008,122.7C1056,96,1104,64,1152,85.3C1200,107,1248,181,1296,202.7C1344,224,1392,192,1416,176L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z" 
                />
                </svg>
        </div>
        { (isOpen) && <Model onClose = {() => setIsOpen(false)}><InputForm setIsOpen={()=> setIsOpen(false)}/></Model>}
    <div className = 'recipe'>
      <RecipeItems />
    </div>
   
    </>
  )
}
