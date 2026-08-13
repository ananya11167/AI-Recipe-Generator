const express = require("express");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {

    try {

        const {
            ingredients,
            mealType,
            diet,
            cookingTime
        } = req.body;

        if (
            !ingredients ||
            !mealType ||
            !diet ||
            !cookingTime
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        const prompt = `
You are a professional chef and recipe creator.

Create a practical recipe using the ingredients provided.

Available Ingredients:
${ingredients}

Meal Type:
${mealType}

Diet Preference:
${diet}

Maximum Cooking Time:
${cookingTime}

Return the recipe using this structure:

RECIPE TITLE

Short description

INGREDIENTS
- ingredient with quantity

COOKING TIME
Give an estimated cooking time.

SERVINGS
Give the number of servings.

INSTRUCTIONS
1. Step one
2. Step two
3. Step three
Continue until the recipe is complete.

CHEF'S TIPS
- Give 2 or 3 useful cooking tips.

Important:
- Prioritize the available ingredients.
- Do not require unnecessary specialty ingredients.
- Keep the recipe realistic and easy to follow.
- Respect the diet preference.
- Keep the recipe within the requested cooking time when possible.
- Return only the recipe.
`;

        const completion = await groq.chat.completions.create({

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            model: "llama-3.1-8b-instant",
            temperature: 0.7

        });

        res.json({

            success: true,

            recipe: completion.choices[0].message.content

        });

    } catch (error) {

        console.error("Groq Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to generate recipe."

        });

    }

});

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html");

});

app.listen(PORT, () => {

    console.log(
        `🍳 AI Recipe Generator running on http://localhost:${PORT}`
    );

});