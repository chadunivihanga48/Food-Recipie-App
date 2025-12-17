import React from 'react'
import { useLoaderData } from 'react-router-dom'
import food1 from '../assets/food1.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

export default function RecipeItems() {
  const allRecipes = useLoaderData()
  console.log(allRecipes)
  return (
    <>
    <div className = 'card-container'>
      {
        allRecipes?.map((item, index) => {
          return(
            <div key = {index} classname = 'card'>
              <img src = {`http://localhost:5000/images/${item.coverImage}`} width= "120px" height= "100px"></img>
              <div className= 'card-body'>
                <div className = 'title'>
                  {item.title}
                  <div className = 'icons'>
                    <div className = 'timer'><BsStopwatchFill /></div>
                    <FaHeart />
                  </div>
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
