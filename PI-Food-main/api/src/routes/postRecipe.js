const { Router } = require("express");
const postRecipeRoute = Router();
const { Recipe, TypeDiet } = require("../db");


postRecipeRoute.post("/", async(req,res) => {
    let{ title, summary, healthscore, steps,diets, image} = req.body
    try {
        if(!title||!steps||!diets||!summary) throw Error ('Missing Data')
        let recipeCreated = await Recipe.create({
            title,
            summary,
            healthscore,
            image, 
            steps,
            
        });
        
        for(let i = 0; i < diets.length; i++){
            const typediet = await TypeDiet.findOne({
                where: {name: diets[i]}
            });
            await recipeCreated.addTypeDiet(typediet)
        }
        res.status(200).send(recipeCreated)
    } catch (error) {
        res.status(404).send({ error: error.message })
    }}) 



module.exports=postRecipeRoute