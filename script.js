import { getRecipes, addRecipe, deleteRecipe, updateRecipe } from "./lib.js";

/* Show all recipes */
async function showRecipes() {
    // remove all cards to update view
    document.querySelectorAll(".card").forEach((item) => {
        item.remove();
    })
    // reset form fields
    resetForm();

    let recipesList = await getRecipes();
    let recipes = JSON.parse(recipesList);
    console.log(recipes);

    recipes.forEach((item) => {
        const temp = document.querySelector("#recipe").content;
        const copy = temp.cloneNode(true);

        copy.querySelector("h3").innerHTML = item.name;
        copy.querySelector("#description").innerHTML = "Beskrivelse: " + item.description;
        copy.querySelector("#ingredients").innerHTML = "Ingredienser: " + item.ingredients;
        copy.querySelector("#allergenes").innerHTML = "Allergener: " + item.allergenes;
        copy.querySelector("#persons").innerHTML = "Personer: " + item.persons;
        let studentFriendly;
        if(item.student == true) {
            studentFriendly = "<span class='taglabel positive'>Studerende venlig</span>";
        }
        else {
            studentFriendly = "<span class='taglabel negative'>Ikke studerende venlig</span>";
        }
        copy.querySelector("#student").innerHTML = studentFriendly;
        //copy.querySelector("#delete_btn").dataset.id = item.id;
        copy.querySelector("#delete_btn").addEventListener("click", async function() {
            await deleteRecipe(item.id);
            showRecipes();
        });

        copy.querySelector("#edit_btn").addEventListener("click", async function() {
            // adjust form elements
            document.querySelector("form").dataset.action = "edit"
            document.querySelector("input[type='submit']").value = "Gem";
            document.querySelector("legend").innerHTML = "Rediger opskrift"
            // load data into form fields
            document.querySelector("#rid").value = item.id;
            document.querySelector("#rname").value = item.name;
            document.querySelector("#rdesc").value = item.description;
            document.querySelector("#ingredients").value = item.ingredients;
            document.querySelector("#allergens").value = item.allergenes;
            document.querySelector("#persons").value = item.persons;

            // i'm sure there a more...elegant solution to this
            document.querySelectorAll("input[type='radio']").forEach((radio) => {
                if(item.student == true) {
                    if(radio.value == "true") {
                        radio.checked = true;
                    }
                }
                if(item.student == false) {
                    if(radio.value == "false") {
                        radio.checked = true;
                    }
                }
            })
            document.querySelector("#cancel").classList.remove("hidden");
        })

        document.querySelector("#recipes-cards").appendChild(copy);
    });
}

function addIngredient() {
    let ing = document.querySelector("#new-ingredient").value;
    let ing_list = document.querySelector("#ingredients").value;
    if(ing != "") {
        document.querySelector("#ingredients").value = ing_list + ing + ",";
        document.querySelector("#new-ingredient").value = "";
    }
}

function addAllergen() {
    let allergen = document.querySelector("#new-allergen").value;
    let allergen_list = document.querySelector("#allergens").value;
    if(allergen != "") {
        document.querySelector("#allergens").value = allergen_list + allergen + ",";
        document.querySelector("#new-allergen").value = "";
    }
}

function resetForm() {
    // reset form elements
    document.querySelector("form").dataset.action = "create"
    document.querySelector("input[type='submit']").value = "Opret";
    document.querySelector("legend").innerHTML = "Ny opskrift"
    // load data into form fields
    document.querySelector("#rid").value = 0;
    document.querySelector("#rname").value = "";
    document.querySelector("#rdesc").value = "";
    document.querySelector("#ingredients").value = "";
    document.querySelector("#allergens").value = "";
    document.querySelector("#persons").value = 1;
    document.querySelectorAll("input[type='radio']").forEach(function(item) {
        item.checked = false;
    })
    document.querySelector("#cancel").classList.add("hidden");
}

document.querySelector("#add-ingredient").addEventListener("click", addIngredient);
document.querySelector("#add-allergen").addEventListener("click", addAllergen);
document.querySelector("#cancel").addEventListener("click", resetForm);

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if(form.dataset.action == "create") {
        await addRecipe({
            "name":formData.get("rname"),
            "description":formData.get("rdesc"),
            "ingredients":formData.get("ingredients"),
            "allergenes":formData.get("allergens"),
            "persons":formData.get("persons"),
            "student":formData.get("student"),
            "image":"food.png"
        })
        showRecipes();
    }
    else {
        await updateRecipe(formData.get("rid"), {
            "name":formData.get("rname"),
            "description":formData.get("rdesc"),
            "ingredients":formData.get("ingredients"),
            "allergenes":formData.get("allergens"),
            "persons":formData.get("persons"),
            "student":formData.get("student"),
            "image":"food.png"
        })
        showRecipes();
    }
})

showRecipes();