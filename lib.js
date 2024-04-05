/* Library file for all crud functions */
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcXB0eGp0Znhicm94aWl5ZmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMTc0MDgsImV4cCI6MjAyNzc5MzQwOH0.BRu8RWPzHSttiJxwKxzRrDjWF3pzLDc-XxQJEOAgJs4";
const url = "https://zoqptxjtfxbroxiiyfcu.supabase.co/rest/v1/recipes";

/* Get all recipes */
export async function getRecipes() {
    let headersList = {
        "Accept": "application/json",
        "apikey": apikey,
        "Content-Type": "application/json"
       }
       
       let response = await fetch(url, { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.text();
       return data;
       
}

/* Add a new recipe */
export async function addRecipe(recipe) {

    let headersList = {
        "Accept": "application/json",
        "apikey": apikey,
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify(recipe);
       
       let response = await fetch(url, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       //return data;
}

/* Delete a recipe forever */
export async function deleteRecipe(id) {
    let headersList = {
        "Accept": "application/json",
        "apikey": apikey
       }
       
       let response = await fetch(url + "?id=eq." + id, { 
         method: "DELETE",
         headers: headersList
       });
       
       let data = await response.text();
       //return data;
}

/* update an existing recipe */
export async function updateRecipe(id, recipe) {
    let headersList = {
        "Accept": "application/json",
        "apikey": apikey,
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify(recipe);
       
       let response = await fetch(url + "?id=eq." + id, { 
         method: "PATCH",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       return data;
}