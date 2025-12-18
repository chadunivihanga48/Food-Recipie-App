import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation.jsx'
import axios from 'axios'
import AddFoodRecipe from "./pages/AddFoodRecpe.jsx"
import EditRecipie from "./pages/EditRecipe.jsx"
import RecipeDetails from "./pages/RecipeDetails"

const getAllRecipes = async () => {
  try {
    const res = await axios.get("http://localhost:5000/recipies");
    return res.data;
  } catch (error) {
    console.error("getAllRecipes error:", error.message);
    return []; // 👈 prevent crash
  }
};


const getMyRecipes = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];

    const allRecipes = await getAllRecipes();
    return allRecipes.filter(item => item.createdBy === user._id);
  } catch (error) {
    console.error("getMyRecipes error:", error.message);
    return [];
  }
};


const getFavRecipes = () =>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getRecipe = async ({ params }) => {
  try {
    const recipeRes = await axios.get(
      `http://localhost:5000/recipies/${params.id}`
    );

    let recipe = recipeRes.data;

    const userRes = await axios.get(
      `http://localhost:5000/users/${recipe.createdBy}`
    );

    return { ...recipe, email: userRes.data.email };
  } catch (error) {
    console.error("getRecipe error:", error.message);
    return null; // 👈 prevent crash
  }
};


const router = createBrowserRouter([
  {path: "/", element:<MainNavigation />, children:[
     {path: "/", element:<Home />, loader: getAllRecipes},
     {path:"/myRecipe", element:<Home />, loader: getMyRecipes },
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
