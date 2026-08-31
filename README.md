# 🍳 AI Recipe Generator

An elegant AI-powered recipe generator that transforms your ingredients into creative, personalized recipes in seconds.

Simply enter the ingredients you have, choose your preferences, and let AI create a delicious recipe for you. ✨

LIVE DEMO
https://ai-recipe-generator-nz69.onrender.com

## ✨ Features

- 🥕 Generate recipes from available ingredients
- 🤖 AI-powered recipe generation using the Groq API
- 🍽️ Personalized recipe suggestions
- ⚡ Fast AI responses
- 📱 Clean and responsive interface
- 🎨 Modern and minimal design
- 🔄 Generate new recipes whenever you want
- 📋 Easy-to-read recipe results

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Groq API

## 📂 Project Structure

AI-Recipe-Generator/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md

## 🚀 How It Works

1. Enter the ingredients you have.
2. Select your preferences.
3. Click the generate button.
4. The application sends the request to the backend.
5. The backend communicates with the Groq API.
6. AI generates a personalized recipe.
7. The recipe is displayed instantly on the screen.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ananya11167/AI-Recipe-Generator.git
```

### 2. Navigate into the project

```bash
cd AI-Recipe-Generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a file named `.env` in the project root.

Add your Groq API key:

```env
GROQ_API_KEY=_api_key_here
```

### 5. Start the server

```bash
node server.js
```

### 6. Open the application

Visit:

http://localhost:3000

## 🔐 Environment Variables

The application requires:

| Variable | Description |
|----------|-------------|
| GROQ_API_KEY | Your Groq API key |

Never commit your `.env` file or expose your API key publicly.

## 🌐 Deployment

This application can be deployed using platforms such as Render.

### Render Configuration

**Language:** Node

**Build Command:**

```bash
npm install
```

**Start Command:**

```bash
node server.js
```

Add this environment variable in Render:

```text
GROQ_API_KEY
```

## 🎯 Use Cases

- 🍅 Turn leftover ingredients into meal ideas
- 🥗 Discover new recipes
- 🍝 Get quick dinner inspiration
- 🧑‍🍳 Experiment with different ingredients
- ⏱️ Find something to cook without spending time searching

## 🔮 Future Improvements

- 🖼️ AI-generated food images
- ❤️ Save favorite recipes
- 📜 Recipe history
- 🛒 Automatic shopping lists
- 🌎 Cuisine-based recipe generation
- 🥦 Dietary preference filters
- 🌙 Dark mode
- 📱 Progressive Web App support

## 👩‍💻 Author

**Ananya**

Built with curiosity, creativity, and a little help from AI. ✨

## 📄 License

This project is open source and available for educational and personal use.
```

