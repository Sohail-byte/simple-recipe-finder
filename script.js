const inputField = document.querySelector(".input-field")
const searchBtn = document.querySelector(".search-btn")

let recipeArray = []
let html
let mealCaution

async function checkRecipe(inputField) {
    
recipeArray = []
    const response = await fetch(`https://api.edamam.com/search?q=${inputField}&app_id=244c3d6c&app_key=
8393ab2b06a55efd859e9366b9dcb41d&from=0&to=10`)

    let data = await response.json()

        


    for(let i = 0; i<data.hits.length; i++){
        recipeArray.push(data.hits[i])
    }



    
    

    
    recipeArray.forEach((recipe) =>{
        
        if(recipe.recipe.cautions === '') {
            mealCaution = 'None'
        } else {
            mealCaution = recipe.recipe.cautions
        }


        html += `<div class="recipe-cards">
        <h1 class="recipe-card-heading">${recipe.recipe.label}</h1>
        <p class="text">Calories: ${recipe.recipe.calories.toFixed(2)}</p>
        <p class="text">Cuisine Type: ${recipe.recipe.cuisineType}</p>
        <p class="text">Meal Type: ${recipe.recipe.mealType}</p>
        <p class="text">Dish Type: ${recipe.recipe.dishType}</p>
        <p class="text">Meal Cautions: ${mealCaution}</p>
        <p class="ingredients text">Ingredients: ${recipe.recipe.ingredientLines}</p>
                <img class="recipe-image" src="${recipe.recipe.image}">
                </div> `
       })

       
    //    setInterval(render(), 1000).
    console.log(recipeArray)
    render()
   
}






function render(){
    document.querySelector(".container").innerHTML = html
}


searchBtn.addEventListener('click', ()=>{
    
    html = ''
    checkRecipe(inputField.value)
    
})