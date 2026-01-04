export default async (req) => {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      process.env.GEMINI_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();

  return new Response(
    JSON.stringify({
      result: data.candidates?.[0]?.content?.parts?.[0]?.text || "Error"
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
