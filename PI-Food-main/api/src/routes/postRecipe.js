const { Router } = require("express");
const postRecipeRoute = Router();
const { Recipe, TypeDiet } = require("../db");


postRecipeRoute.post("/", async(req,res) => {
    let{ title, summary, healthscore, steps,diets, image} = req.body
    try {
        let recipeCreated = await Recipe.create({
            title,
            summary,
            healthscore,
            image, 
            steps,
            
        });
        
        const typediet = await TypeDiet.findAll({
            where: {name: diets}
        });
        await recipeCreated.addTypeDiet(typediet)
        res.status(200).send(recipeCreated)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }}) 



module.exports=postRecipeRoute