async function generate() {
  const text = document.getElementById("request").value;
  const output = document.getElementById("output");

  output.innerHTML = "Generating...";

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({
      prompt: `
Create a printable educational resource.

User request:
${text}

Return clean content only.
`
    })
  });

  const data = await res.json();
  output.innerHTML = `<pre>${data.result}</pre>`;
}
