# Smart-Waste-Sorter
AI-powered platform that detects and sorts waste for smarter, easier recycling

---

## Features

- Upload an image or enter the name of waste and get instant sorting suggestions
- Uses Clarifai and Google Gemini APIs for waste detection
- Modern React + Vite frontend
- Node.js/Express backend
- TypeScript throughout

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sirivennela04/Smart-Waste-Sorter.git
   cd Smart-Waste-Sorter/project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `project` folder:
   ```
   CLARIFAI_PAT=your_clarifai_pat
   GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
   ```

---

## Running Locally

### Frontend (Vite + React)

```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Backend (Node/Express)

1. Compile TypeScript:
   ```sh
   npx tsc
   ```
2. Run the server:
   ```sh
   node dist/server.js
   ```
The backend will run on [http://localhost:3001](http://localhost:3001) by default.

---

## Deployment

- **Frontend:** Deploy to [Vercel](https://vercel.com/) (set root directory to `project`, build command: `npm run build`, output: `dist`)
- **Backend:** Deploy to [Render](https://render.com/), [Railway](https://railway.app/), or similar.  
  Set environment variables in your deployment dashboard.

---

## Project Structure

```
project/
  ├── src/                # React frontend source
  ├── dist/               # Production build output
  ├── server.ts           # Express backend entry
  ├── .env                # Environment variables (not committed)
  ├── package.json
  ├── tsconfig*.json
  └── ...
```

---


## Credits

- [Clarifai](https://www.clarifai.com/)
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
