const resumeFile = document.getElementById("resumeFile");
const uploadArea = document.getElementById("uploadArea");
const fileName = document.getElementById("fileName");

const jobDescription = document.getElementById("jobDescription");
const characterCount = document.getElementById("characterCount");

const analyzeButton = document.getElementById("analyzeButton");
const analyzeMessage = document.getElementById("analyzeMessage");

const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");

const atsScore = document.getElementById("atsScore");
const atsStatus = document.getElementById("atsStatus");

const keywordProgress = document.getElementById("keywordProgress");
const keywordPercentage = document.getElementById("keywordPercentage");

const matchedKeywords = document.getElementById("matchedKeywords");
const missingKeywords = document.getElementById("missingKeywords");

const suggestionsList = document.getElementById("suggestionsList");


// =========================
// File Selection
// =========================

resumeFile.addEventListener("change", function () {

    if (resumeFile.files.length === 0) {
        fileName.textContent = "";
        return;
    }

    const file = resumeFile.files[0];

    if (file.type !== "application/pdf") {
        fileName.textContent = "Please select a PDF file.";
        resumeFile.value = "";
        return;
    }

    fileName.textContent = `Selected: ${file.name}`;
});


// =========================
// Drag & Drop
// =========================

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.classList.add("drag-over");
});


uploadArea.addEventListener("dragleave", function () {

    uploadArea.classList.remove("drag-over");
});


uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadArea.classList.remove("drag-over");

    const files = event.dataTransfer.files;

    if (files.length === 0) {
        return;
    }

    const file = files[0];

    if (file.type !== "application/pdf") {
        fileName.textContent = "Please upload a PDF file.";
        return;
    }

    resumeFile.files = files;

    fileName.textContent = `Selected: ${file.name}`;
});


// =========================
// Job Description Counter
// =========================

jobDescription.addEventListener("input", function () {

    characterCount.textContent =
        jobDescription.value.length;
});


// =========================
// Analyze Resume
// =========================

analyzeButton.addEventListener("click", async function () {

    analyzeMessage.textContent = "";

    const file = resumeFile.files[0];
    const jd = jobDescription.value.trim();


    // Validate PDF
    if (!file) {

        analyzeMessage.textContent =
            "Please upload your resume PDF.";

        return;
    }


    // Validate Job Description
    if (!jd) {

        analyzeMessage.textContent =
            "Please enter the job description.";

        return;
    }


    // Validate file type
    if (file.type !== "application/pdf") {

        analyzeMessage.textContent =
            "Only PDF files are supported.";

        return;
    }


    // Create form data
    const formData = new FormData();

    formData.append("resume", file);
    formData.append("job_description", jd);


    // Show loading
    loadingSection.classList.remove("hidden");
    resultsSection.classList.add("hidden");

    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analyzing...";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/ats/analyze-upload",
            {
                method: "POST",
                body: formData
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Analysis failed."
            );
        }


        displayResults(data);


    } catch (error) {

        analyzeMessage.textContent =
            error.message ||
            "Something went wrong while analyzing the resume.";

    } finally {

        loadingSection.classList.add("hidden");

        analyzeButton.disabled = false;

        analyzeButton.textContent =
            "Analyze Resume";
    }

});


// =========================
// Display Results
// =========================

function displayResults(data) {

    // ATS Score
    atsScore.textContent =
        Math.round(data.ats_score);


    // Status
    atsStatus.textContent =
        data.status;


    // Keyword Match
    const percentage =
        data.keyword_match_percentage || 0;

    keywordPercentage.textContent =
        percentage;

    keywordProgress.style.width =
        `${percentage}%`;


    // Matched Keywords
    matchedKeywords.innerHTML = "";

    if (
        data.matched_keywords &&
        data.matched_keywords.length > 0
    ) {

        data.matched_keywords.forEach(function (keyword) {

            const span = document.createElement("span");

            span.className = "keyword matched";

            span.textContent = keyword;

            matchedKeywords.appendChild(span);

        });

    } else {

        matchedKeywords.textContent =
            "No matching keywords found.";

    }


    // Missing Keywords
    missingKeywords.innerHTML = "";

    if (
        data.missing_keywords &&
        data.missing_keywords.length > 0
    ) {

        data.missing_keywords.forEach(function (keyword) {

            const span = document.createElement("span");

            span.className = "keyword missing";

            span.textContent = keyword;

            missingKeywords.appendChild(span);

        });

    } else {

        missingKeywords.textContent =
            "No missing keywords.";

    }


    // Suggestions
    suggestionsList.innerHTML = "";

    if (
        data.suggestions &&
        data.suggestions.length > 0
    ) {

        data.suggestions.forEach(function (suggestion) {

            const li = document.createElement("li");

            li.textContent = suggestion;

            suggestionsList.appendChild(li);

        });

    }


    // Show results
    resultsSection.classList.remove("hidden");


    // Scroll to results
    resultsSection.scrollIntoView({
        behavior: "smooth"
    });
}

