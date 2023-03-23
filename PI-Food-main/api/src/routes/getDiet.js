
const express = require('express')
const getDietRoute = express.Router()
const { TypeDiet } = require("../db");
const axios = require ("axios")
const { API_KEY } = process.env




const getDietFromApi = async()=>{
    
    const URL=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    const response = await axios.get(URL);
    const diets = new Set();

    response.data.results.forEach(recipe => {
    recipe.diets.forEach(diet => diets.add(diet));
    });
    return Array.from(diets)
}

getDietRoute.get('/', async (req, res) => {
    
    try {
        const diets = await TypeDiet.findAll();
        if (diets.length === 0) {
            const dietsFromAPI = await getDietFromApi()
            for (let i = 0; i < dietsFromAPI.length; i++) {
                await TypeDiet.create({ name: dietsFromAPI[i] })
          }
        
          const updatedDiets = await TypeDiet.findAll();
          return res.json(updatedDiets);
        }
        
        return res.json(diets);
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
        }
})

module.exports = getDietRoute