import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation.jsx'
import axios from 'axios'
import cors from 'cors'
import { AddFoodRecipe } from './pages/AddFoodRecipe'
import { EditRecipie } from './pages/EditRecipie'

const getAllRecipes = async() => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipie').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

const getMyRecipies = async()=>{
  let user = JSON.parse(localStorage.getItem(user))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipes = () =>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router = createBrowserRouter([
  {path: "/", element:<MainNavigation />, children:[
     {path: "/", element:<Home />, loader: getAllRecipes},
     {path:"/myRecipe", element:<Home />, loader: getMyRecipies },
     {path: "/favRecipe", element:<Home />, loader: getFavRecipes},
     {path: "/addRecipe", element:<AddFoodRecipe />},
     {path: "/editRecipie/:id", element:<EditRecipie />},
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    </>
  
  )
  
}
