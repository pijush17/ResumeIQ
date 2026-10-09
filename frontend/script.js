/* =====================================================
   RESUME TEMPLATES
===================================================== */

function changeTemplate(template, button) {

    const resume =
        document.getElementById("resumePreview");


    /* Remove previous template */

    resume.classList.remove(
        "template-modern",
        "template-classic",
        "template-minimal"
    );


    /* Add selected template */

    resume.classList.add(
        "template-" + template
    );


    /* Update active button */

    const buttons =
        document.querySelectorAll(".template-btn");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");

}
/* =====================================================
   RESUMEIQ - PHASE 1
   Main JavaScript
===================================================== */


/* =====================================================
   HELPER FUNCTION
===================================================== */

function getValue(id) {

    const element = document.getElementById(id);

    return element.value;

}


/* =====================================================
   PERSONAL INFORMATION
===================================================== */

document.getElementById("name").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewName").textContent =
        value || "Your Name";

});


document.getElementById("title").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewTitle").textContent =
        value || "Professional Title";

});


document.getElementById("email").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewEmail").textContent =
        value || "email@example.com";

});


document.getElementById("phone").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewPhone").textContent =
        value || "+91 XXXXX XXXXX";

});


document.getElementById("location").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewLocation").textContent =
        value || "Location";

});


document.getElementById("linkedin").addEventListener("input", function () {

    const value = this.value.trim();

    const preview =
        document.getElementById("previewLinkedin");

    preview.textContent = value ? "LinkedIn" : "LinkedIn";

    if (value) {

        preview.href =
            value.startsWith("http")
                ? value
                : "https://" + value;

    } else {

        preview.removeAttribute("href");

    }

});


document.getElementById("github").addEventListener("input", function () {

    const value = this.value.trim();

    const preview =
        document.getElementById("previewGithub");

    preview.textContent = value ? "GitHub" : "GitHub";

    if (value) {

        preview.href =
            value.startsWith("http")
                ? value
                : "https://" + value;

    } else {

        preview.removeAttribute("href");

    }

});


/* =====================================================
   PROFESSIONAL SUMMARY
===================================================== */

document.getElementById("summary").addEventListener("input", function () {

    const value = this.value.trim();

    document.getElementById("previewSummary").textContent =
        value || "Your professional summary will appear here.";

});


/* =====================================================
   SKILLS
===================================================== */

document.getElementById("skills").addEventListener("input", function () {

    updateSkills();

});


function updateSkills() {

    const input = document.getElementById("skills").value;

    const container =
        document.getElementById("previewSkills");

    container.innerHTML = "";

    const skills = input
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");


    if (skills.length === 0) {

        container.innerHTML =
            `<span class="skill-tag">Your skills</span>`;

        return;

    }


    skills.forEach(skill => {

        const span = document.createElement("span");

        span.className = "skill-tag";

        span.textContent = skill;

        container.appendChild(span);

    });

}


/* =====================================================
   EDUCATION
===================================================== */

function updateEducation() {

    const items =
        document.querySelectorAll(".education-item");

    const preview =
        document.getElementById("previewEducation");

    preview.innerHTML = "";


    let hasData = false;


    items.forEach(item => {

        const college =
            item.querySelector(".education-college").value.trim();

        const degree =
            item.querySelector(".education-degree").value.trim();

        const cgpa =
            item.querySelector(".education-cgpa").value.trim();

        const start =
            item.querySelector(".education-start").value.trim();

        const end =
            item.querySelector(".education-end").value.trim();


        if (
            college ||
            degree ||
            cgpa ||
            start ||
            end
        ) {

            hasData = true;


            const div =
                document.createElement("div");

            div.className =
                "education-preview";


            div.innerHTML = `

                <h3>${college || "College / University"}</h3>

                <p>
                    ${degree || "Degree"}
                    ${cgpa ? " | CGPA: " + cgpa : ""}
                </p>

                <p>
                    ${start || ""}
                    ${start || end ? " - " : ""}
                    ${end || ""}
                </p>

                

            `;


            preview.appendChild(div);

        }

    });


    if (!hasData) {

        preview.innerHTML =
            `<p class="empty-text">
                Education details will appear here.
            </p>`;

    }

}


/* =====================================================
   ADD EDUCATION
===================================================== */

function addEducation() {

    const container =
        document.getElementById("educationContainer");


    const div =
        document.createElement("div");


    div.className =
        "dynamic-item education-item";


    div.innerHTML = `

        <div class="input-group">

            <label>College / University</label>

            <input
                type="text"
                class="education-college"
                placeholder="College name"
            >

        </div>


        <div class="input-row">

            <div class="input-group">

                <label>Degree</label>

                <input
                    type="text"
                    class="education-degree"
                    placeholder="B.E. Data Science"
                >

            </div>


            <div class="input-group">

                <label>CGPA</label>

                <input
                    type="text"
                    class="education-cgpa"
                    placeholder="8.5"
                >

            </div>

        </div>


        <div class="input-row">

            <div class="input-group">

                <label>Start Year</label>

                <input
                    type="text"
                    class="education-start"
                    placeholder="2023"
                >

            </div>


            <div class="input-group">

                <label>End Year</label>

                <input
                    type="text"
                    class="education-end"
                    placeholder="2027"
                >

            </div>

        </div>

        <button type="button" class="remove-btn" onclick="this.parentElement.remove(); updateEducation();">
    Remove
</button>

    `;


    container.appendChild(div);


    attachEducationListeners();

}


/* =====================================================
   EDUCATION EVENT LISTENERS
===================================================== */

function attachEducationListeners() {

    const inputs =
        document.querySelectorAll(
            ".education-item input"
        );


    inputs.forEach(input => {

        input.removeEventListener(
            "input",
            updateEducation
        );

        input.addEventListener(
            "input",
            updateEducation
        );

    });

}


attachEducationListeners();


/* =====================================================
   PROJECTS
===================================================== */

function updateProjects() {

    const items =
        document.querySelectorAll(".project-item");

    const preview =
        document.getElementById("previewProjects");


    preview.innerHTML = "";

    let hasData = false;


    items.forEach(item => {

        const title =
            item.querySelector(".project-title").value.trim();

        const tech =
            item.querySelector(".project-tech").value.trim();

        const description =
            item.querySelector(".project-description").value.trim();

        const link =
            item.querySelector(".project-link").value.trim();


        if (
            title ||
            tech ||
            description ||
            link
        ) {

            hasData = true;


            const div =
                document.createElement("div");

            div.className =
                "project-preview";


            div.innerHTML = `

                <h3>${title || "Project Title"}</h3>

                <p class="project-tech">
                    ${tech || "Technologies"}
                </p>

                <p>
                    ${description || "Project description"}
                </p>

                ${
                    link
                    ? `<p>${link}</p>`
                    : ""
                }

            `;


            preview.appendChild(div);

        }

    });


    if (!hasData) {

        preview.innerHTML =
            `<p class="empty-text">
                Your projects will appear here.
            </p>`;

    }

}


/* =====================================================
   ADD PROJECT
===================================================== */

function addProject() {

    const container =
        document.getElementById("projectContainer");


    const div =
        document.createElement("div");


    div.className =
        "dynamic-item project-item";


    div.innerHTML = `

        <div class="input-group">

            <label>Project Title</label>

            <input
                type="text"
                class="project-title"
                placeholder="Project name"
            >

        </div>


        <div class="input-group">

            <label>Technologies</label>

            <input
                type="text"
                class="project-tech"
                placeholder="Python, Pandas, SQL"
            >

        </div>


        <div class="input-group">

            <label>Description</label>

            <textarea
                class="project-description"
                rows="4"
                placeholder="Describe your project..."
            ></textarea>

        </div>


        <div class="input-group">

            <label>GitHub Link</label>

            <input
                type="url"
                class="project-link"
                placeholder="https://github.com/..."
            >

        </div>

        <button
    type="button"
    class="remove-btn"
    onclick="this.parentElement.remove(); updateProjects();"
>
    Remove
</button>

    `;


    container.appendChild(div);


    attachProjectListeners();

}


/* =====================================================
   PROJECT EVENT LISTENERS
===================================================== */

function attachProjectListeners() {

    const inputs =
        document.querySelectorAll(
            ".project-item input, .project-item textarea"
        );


    inputs.forEach(input => {

        input.removeEventListener(
            "input",
            updateProjects
        );

        input.addEventListener(
            "input",
            updateProjects
        );

    });

}


attachProjectListeners();


/* =====================================================
   EXPERIENCE
===================================================== */

function updateExperience() {

    const items =
        document.querySelectorAll(".experience-item");

    const preview =
        document.getElementById("previewExperience");


    preview.innerHTML = "";

    let hasData = false;


    items.forEach(item => {

        const company =
            item.querySelector(
                ".experience-company"
            ).value.trim();

        const role =
            item.querySelector(
                ".experience-role"
            ).value.trim();

        const duration =
            item.querySelector(
                ".experience-duration"
            ).value.trim();

        const description =
            item.querySelector(
                ".experience-description"
            ).value.trim();


        if (
            company ||
            role ||
            duration ||
            description
        ) {

            hasData = true;


            const div =
                document.createElement("div");

            div.className =
                "experience-preview";


            div.innerHTML = `

                <h3>
                    ${role || "Job Role"}
                    ${company ? " - " + company : ""}
                </h3>

                <p>
                    ${duration || ""}
                </p>

                <p>
                    ${description || ""}
                </p>
                

            `;


            preview.appendChild(div);

        }

    });


    if (!hasData) {

        preview.innerHTML =
            `<p class="empty-text">
                Your experience will appear here.
            </p>`;

    }

}


/* =====================================================
   ADD EXPERIENCE
===================================================== */

function addExperience() {

    const container =
        document.getElementById(
            "experienceContainer"
        );


    const div =
        document.createElement("div");


    div.className =
        "dynamic-item experience-item";


    div.innerHTML = `

        <div class="input-group">

            <label>Company</label>

            <input
                type="text"
                class="experience-company"
                placeholder="Company name"
            >

        </div>


        <div class="input-row">

            <div class="input-group">

                <label>Role</label>

                <input
                    type="text"
                    class="experience-role"
                    placeholder="Software Intern"
                >

            </div>


            <div class="input-group">

                <label>Duration</label>

                <input
                    type="text"
                    class="experience-duration"
                    placeholder="June 2026 - August 2026"
                >

            </div>

        </div>


        <div class="input-group">

            <label>Description</label>

            <textarea
                class="experience-description"
                rows="4"
                placeholder="Describe your responsibilities..."
            ></textarea>

        </div>
        <button
    type="button"
    class="remove-btn"
    onclick="this.parentElement.remove(); updateExperience();"
>
    Remove
</button>

    `;


    container.appendChild(div);


    attachExperienceListeners();

}


/* =====================================================
   EXPERIENCE EVENT LISTENERS
===================================================== */

function attachExperienceListeners() {

    const inputs =
        document.querySelectorAll(
            ".experience-item input, .experience-item textarea"
        );


    inputs.forEach(input => {

        input.removeEventListener(
            "input",
            updateExperience
        );

        input.addEventListener(
            "input",
            updateExperience
        );

    });

}


attachExperienceListeners();


/* =====================================================
   CERTIFICATIONS
===================================================== */

function updateCertifications() {

    const items =
        document.querySelectorAll(
            ".certification-item"
        );


    const preview =
        document.getElementById(
            "previewCertifications"
        );


    preview.innerHTML = "";

    let hasData = false;


    items.forEach(item => {

        const name =
            item.querySelector(
                ".certification-name"
            ).value.trim();

        const org =
            item.querySelector(
                ".certification-org"
            ).value.trim();

        const year =
            item.querySelector(
                ".certification-year"
            ).value.trim();


        if (name || org || year) {

            hasData = true;


            const div =
                document.createElement("div");

            div.className =
                "certification-preview";


            div.innerHTML = `

                <h3>
                    ${name || "Certification"}
                </h3>

                <p>
                    ${org || ""}
                    ${year ? " | " + year : ""}
                </p>

            `;


            preview.appendChild(div);

        }

    });


    if (!hasData) {

        preview.innerHTML =
            `<p class="empty-text">
                Your certifications will appear here.
            </p>`;

    }

}


/* =====================================================
   ADD CERTIFICATION
===================================================== */

function addCertification() {

    const container =
        document.getElementById(
            "certificationContainer"
        );


    const div =
        document.createElement("div");


    div.className =
        "dynamic-item certification-item";


    div.innerHTML = `

        <div class="input-group">

            <label>Certification</label>

            <input
                type="text"
                class="certification-name"
                placeholder="Certification name"
            >

        </div>


        <div class="input-row">

            <div class="input-group">

                <label>Organization</label>

                <input
                    type="text"
                    class="certification-org"
                    placeholder="Microsoft"
                >

            </div>


            <div class="input-group">

                <label>Year</label>

                <input
                    type="text"
                    class="certification-year"
                    placeholder="2026"
                >

            </div>

        </div>
        <button
    type="button"
    class="remove-btn"
    onclick="this.parentElement.remove(); updateCertifications();"
>
    Remove
</button>

    `;


    container.appendChild(div);


    attachCertificationListeners();

}


/* =====================================================
   CERTIFICATION EVENT LISTENERS
===================================================== */

function attachCertificationListeners() {

    const inputs =
        document.querySelectorAll(
            ".certification-item input"
        );


    inputs.forEach(input => {

        input.removeEventListener(
            "input",
            updateCertifications
        );

        input.addEventListener(
            "input",
            updateCertifications
        );

    });

}


attachCertificationListeners();


/* =====================================================
   PRINT / DOWNLOAD
===================================================== */

document
    .getElementById("printBtn")
    .addEventListener("click", function () {

        window.print();

    });

    /* =====================================================
   FORM VALIDATION
===================================================== */

document
    .getElementById("generateBtn")
    .addEventListener("click", validateResume);


async function validateResume() {
    let errors = [];


    /* Clear previous errors */

    document
        .querySelectorAll(".input-error")
        .forEach(input => {
            input.classList.remove("input-error");
        });


    /* ================= NAME ================= */

    const name =
        document.getElementById("name");


    if (name.value.trim() === "") {

        errors.push("Full name is required.");

        name.classList.add("input-error");

    }


    /* ================= EMAIL ================= */

    const email =
        document.getElementById("email");


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email.value.trim() === "") {

        errors.push("Email is required.");

        email.classList.add("input-error");

    }

    else if (!emailPattern.test(email.value.trim())) {

        errors.push("Please enter a valid email address.");

        email.classList.add("input-error");

    }


    /* ================= PHONE ================= */

    const phone =
        document.getElementById("phone");


    const phonePattern =
        /^[0-9+\-\s()]{10,15}$/;


    if (
        phone.value.trim() !== "" &&
        !phonePattern.test(phone.value.trim())
    ) {

        errors.push("Please enter a valid phone number.");

        phone.classList.add("input-error");

    }


    /* ================= SKILLS ================= */

    const skills =
        document.getElementById("skills");


    if (skills.value.trim() === "") {

        errors.push("Please add at least one skill.");

        skills.classList.add("input-error");

    }


    /* ================= RESULT ================= */

    const message =
        document.getElementById("formMessage");


    if (errors.length > 0) {

        message.className =
            "form-message error";

        message.innerHTML =
            errors.join("<br>");

        return;

    }


    message.className =
    "form-message success";

message.textContent =
    "Saving resume...";

await saveResume();

}

/* =====================================================
   SAVE RESUME TO BACKEND
===================================================== */

async function saveResume() {

    const resumeData = {

        name: getValue("name"),
         title: getValue("title"),
        email: getValue("email"),
        phone: getValue("phone"),
        location: getValue("location"),
        linkedin: getValue("linkedin"),
        github: getValue("github"),
        summary: getValue("summary"),

        skills: getValue("skills")
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== ""),

        education: getEducationData(),

        experience: getExperienceData(),

        projects: getProjectData(),

        certifications: getCertificationData()
    };


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/resume/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(resumeData)
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.detail || "Failed to save resume."
            );

        }


        const message =
            document.getElementById("formMessage");


        message.className =
            "form-message success";

        message.textContent =
    `✓ Resume saved successfully! Resume ID: ${result.id}`;


console.log(
    "Resume saved:",
    result
);


// Run ATS analysis if Job Description is provided
await analyzeGeneratedResume(resumeData);


    } catch (error) {

        console.error(
            "Error saving resume:",
            error
        );


        const message =
            document.getElementById("formMessage");


        message.className =
            "form-message error";

        message.textContent =
            "✗ Could not save resume. Please make sure the backend is running.";

    }

}

function getEducationData() {

    const items =
        document.querySelectorAll(".education-item");

    const education = [];


    items.forEach(item => {

        const college =
            item.querySelector(".education-college")
                .value.trim();

        const degree =
            item.querySelector(".education-degree")
                .value.trim();

        const cgpa =
            item.querySelector(".education-cgpa")
                .value.trim();

        const start =
            item.querySelector(".education-start")
                .value.trim();

        const end =
            item.querySelector(".education-end")
                .value.trim();


        if (
            college ||
            degree ||
            cgpa ||
            start ||
            end
        ) {

            education.push({

                college: college,

                degree: degree,

                cgpa: cgpa,

                start_year: start,

                end_year: end

            });

        }

    });


    return education;
}

function getExperienceData() {

    const items =
        document.querySelectorAll(".experience-item");

    const experience = [];


    items.forEach(item => {

        const company =
            item.querySelector(".experience-company")
                .value.trim();

        const role =
            item.querySelector(".experience-role")
                .value.trim();

        const duration =
            item.querySelector(".experience-duration")
                .value.trim();

        const description =
            item.querySelector(".experience-description")
                .value.trim();


        if (
            company ||
            role ||
            duration ||
            description
        ) {

            experience.push({

                company: company,

                role: role,

                duration: duration,

                description: description

            });

        }

    });


    return experience;
}

function getProjectData() {

    const items =
        document.querySelectorAll(".project-item");

    const projects = [];


    items.forEach(item => {

        const title =
            item.querySelector(".project-title")
                .value.trim();

        const tech =
            item.querySelector(".project-tech")
                .value.trim();

        const description =
            item.querySelector(".project-description")
                .value.trim();

        const link =
            item.querySelector(".project-link")
                .value.trim();


        if (
            title ||
            tech ||
            description ||
            link
        ) {

            projects.push({

                title: title,

                technologies: tech,

                description: description,

                github: link

            });

        }

    });


    return projects;
}

function getCertificationData() {

    const items =
        document.querySelectorAll(
            ".certification-item"
        );

    const certifications = [];


    items.forEach(item => {

        const name =
            item.querySelector(".certification-name")
                .value.trim();

        const organization =
            item.querySelector(".certification-org")
                .value.trim();

        const year =
            item.querySelector(".certification-year")
                .value.trim();


        if (
            name ||
            organization ||
            year
        ) {

            certifications.push({

                name: name,

                organization: organization,

                year: year

            });

        }

    });


    return certifications;
}

/* =====================================================
   LOAD RESUME FROM BACKEND
===================================================== */

async function loadResume(resumeId) {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/resume/${resumeId}`
        );

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Resume not found."
            );

        }

        const resume = result.resume;

        /* ================= PERSONAL INFORMATION ================= */

        document.getElementById("name").value =
            resume.name || "";

        document.getElementById("email").value =
            resume.email || "";

        document.getElementById("phone").value =
            resume.phone || "";

        document.getElementById("location").value =
            resume.location || "";

        document.getElementById("linkedin").value =
            resume.linkedin || "";

        document.getElementById("github").value =
            resume.github || "";

        document.getElementById("summary").value =
            resume.summary || "";


        /* ================= SKILLS ================= */

        document.getElementById("skills").value =
            (resume.skills || []).join(", ");


        /* ================= UPDATE PREVIEW ================= */

        document.getElementById("previewName").textContent =
            resume.name || "Your Name";

        document.getElementById("previewEmail").textContent =
            resume.email || "email@example.com";

        document.getElementById("previewPhone").textContent =
            resume.phone || "+91 XXXXX XXXXX";

        document.getElementById("previewLocation").textContent =
            resume.location || "Location";

        document.getElementById("previewSummary").textContent =
            resume.summary ||
            "Your professional summary will appear here.";


        /* LinkedIn */

        const linkedinPreview =
            document.getElementById("previewLinkedin");

        linkedinPreview.textContent = "LinkedIn";

        if (resume.linkedin) {

            linkedinPreview.href =
                resume.linkedin.startsWith("http")
                    ? resume.linkedin
                    : "https://" + resume.linkedin;

        } else {

            linkedinPreview.removeAttribute("href");

        }


        /* GitHub */

        const githubPreview =
            document.getElementById("previewGithub");

        githubPreview.textContent = "GitHub";

        if (resume.github) {

            githubPreview.href =
                resume.github.startsWith("http")
                    ? resume.github
                    : "https://" + resume.github;

        } else {

            githubPreview.removeAttribute("href");

        }


        /* Skills preview */

        updateSkills();


        /* ================= EDUCATION ================= */

        const educationContainer =
            document.getElementById("educationContainer");

        educationContainer.innerHTML = "";

        (resume.education || []).forEach(education => {

            addEducation();

            const items =
                document.querySelectorAll(".education-item");

            const item =
                items[items.length - 1];

            item.querySelector(".education-college").value =
                education.college || "";

            item.querySelector(".education-degree").value =
                education.degree || "";

            item.querySelector(".education-cgpa").value =
                education.cgpa || "";

            item.querySelector(".education-start").value =
                education.start_year || "";

            item.querySelector(".education-end").value =
                education.end_year || "";

        });

        updateEducation();


        /* ================= EXPERIENCE ================= */

        const experienceContainer =
            document.getElementById("experienceContainer");

        experienceContainer.innerHTML = "";

        (resume.experience || []).forEach(experience => {

            addExperience();

            const items =
                document.querySelectorAll(".experience-item");

            const item =
                items[items.length - 1];

            item.querySelector(".experience-company").value =
                experience.company || "";

            item.querySelector(".experience-role").value =
                experience.role || "";

            item.querySelector(".experience-duration").value =
                experience.duration || "";

            item.querySelector(".experience-description").value =
                experience.description || "";

        });

        updateExperience();


        /* ================= PROJECTS ================= */

        const projectContainer =
            document.getElementById("projectContainer");

        projectContainer.innerHTML = "";

        (resume.projects || []).forEach(project => {

            addProject();

            const items =
                document.querySelectorAll(".project-item");

            const item =
                items[items.length - 1];

            item.querySelector(".project-title").value =
                project.title || "";

            item.querySelector(".project-tech").value =
                project.technologies || "";

            item.querySelector(".project-description").value =
                project.description || "";

            item.querySelector(".project-link").value =
                project.github || "";

        });

        updateProjects();


        /* ================= CERTIFICATIONS ================= */

        const certificationContainer =
            document.getElementById("certificationContainer");

        certificationContainer.innerHTML = "";

        (resume.certifications || []).forEach(certification => {

            addCertification();

            const items =
                document.querySelectorAll(
                    ".certification-item"
                );

            const item =
                items[items.length - 1];

            item.querySelector(".certification-name").value =
                certification.name || "";

            item.querySelector(".certification-org").value =
                certification.organization || "";

            item.querySelector(".certification-year").value =
                certification.year || "";

        });

        updateCertifications();


        console.log(
            "Resume loaded successfully:",
            result
        );


        const message =
            document.getElementById("formMessage");

        if (message) {

            message.className =
                "form-message success";

            message.textContent =
                `✓ Resume ${resumeId} loaded successfully!`;

        }


    } catch (error) {

        console.error(
            "Error loading resume:",
            error
        );

        const message =
            document.getElementById("formMessage");

        if (message) {

            message.className =
                "form-message error";

            message.textContent =
                "✗ Could not load resume.";

        }

    }

}

/* =====================================================
   CLEAR FORM
===================================================== */

document
    .getElementById("clearBtn")
    .addEventListener("click", clearForm);


function clearForm() {

    const confirmed =
        confirm(
            "Are you sure you want to clear your resume?"
        );


    if (!confirmed) {
        return;
    }


    /* Clear normal inputs */

    document
        .querySelectorAll(
            ".form-section input, .form-section textarea"
        )
        .forEach(input => {

            input.value = "";

        });


    /* Reset preview */

    document.getElementById("previewName")
        .textContent = "Your Name";

    document.getElementById("previewTitle")
        .textContent = "Professional Title";

    document.getElementById("previewEmail")
        .textContent = "email@example.com";

    document.getElementById("previewPhone")
        .textContent = "+91 XXXXX XXXXX";

    document.getElementById("previewLocation")
        .textContent = "Location";


    document.getElementById("previewLinkedin")
        .textContent = "LinkedIn";

    document.getElementById("previewLinkedin")
        .removeAttribute("href");


    document.getElementById("previewGithub")
        .textContent = "GitHub";

    document.getElementById("previewGithub")
        .removeAttribute("href");


    document.getElementById("previewSummary")
        .textContent =
        "Your professional summary will appear here.";


    document.getElementById("previewSkills")
        .innerHTML =
        `<span class="skill-tag">
            Your skills
        </span>`;


    document.getElementById("previewEducation")
        .innerHTML =
        `<p class="empty-text">
            Education details will appear here.
        </p>`;


    document.getElementById("previewProjects")
        .innerHTML =
        `<p class="empty-text">
            Your projects will appear here.
        </p>`;


    document.getElementById("previewExperience")
        .innerHTML =
        `<p class="empty-text">
            Your experience will appear here.
        </p>`;


    document.getElementById("previewCertifications")
        .innerHTML =
        `<p class="empty-text">
            Your certifications will appear here.
        </p>`;


    /* Remove extra dynamic sections */

    const educationItems =
        document.querySelectorAll(
            ".education-item"
        );

    educationItems.forEach((item, index) => {

        if (index > 0) {
            item.remove();
        }

    });


    const projectItems =
        document.querySelectorAll(
            ".project-item"
        );

    projectItems.forEach((item, index) => {

        if (index > 0) {
            item.remove();
        }

    });


    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );

    experienceItems.forEach((item, index) => {

        if (index > 0) {
            item.remove();
        }

    });


    const certificationItems =
        document.querySelectorAll(
            ".certification-item"
        );

    certificationItems.forEach((item, index) => {

        if (index > 0) {
            item.remove();
        }

    });


    /* Clear validation */

    document
        .querySelectorAll(".input-error")
        .forEach(input => {

            input.classList.remove(
                "input-error"
            );

        });


    const message =
        document.getElementById("formMessage");


    if (message) {

        message.className =
            "form-message";

        message.textContent = "";

    }

}

/* =====================================================
   LOAD SAVED RESUME BUTTON
===================================================== */

document
    .getElementById("loadResumeBtn")
    .addEventListener("click", async function () {

        const resumeId =
            prompt("Enter your Resume ID:");

        if (!resumeId) {
            return;
        }

        await loadResume(resumeId);

    });

    /* =====================================================
   ATS ANALYSIS FOR GENERATED RESUME
===================================================== */

async function analyzeGeneratedResume(resumeData) {

    const jobDescriptionElement =
        document.getElementById("builderJobDescription");

    const jobDescription =
        jobDescriptionElement.value.trim();


    // If no job description was provided,
    // don't run ATS analysis.
    if (!jobDescription) {

        return;

    }


    // Convert generated resume data into plain text
    const resumeText = buildResumeText(resumeData);


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/analyze-resume",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    resume: resumeText,

                    job_description: jobDescription

                })
            }
        );


        const result = await response.json();


        if (!response.ok) {

            throw new Error(
                result.detail ||
                "ATS analysis failed."
            );

        }


        displayBuilderATSResult(result);


    } catch (error) {

        console.error(
            "ATS analysis error:",
            error
        );


        const message =
            document.getElementById("formMessage");


        message.className =
            "form-message error";


        message.textContent =
            "Resume saved, but ATS analysis failed.";

    }

}


/* =====================================================
   BUILD RESUME TEXT
===================================================== */

function buildResumeText(resumeData) {

    let text = "";


    // Personal information

    text += `${resumeData.name || ""}\n`;

    text += `${resumeData.title || ""}\n`;

    text += `${resumeData.email || ""}\n`;

    text += `${resumeData.phone || ""}\n`;

    text += `${resumeData.location || ""}\n`;

    text += `${resumeData.linkedin || ""}\n`;

    text += `${resumeData.github || ""}\n\n`;


    // Summary

    text += "SUMMARY\n";

    text += `${resumeData.summary || ""}\n\n`;


    // Skills

    text += "SKILLS\n";

    text += `${(resumeData.skills || []).join(", ")}\n\n`;


    // Education

    text += "EDUCATION\n";

    (resumeData.education || []).forEach(education => {

        text += `${education.college || ""}\n`;

        text += `${education.degree || ""}\n`;

        text += `CGPA: ${education.cgpa || ""}\n`;

        text += `${education.start_year || ""} - ${education.end_year || ""}\n\n`;

    });


    // Projects

    text += "PROJECTS\n";

    (resumeData.projects || []).forEach(project => {

        text += `${project.title || ""}\n`;

        text += `${project.technologies || ""}\n`;

        text += `${project.description || ""}\n`;

        text += `${project.github || ""}\n\n`;

    });


    // Experience

    text += "EXPERIENCE\n";

    (resumeData.experience || []).forEach(experience => {

        text += `${experience.company || ""}\n`;

        text += `${experience.role || ""}\n`;

        text += `${experience.duration || ""}\n`;

        text += `${experience.description || ""}\n\n`;

    });


    // Certifications

    text += "CERTIFICATIONS\n";

    (resumeData.certifications || []).forEach(certification => {

        text += `${certification.name || ""}\n`;

        text += `${certification.organization || ""}\n`;

        text += `${certification.year || ""}\n\n`;

    });


    return text;

}


/* =====================================================
   DISPLAY GENERATED RESUME ATS RESULT
===================================================== */

function displayBuilderATSResult(data) {

    const resultBox =
        document.getElementById("builderATSResult");


    resultBox.style.display = "block";


    // Score

    document.getElementById(
        "builderATSScore"
    ).textContent =
        Math.round(data.ats_score);


    // Status

    document.getElementById(
        "builderATSStatus"
    ).textContent =
        data.status;


    // Keyword percentage

    document.getElementById(
        "builderKeywordPercentage"
    ).textContent =
        Math.round(
            data.keyword_match_percentage
        );


    // Matched keywords

    const matchedContainer =
        document.getElementById(
            "builderMatchedKeywords"
        );


    matchedContainer.innerHTML = "";


    (data.matched_keywords || []).forEach(keyword => {

        const span =
            document.createElement("span");


        span.className =
            "keyword matched";


        span.textContent =
            keyword;


        matchedContainer.appendChild(span);

    });


    if (
        !data.matched_keywords ||
        data.matched_keywords.length === 0
    ) {

        matchedContainer.textContent =
            "No matching keywords.";

    }


    // Missing keywords

    const missingContainer =
        document.getElementById(
            "builderMissingKeywords"
        );


    missingContainer.innerHTML = "";


    (data.missing_keywords || []).forEach(keyword => {

        const span =
            document.createElement("span");


        span.className =
            "keyword missing";


        span.textContent =
            keyword;


        missingContainer.appendChild(span);

    });


    if (
        !data.missing_keywords ||
        data.missing_keywords.length === 0
    ) {

        missingContainer.textContent =
            "No missing keywords.";

    }


    // Suggestions

    const suggestionsContainer =
        document.getElementById(
            "builderSuggestions"
        );


    suggestionsContainer.innerHTML = "";


    (data.suggestions || []).forEach(suggestion => {

        const li =
            document.createElement("li");


        li.textContent =
            suggestion;


        suggestionsContainer.appendChild(li);

    });


    // Scroll to ATS result

    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

/* =====================================================
   OPEN ATS ANALYZER
===================================================== */

document
    .getElementById("atsAnalyzerBtn")
    .addEventListener("click", function () {

        window.location.href = "ats.html";

    });


/* =====================================================
   AI SUMMARY GENERATOR
===================================================== */

document
    .getElementById("aiSummaryBtn")
    .addEventListener("click", async function () {

        const btn = this;
        const msgEl = document.getElementById("aiMessage");

        msgEl.className = "ai-message";
        msgEl.textContent = "";

        /* Collect current resume data */
        const resumeData = {
            name: getValue("name"),
            title: getValue("title"),
            email: getValue("email"),
            phone: getValue("phone"),
            location: getValue("location"),
            linkedin: getValue("linkedin"),
            github: getValue("github"),
            summary: "",
            skills: getValue("skills")
                .split(",")
                .map(s => s.trim())
                .filter(s => s !== ""),
            education: getEducationData(),
            experience: getExperienceData(),
            projects: getProjectData(),
            certifications: getCertificationData()
        };


        /* Need at least skills or a title */
        if (
            !resumeData.name &&
            !resumeData.skills.length &&
            !resumeData.title
        ) {
            msgEl.className = "ai-message error";
            msgEl.textContent =
                "Please fill in at least your name, title, or skills first.";
            return;
        }


        btn.disabled = true;
        btn.textContent = "✨ Generating...";


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/resume/ai-summary",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resumeData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.detail || "AI generation failed."
                );
            }

            /* Insert generated summary into the textarea */
            const summaryInput =
                document.getElementById("summary");

            summaryInput.value = result.summary;

            /* Trigger live preview update */
            summaryInput.dispatchEvent(new Event("input"));

            msgEl.className = "ai-message";
            msgEl.textContent =
                "✓ AI summary generated! Feel free to edit it.";


        } catch (error) {

            msgEl.className = "ai-message error";
            msgEl.textContent =
                "Could not generate summary. " +
                "Make sure the backend is running.";

        } finally {

            btn.disabled = false;
            btn.textContent = "✨ Generate AI Summary";

        }

    });

    /* =========================================================
   RESUMEIQ TEMPLATE GALLERY
========================================================= */

let currentTemplateFilter = "all";


function selectTemplateCard(templateName, card) {

    // Remove selected state from all template cards
    document.querySelectorAll(".template-card").forEach(function (item) {
        item.classList.remove("selected");
    });

    // Select clicked card
    if (card) {
        card.classList.add("selected");
    }

    const resumePreview =
        document.getElementById("resumePreview");

    if (!resumePreview) {
        return;
    }


    /*
     * Remove all ResumeIQ custom template classes
     */
    resumePreview.classList.remove(
        "template-executive",
        "template-tech",
        "template-data",
        "template-creative",
        "template-student",
        "template-two-column",
        "template-ats-pro"
    );


    /*
     * Existing templates
     *
     * These continue using your original
     * changeTemplate() function.
     */

    if (
        templateName === "modern" ||
        templateName === "classic" ||
        templateName === "minimal"
    ) {

        const oldButton = document.querySelector(
            `.template-btn[onclick*="'${templateName}'"]`
        );

        if (oldButton) {
            changeTemplate(templateName, oldButton);
        }

    }


    /*
     * New templates
     */

    else {

        resumePreview.classList.add(
            "template-" + templateName
        );

    }


    /*
     * Remember selected template
     */

    localStorage.setItem(
        "resumeIQTemplate",
        templateName
    );
}

/* ================= FILTER ================= */

function filterTemplates(category, button) {

    currentTemplateFilter = category;

    document.querySelectorAll(".template-filter").forEach(function (item) {
        item.classList.remove("active");
    });

    button.classList.add("active");

    applyTemplateFilters();
}


/* ================= SEARCH ================= */

function searchTemplates() {

    applyTemplateFilters();

}


/* ================= FILTER + SEARCH ================= */

function applyTemplateFilters() {

    const searchInput =
        document.getElementById("templateSearch");

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const cards =
        document.querySelectorAll(".template-card");

    let visibleCount = 0;


    cards.forEach(function (card) {

        const name =
            (card.dataset.name || "").toLowerCase();

        const categories =
            (card.dataset.category || "").toLowerCase();


        const categoryMatch =
            currentTemplateFilter === "all" ||
            categories.includes(currentTemplateFilter);


        const searchMatch =
            searchText === "" ||
            name.includes(searchText) ||
            categories.includes(searchText);


        if (categoryMatch && searchMatch) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    const count =
        document.getElementById("templateCount");

    if (count) {
        count.textContent = visibleCount;
    }

}


/* ================= RESTORE TEMPLATE ================= */

document.addEventListener("DOMContentLoaded", function () {

    const savedTemplate =
        localStorage.getItem("resumeIQTemplate");

    if (!savedTemplate) {
        return;
    }


    const savedCard =
        document.querySelector(
            `.template-card[data-template="${savedTemplate}"]`
        );


    if (savedCard) {

        document.querySelectorAll(".template-card").forEach(function (item) {
            item.classList.remove("selected");
        });

        savedCard.classList.add("selected");

    }

});