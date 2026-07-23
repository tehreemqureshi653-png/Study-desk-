index.html 
# StudyDesk

StudyDesk is an all in one productivity app for students and office workers who juggle tasks, notes, focus time, and quick writing help across too many separate apps. It brings task management, note taking, a focus timer, and an AI assistant together into one simple, mobile friendly place.

Who it's for: Students managing coursework and deadlines, and office workers who need a lightweight daily workspace without switching between five different tools.

Live app: https://resonant-mochi-e4d1c3.netlify.app/

GitHub repository: https://github.com/tehreemqureshi653-png/Study-desk-

---

 Features
Tasks: add, complete, and delete daily to-dos
Notes: save quick timestamped notes (lecture points, meeting notes, ideas)
Focus Timer: Pomodoro style timer with Focus (25 min), Break (5 min), and Break (15 min) modes, with start/pause/reset controls
AI Assistant: paste any text and choose how the AI should help:
Summarize: turns long text into 3–5 clear bullet points
To-do list: converts notes or a brain dump into a clean, actionable checklist
Draft email: turns rough notes/a topic into a polite, professional email with a subject line
Explain simply: rewrites complex text in plain, everyday language
 All data (tasks, notes, goals) is saved locally on the user's device, so it's private and persists between visits
Clean, calming, mobile first interface designed for quick daily use


 The AI Feature

The AI Assistant is the core smart feature of the app. The user picks a mode (Summarize / To-do list / Draft email / Explain simply), pastes in their text, and the app sends both to an AI model along with a system prompt that adapts based on the chosen mode.

System prompt used:


You are a helpful productivity assistant for students and office workers 
inside an app called StudyDesk. The user will choose a task mode and 
provide text. Task mode: "{aiMode}". Instruction for this mode: 
{modeInstructions[aiMode]} Keep your response focused, well formatted 
with line breaks where helpful, and no longer than necessary. Do not add 
unrelated commentary.


Per mode instructions injected into the prompt:

| Mode | Instruction |
|---|---|
| Summarize | Summarize the following text in 3-5 clear bullet points, capturing only the key ideas. |
| To-do list | Turn the following text into a clean, actionable to-do list. Each item should start with a verb and be a single, clear action. |
| Draft email | Turn the following notes or topic into a polite, professional, concise email draft. Include a suitable subject line at the top. |
| Explain simply | Explain the following text in very simple, plain language, as if to someone with no background in the topic. Use short sentences and everyday words. |

The AI model used is Llama 3.3 70B, served for free through the Groq API (OpenAI compatible endpoint).



 Tools, Services & Models Used

AI model: Llama 3.3 70B via [Groq](https://groq.com) (free tier, OpenAI-compatible chat completions API)
Frontend: Plain HTML, CSS, and JavaScript (no framework, single file)  built with the assistance of Claude (Anthropic)
Hosting/Deployment: [Netlify](https://netlify.com), deployed via GitHub integration
Version control: GitHub
Data storage: Browser `localStorage' no backend/database required; the user's Groq API key is also stored only in their own browser's local storage, never in the code or repository


Screenshots

Tasks tabadding and tracking daily to-dos:

Two tasks logged ("Learn essay", "Finish chapter 1") with checkboxes to mark them complete.

Focus tab  Pomodoro style focus timer running:

A 25-minute focus session counting down (24:55), with Pause and Reset controls.

AI Assistant tab: "Explain simply" mode in action:

User typed "Generative AI" and selected the Explain Simply mode. The AI responded with a clear, plain language explanation broken into short paragraphs and a bulleted list of examples (pictures, music, text).

(See the `screenshots' folder in this repository for the full images.)


 How to Run This Project

Option 1:Use the live version (recommended):
Just open the live link: https://resonant-mochi-e4d1c3.netlify.app/
On first load, you'll be asked for a free Groq API key (get one at [console.groq.com/keys](https://console.groq.com/keys)) to enable the AI Assistant feature. Tasks, Notes, and Focus Timer work immediately with no key needed.

Option 2 :Run it locally:
1. Clone this repository:
   
   git clone https://github.com/tehreemqureshi653-png/Study-desk-.git
   
2. Open the 'html' file in this repo directly in any web browser (double click it, or right-click → Open with → your browser).
3. When prompted, paste a free Groq API key from [console.groq.com/keys](https://console.groq.com/keys).
4. Start adding tasks, notes, and using the AI Assistant.

No installation, build step, or server is required  it's a single self contained HTML file.


 Notes on Design Choices

The AI feature uses client side API calls with a user supplied key stored in local storage ,rather than a hardcoded key. This keeps the app fully static (deployable via Netlify with zero backend) while ensuring no API key is ever committed to the public GitHub repository.
Groq was chosen over other providers for reliability on the free tier and fast response times, which matters for a tool meant to be used quickly between tasks.



 Future Improvements

Barcode/voice input for adding tasks faster
Shared/collaborative task lists for group projects or office teams
Export notes and AI responses to PDF or plain text
Optional cloud sync across devices (currently local storage only, per-device)
