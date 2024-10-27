document.getElementById("analyze-btn").addEventListener("click", async () => {
  const text = document.getElementById("text-input").value;
  const resultElement = document.getElementById("result");

  // Clear previous results
  resultElement.style.display = "none"; // Hide initially
  resultElement.textContent = ""; // Clear previous text

  if (text.trim() === "") {
    resultElement.className = "error"; // Apply error class for styling
    resultElement.textContent = "Please enter some text to analyze.";
    resultElement.style.display = "block"; // Show the error message
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Show result when data is received
    resultElement.style.display = "block"; // Make it visible
    resultElement.className = ""; // Reset any previous error class
    resultElement.textContent = `Source Score: ${data.source_score}, Alert: ${data.analysis_result.alert}, Final Score: ${data.final_score}`;
    
  } catch (error) {
    resultElement.className = "error"; // Apply error class for styling
    resultElement.textContent = "Error: Unable to reach the API.";
    console.error(error);
    resultElement.style.display = "block"; // Show the error message
  }
});
