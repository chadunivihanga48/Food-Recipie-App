import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation.jsx'
import axios from 'axios'
import cors from 'cors'

const getAllRecipes = async() => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipie').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

const router = createBrowserRouter([
  {path: "/", element:<MainNavigation />, children:[
     {path: "/", element:<Home />, loader: getAllRecipes},
     {path:"/myrRecipe", element:<Home /> },
     {path: "/favRecipe", element:<Home />},
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    </>
  
  )
  
}
