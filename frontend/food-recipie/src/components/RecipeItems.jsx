import React, { useEffect, useState }from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/food1.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState()
  let path = window.location.pathname==="/myRecipie" ? true: false
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  const navigate = useNavigate()
  console.log(allRecipes)

  useEffect(()=>{
    setAllRecipes(recipes)
  },[recipes])

  const onDelete = async(id)=>{
    await axios.delete(`http://localhost:5000/recipie/${id}`)
    .then((res) => console.log(res))
    setAllRecipes(recipes=>recipes.filter(recipe=>recipe._id !== id))
    let filterItem = favItems.filter(recipe=>recipe._id !== id)
    localStorage.setItem("fav", JSON.stringify(filterItem))
  }

  const favRecipe=(item)=>{
    let filterItem = favItems.filter(recipe=>recipe._id !== item._id)
    favItems = favItems.filter(recipe=>recipe._id === item._id).length === 0 ?[...favItems, item] : filterItem
    localStorage.setItem("fav", JSON.stringify(favItems))
    setIsFavRecipe(pre=>!pre)
  }
  return (
    <>
    <div className = 'card-container'>
      {
        allRecipes?.map((item, index) => {
          return(
            <div key = {index} classname = 'card' onDoublieClick= {()=> navigate(`/recipe/${item._id}`)}>
              <img src = {`http://localhost:5000/images/${item.coverImage}`} width= "120px" height= "100px"></img>
              <div className= 'card-body'>
                <div className = 'title'>
                  {item.title}
                  </div>
                  <div className = 'icons'>
                    <div className = 'timer'><BsStopwatchFill />{item.time}</div>
                    {(!path) ? <FaHeart onClick={()=>favRecipe(item)} style = {{color:(favItems.some(res=>res._id === item._id)) ? "red" : ""}}/>:
                    <div className = 'action'>
                       <Link to = {`/editRecipie/${item._id}`} className = "editIcon"><FaEdit /></Link>
                       <MdDelete onClick = {()=> onDelete(item._id)}className = 'deleteIcon'/>
                    </div>
        }
                  </div>
                
                </div>
            </div>
        )
        })
      }

    </div>
    </>
  )
}
