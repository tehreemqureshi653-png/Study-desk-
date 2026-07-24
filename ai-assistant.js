// netlify/functions/ai-assistant.js
//
// This runs on Netlify's servers, not in the visitor's browser.
// Your Groq API key lives here (as an environment variable) so
// every visitor can use the AI feature without entering their own key.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { mode, text } = JSON.parse(event.body);

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Nothing to work with." }),
      };
    }

    const modeInstructions = {
      "Summarize": "Summarize the following text in 3-5 clear bullet points, capturing only the key ideas.",
      "To-do list": "Turn the following text into a clean, actionable to-do list. Each item should start with a verb and be a single, clear action.",
      "Draft email": "Turn the following notes or topic into a polite, professional, concise email draft. Include a suitable subject line at the top.",
      "Explain simply": "Explain the following text in very simple, plain language, as if to someone with no background in the topic. Use short sentences and everyday words."
    };

    const instruction = modeInstructions[mode] || modeInstructions["Summarize"];
    const systemPrompt = `You are a helpful productivity assistant for students and office workers inside an app called StudyDesk. The user will choose a task mode and provide text. Task mode: "${mode}". Instruction for this mode: ${instruction} Keep your response focused, well-formatted with line breaks where helpful, and no longer than necessary. Do not add unrelated commentary.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY, // <-- set this in Netlify, never in code
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.6,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data.error && data.error.message ? data.error.message : "AI request failed";
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: msg }),
      };
    }

    const reply = data.choices && data.choices[0] && data.choices[0].message.content
      ? data.choices[0].message.content
      : "No response text was returned.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error: " + err.message }),
    };
  }
};
