# AI-Based Presentation Content Generator

**Master of Computer Applications (MCA) – Generative AI Practical Examination**  
**Question 1:** *"Develop an AI-Based Presentation Content Generator that creates structured presentation content from a given topic."*

---

## 📌 Project Overview

The **AI Presentation Content Generator** is a full-stack web application designed to automatically create structured, high-quality technical presentations from any given computer applications or emerging technology topic. 

It synthesizes:
1. **Presentation Title & Executive Introduction**
2. **Pedagogical Learning Objectives**
3. **Structured Content Slides (≥ 6 slides)** with technical headings, clean bullet points, and slide numbering
4. **Comprehensive Presenter Speaker Notes** for every slide
5. **Real, Downloadable PowerPoint (`.pptx`) Files** formatted in 16:9 widescreen with executive design hierarchy and embedded speaker notes
6. **Automated Quality & Review Inspector** validating factual accuracy, logical sequencing (from architectural foundations to future trends), and bullet readability without overcrowding.

---

## 🎯 Practical Exam Tasks Coverage

| Examination Task | Implementation in Application |
|---|---|
| **a) Accept a topic** | Input field with MCA presets (*AI in Modern Web Development*, *Machine Learning*, *Cloud Computing*, *Cyber Security*, *Blockchain*, *Generative AI*), domain selector, and slide count slider (6–12 slides). |
| **b) Generate presentation outline** | AI generates a structured outline with presentation title, executive summary, 3–4 learning objectives, and at least 6 content slides. |
| **c) Generate headings, bullets & speaker notes** | Every slide contains a clear technical title, 4–6 concise bullet points, and 2–4 sentences of conversational speaker notes. |
| **d) Create & download PPTX presentation** | Uses `pptxgenjs` to generate native 16:9 widescreen `.pptx` presentations with custom color themes, master styling, and native speaker notes accessible in Microsoft PowerPoint. |
| **e) Review for accuracy, sequence & readability** | Dedicated **Quality & Review Inspector** analyzing pedagogical sequence flow (1 to 7), bullet readability metrics, duration estimation, and live in-browser slide editing. |

---

## 🛠️ Technology Stack

- **Frontend:**
  - React.js (Vite 5)
  - Tailwind CSS 3.4
  - Lucide React (Modern iconography)
- **Backend / API:**
  - Node.js (v18+)
  - Express.js
  - CORS, Dotenv
- **AI Orchestration:**
  - Google Gemini API (`@google/generative-ai` SDK) via secure backend
  - Intelligent Academic Fallback Engine (guarantees seamless viva demonstration even without internet or API keys)
- **Presentation Engine:**
  - `pptxgenjs` (Native Office OpenXML PowerPoint generation)

---

## 🔒 Security Architecture

- **Zero Client Exposure:** The AI API key is strictly maintained on the Node.js backend inside `server/.env`.
- **Frontend Isolation:** The React frontend makes REST API calls (`/api/presentation/generate`, `/api/presentation/export`) through a reverse proxy. No credentials or secret keys are bundled into client assets.
- **Repository Safety:** `.env` is included in `.gitignore`, and a clean `.env.example` is provided.

---

## 📂 Project Structure

```text
ai-presentation-generator/
│
├── client/                               # Frontend React Application
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                # Header with status indicator & task modal
│   │   │   ├── TopicForm.jsx             # Topic input, presets, and slide counter
│   │   │   ├── LoadingState.jsx          # Animated multi-step generation visualizer
│   │   │   ├── SlideViewer.jsx           # 16:9 interactive slide canvas & notes drawer
│   │   │   ├── SlideOutline.jsx          # Outline, learning objectives & thumbnails
│   │   │   ├── ReviewPanel.jsx           # Task (e) Quality & Review inspector
│   │   │   ├── EditSlideModal.jsx        # Live slide editing modal
│   │   │   └── ExamGuideModal.jsx        # MCA exam tasks verification modal
│   │   ├── pages/
│   │   │   └── PresentationDashboard.jsx # Main presentation dashboard
│   │   ├── services/
│   │   │   └── apiService.js             # Client API integration
│   │   ├── App.jsx                       # Root React component
│   │   ├── index.css                     # Tailwind CSS & custom styling
│   │   └── main.jsx                      # Vite entry point
│   ├── index.html                        # HTML entry
│   ├── package.json                      # Client dependencies
│   ├── tailwind.config.js                # Tailwind configuration
│   ├── postcss.config.js                 # PostCSS configuration
│   └── vite.config.js                    # Vite configuration with API proxy
│
├── server/                               # Backend Node.js & Express API
│   ├── routes/
│   │   └── presentationRoutes.js         # API endpoints (/generate, /export, /defaults)
│   ├── services/
│   │   ├── aiService.js                  # Gemini API integration & academic fallback
│   │   └── pptxService.js                # PowerPoint (.pptx) creation & styling
│   ├── utils/
│   │   ├── constants.js                  # Default topics, categories, and limits
│   │   └── validator.js                  # Input validation & JSON schema verification
│   ├── .env                              # Server environment variables (git-ignored)
│   ├── .env.example                      # Template environment variables
│   ├── package.json                      # Server dependencies
│   └── server.js                         # Express server entry point
│
├── .env.example                          # Root environment template
├── .gitignore                            # Git ignore rules
├── package.json                          # Root orchestration scripts
└── README.md                             # Comprehensive project documentation
```

---

## 🚀 Installation & Setup Instructions

### 1. Prerequisites
- **Node.js** v18 or later installed (`node -v`)
- **npm** v9 or later (`npm -v`)

### 2. Quick One-Command Setup
From the project root directory:

```bash
npm run install:all
```

*Or install individually:*
```bash
# Install root orchestration tools
npm install

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

## 🔑 Environment Variable Setup

1. In the `server/` directory, locate the `.env` file (or copy `.env.example` to `.env`):
   ```bash
   cp server/.env.example server/.env
   ```

2. Open `server/.env` and configure your API key:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

> **Note on Examination Reliability:**  
> If no Gemini API key is configured or if lab internet access is limited, the application automatically uses its **MCA Academic Engine** which generates complete verified presentations for the default topic (`Artificial Intelligence in Modern Web Development`) and any custom topic. Your viva demonstration will never fail due to network or quota errors!

---

## 💻 Running the Application

### Option A: Run Both Frontend & Backend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
# or: npm start
```
- Starts both Backend (`http://localhost:5000`) and Frontend (`http://localhost:3000`) together!
- Backend runs with automatic reload (`--watch`).

---

### Option B: Run Services Separately in Two Terminals

**Terminal 1 (Backend Server):**
```bash
cd server
npm start
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 🧪 Testing Procedure & Step-by-Step Demonstration

Follow these steps to demonstrate the application to your examiner:

1. **Open Dashboard (`http://localhost:3000`):**
   - Notice the header showing the project title, MCA Lab badge, and active AI engine indicator.
   - Click the **"Exam Tasks (a–e)"** button in the header to display the requirement breakdown.

2. **Select Topic (Task a):**
   - The default topic is prefilled: `"Artificial Intelligence in Modern Web Development"`.
   - You can also click any of the popular topic badges (e.g., *Machine Learning*, *Cloud Computing*, *Cyber Security*, *Blockchain*, *Generative AI*).
   - Adjust the slide count slider (e.g., 7 slides).

3. **Generate Presentation (Tasks b & c):**
   - Click **"Generate Presentation"**.
   - An animated progress visualizer displays each stage: analyzing domain, structuring learning objectives, formulating slide headings/bullet points, and writing speaker notes.
   - Within seconds, the interactive slide workspace appears.

4. **Navigate Slides & Inspect Speaker Notes (Task c):**
   - Review the presentation title and 4 structured learning objectives.
   - Use the **Next** and **Previous** buttons (or click slide thumbnails in the left outline) to inspect each slide.
   - Note the **Presenter Speaker Notes** amber box under the slide displaying the oral presentation script.
   - Click **"Copy Notes"** to test clipboard integration.

5. **Live Slide Editing (Review Flexibility):**
   - Click **"Edit Slide"** on any slide.
   - Modify the title or add an extra bullet point.
   - Click **"Save Changes"** — the slide updates immediately in state and will reflect in the downloaded PPTX!

6. **Quality & Review Inspector (Task e):**
   - Click the **"Review & Quality (Task e)"** tab.
   - Show the examiner the **Logical Sequence Analysis**:
     - *Slide 1:* Foundations & Definition
     - *Slide 2:* Core Applications
     - *Slide 3:* Generative AI Mechanisms
     - *Slide 4:* AI Development Tools & Frameworks
     - *Slide 5:* Key Benefits & Business Impact
     - *Slide 6:* Critical Challenges & Security
     - *Slide 7:* Future Trends & W3C Roadmap
   - Highlight the **Readability Metrics** (average 4–6 bullets per slide, words per bullet, 100% speaker notes coverage, estimated delivery time).

7. **Download PowerPoint Presentation (Task d):**
   - Click **"Download PPTX File"**.
   - The browser automatically downloads:
     `AI_Presentation_Artificial_Intelligence_in_Modern_Web_Development.pptx`.
   - Open the file in Microsoft PowerPoint, LibreOffice Impress, or Google Slides.
   - Verify:
     - Slide 1: High-contrast title slide with academic metadata.
     - Slide 2: Objectives & scope slide.
     - Slides 3–9: Content slides with bullet points and slide numbering.
     - Click **View > Notes** in PowerPoint: each slide has full speaker notes embedded!

---

## ❓ Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| Port 5000 is already in use | Another service is using port 5000 | Change `PORT=5001` in `server/.env` and update `target` in `client/vite.config.js`. |
| "Failed to fetch defaults / generate presentation" | Backend server is not running | Ensure `npm run server` is running and accessible at `http://localhost:5000`. |
| Gemini API quota exceeded or 403 error | Invalid key or quota limit | The application automatically switches to the offline academic fallback engine with zero downtime. |
| PPTX download does not trigger | Browser popup blocker | Check your browser's download permission bar and allow downloads from localhost. |

---

## 🎓 Academic Viva Questions & Answers

**Q1: How does the application ensure the AI returns valid slide structure?**  
*Answer:* We formulate an explicit JSON schema prompt and sanitize LLM output by stripping markdown fences (` ```json `), extracting valid JSON substrings, and running standard validator functions before delivering data to the client.

**Q2: How are speaker notes stored in the PowerPoint file?**  
*Answer:* We use `pptxgenjs`'s native `slide.addNotes(notesText)` API, which writes standard ECMA-376 PresentationML `<p:notes>` parts into the `.pptx` zip archive, visible in PowerPoint's presenter view.

**Q3: How is API security maintained?**  
*Answer:* The client never possesses the API key. All LLM calls pass through our Node.js/Express backend service (`/api/presentation/generate`), keeping credentials secure within server-side environment variables.

---

**Developed for DKTE MCA Generative AI Practical Examination (Q1).**
