import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation.jsx'
import axios from 'axios'
import { AddFoodRecipe } from './pages/AddFoodRecipe'
import { EditRecipie } from './pages/EditRecipie'
import { RecipeDetails } from './pages/RecipeDetails'

const getAllRecipes = async() => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipie').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

const getMyRecipies = async()=>{
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipes = () =>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipe = async({params})=>{
  let recipe;
  await axios.get(`http://localhost:5000/recipe/${params.id}`)
  .then(res=>recipe=res.data)

  await axios.get(`hhtp://localhost:5000/user/${recipe.createdBy}`)
  .then(res=>{
    recipe= {...recipe, email:res.data.email}
  })
  return recipe
}

const router = createBrowserRouter([
  {path: "/", element:<MainNavigation />, children:[
     {path: "/", element:<Home />, loader: getAllRecipes},
     {path:"/myRecipe", element:<Home />, loader: getMyRecipies },
     {path: "/favRecipe", element:<Home />, loader: getFavRecipes},
     {path: "/addRecipe", element:<AddFoodRecipe />},
     {path: "/editRecipie/:id", element:<EditRecipie />},
     {path: "/recipe/:id", element:<RecipeDetails/>, loader: getRecipe}
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    </>
  
  )
  
}
