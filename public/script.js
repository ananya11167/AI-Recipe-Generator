const ingredients = document.getElementById("ingredients");
const mealType = document.getElementById("mealType");
const diet = document.getElementById("diet");
const cookingTime = document.getElementById("cookingTime");

const timeOptions = document.querySelectorAll(".time-option");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const againBtn = document.getElementById("againBtn");

const result = document.getElementById("result");
const recipeStatus = document.getElementById("recipeStatus");

let currentRecipe = "";

timeOptions.forEach(button => {

    button.addEventListener("click", () => {

        timeOptions.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        cookingTime.value = button.dataset.time;

    });

});


function formatRecipe(text) {

    const lines = text.split("\n");

    let html = "";

    lines.forEach(line => {

        const trimmed = line.trim();

        if (!trimmed) {
            html += "<br>";
            return;
        }

        const upper = trimmed.toUpperCase();

        if (
            upper === "INGREDIENTS" ||
            upper === "INSTRUCTIONS" ||
            upper === "CHEF'S TIPS" ||
            upper === "COOKING TIME" ||
            upper === "SERVINGS"
        ) {

            html += `
                <div class="recipe-section">
                    ${trimmed}
                </div>
            `;

        } else if (
            html === "" &&
            !trimmed.startsWith("-") &&
            !/^\d+\./.test(trimmed)
        ) {

            html += `
                <div class="recipe-title">
                    ${trimmed}
                </div>
            `;

        } else {

            html += `<div>${trimmed}</div>`;

        }

    });

    return html;
}


async function generateRecipe() {

    if (
        ingredients.value.trim() === "" ||
        mealType.value === "" ||
        diet.value === "" ||
        cookingTime.value === ""
    ) {

        alert("Please complete all recipe details.");

        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerHTML =
        'Cooking up ideas... <span>✦</span>';

    recipeStatus.textContent = "CREATING YOUR RECIPE";

    result.innerHTML = `
        <div class="empty-recipe">
            <div class="plate-icon">✦</div>
            <h2>Something delicious is coming.</h2>
            <p>
                AI is turning your ingredients into a recipe.
            </p>
        </div>
    `;

    copyBtn.style.display = "none";
    downloadBtn.style.display = "none";
    againBtn.style.display = "none";

    try {

        const response = await fetch("/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                ingredients: ingredients.value,
                mealType: mealType.value,
                diet: diet.value,
                cookingTime: cookingTime.value

            })

        });

        const data = await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message || "Failed to generate recipe."
            );

        }

        currentRecipe = data.recipe;

        result.innerHTML = `
            <div class="recipe-content">
                ${formatRecipe(data.recipe)}
            </div>
        `;

        recipeStatus.textContent = "RECIPE READY";

        copyBtn.style.display = "block";
        downloadBtn.style.display = "block";
        againBtn.style.display = "block";

    } catch (error) {

        console.error(error);

        recipeStatus.textContent = "ERROR";

        result.innerHTML = `
            <div class="empty-recipe">
                <div class="plate-icon">!</div>
                <h2>Something went wrong.</h2>
                <p>
                    We couldn't create your recipe. Please try again.
                </p>
            </div>
        `;

        alert(error.message);

    } finally {

        generateBtn.disabled = false;

        generateBtn.innerHTML =
            'Create My Recipe <span>→</span>';

    }

}


generateBtn.addEventListener("click", generateRecipe);

againBtn.addEventListener("click", generateRecipe);


copyBtn.addEventListener("click", async () => {

    if (!currentRecipe) {
        return;
    }

    try {

        await navigator.clipboard.writeText(currentRecipe);

        copyBtn.textContent = "Copied ✓";

        setTimeout(() => {
            copyBtn.textContent = "Copy Recipe";
        }, 1800);

    } catch (error) {

        alert("Unable to copy the recipe.");

    }

});


downloadBtn.addEventListener("click", () => {

    if (!currentRecipe) {
        return;
    }

    const element = document.querySelector(".recipe-content");

    const options = {

        margin: 12,

        filename: "AI_Recipe.pdf",

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    };

    html2pdf()
        .set(options)
        .from(element)
        .save();

});