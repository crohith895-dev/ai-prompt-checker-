
// Get HTML elements
const promptInput = document.getElementById("promptInput");
const checkBtn = document.getElementById("checkBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const scoreDisplay = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const ratingDisplay = document.getElementById("rating");
const componentList = document.getElementById("componentList");
const suggestionsList = document.getElementById("suggestions");
const errorMessage = document.getElementById("errorMessage");

// Five components and their keywords
const components = [
    {
        name: "Role",
        keywords: ["role", "act as", "you are", "expert"],
        suggestion: "Add a role. Example: Act as a professional web developer."
    },
    {
        name: "Task",
        keywords: ["task", "create", "write", "explain", "develop", "build"],
        suggestion: "Clearly explain the task you want the AI to perform."
    },
    {
        name: "Context",
        keywords: ["context", "background", "designed for", "purpose", "student"],
        suggestion: "Provide background information or explain the purpose."
    },
    {
        name: "Constraints",
        keywords: ["constraints", "must", "should", "only", "limit", "avoid"],
        suggestion: "Add rules or limitations the AI should follow."
    },
    {
        name: "Output Format",
        keywords: ["output format", "format", "table", "bullet points", "json", "html"],
        suggestion: "Specify how you want the answer formatted."
    }
];

// Check Prompt button
checkBtn.addEventListener("click", checkPrompt);

function checkPrompt() {

    const prompt = promptInput.value.trim();

    // Check empty input
    if (prompt === "") {
        errorMessage.textContent = "Please enter a prompt before checking!";
        resetResults();
        return;
    }

    errorMessage.textContent = "";

    // Case-insensitive keyword detection
    const lowerPrompt = prompt.toLowerCase();

    let score = 0;

    componentList.innerHTML = "";
    suggestionsList.innerHTML = "";

    components.forEach(component => {

        const found = component.keywords.some(keyword =>
            lowerPrompt.includes(keyword.toLowerCase())
        );

        const li = document.createElement("li");

        if (found) {
            score += 20;
            li.className = "detected";
            li.textContent = "✔ " + component.name + " - Detected";
        } else {
            li.className = "missing";
            li.textContent = "✘ " + component.name + " - Missing";

            const suggestion = document.createElement("li");
            suggestion.textContent = component.suggestion;
            suggestionsList.appendChild(suggestion);
        }

        componentList.appendChild(li);
    });

    // Display total score
    scoreDisplay.textContent = score;

    // Animate progress bar
    progressBar.style.width = score + "%";

    // Display rating
    if (score === 100) {
        ratingDisplay.textContent = "Your Rating: Excellent!";
    } else if (score === 80) {
        ratingDisplay.textContent = "Your Rating: Very Good!";
    } else if (score === 60) {
        ratingDisplay.textContent = "Your Rating: Good!";
    } else if (score === 40) {
        ratingDisplay.textContent = "Your Rating: Average!";
    } else {
        ratingDisplay.textContent = "Your Rating: Needs Improvement!";
    }

    // Show message when everything is detected
    if (score === 100) {
        const message = document.createElement("li");
        message.textContent = "Great job! Your prompt contains all five components.";
        suggestionsList.appendChild(message);
    }
}

// Load Sample Prompt button
sampleBtn.addEventListener("click", function () {

    promptInput.value =
        "Act as a professional web developer. " +
        "Task: Create a modern portfolio website. " +
        "Context: This website is designed for college students. " +
        "Constraints: Use only HTML, CSS and JavaScript. " +
        "Output Format: Provide the complete code in separate files.";

    errorMessage.textContent = "";
});

// Clear button
clearBtn.addEventListener("click", function () {

    promptInput.value = "";
    errorMessage.textContent = "";
    resetResults();
});

// Reset results
function resetResults() {

    scoreDisplay.textContent = "0";
    progressBar.style.width = "0%";
    ratingDisplay.textContent = "Your Rating: Not checked";

    componentList.innerHTML = "<li>Results will appear here.</li>";
    suggestionsList.innerHTML =
        "<li>Check your prompt to get suggestions.</li>";
}

