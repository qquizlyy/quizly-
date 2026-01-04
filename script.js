async function generate() {
  const text = document.getElementById("request").value;
  const output = document.getElementById("output");

  // Basic validation
  if (!text.trim()) {
    output.innerHTML = "❌ Please type what you want first.";
    return;
  }

  // Show loading
  output.innerHTML = "⏳ Generating...";

  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: text
      })
    });

    // If Netlify function failed
    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    const data = await res.json();

    // If backend returned an error
    if (data.error) {
      output.innerHTML = "❌ BACKEND ERROR: " + data.error;
      return;
    }

    // Show result
    output.innerHTML = `<pre>${data.result || JSON.stringify(data, null, 2)}</pre>`;

  } catch (err) {
    output.innerHTML = "❌ FRONTEND ERROR: " + err.message;
  }
}
