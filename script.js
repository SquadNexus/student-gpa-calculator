// --- GPA CALCULATOR LOGIC ---
let totalPoints = 0;
let totalCredits = 0;

function addCourse() {
    const name = document.getElementById('courseName').value || "Course";
    const points = parseFloat(document.getElementById('gradePoints').value);
    const credits = parseFloat(document.getElementById('credits').value);

    if (isNaN(credits) || credits <= 0) {
        alert("Please enter valid credit hours.");
        return;
    }

    totalPoints += (points * credits);
    totalCredits += credits;

    const gpa = (totalPoints / totalCredits).toFixed(2);
    
    document.getElementById('courseList').innerHTML += `<div class="course-row"><span>✔️ ${name} (${credits} Credits)</span><span>Pts: ${points}</span></div>`;
    document.getElementById('result').innerHTML = `Current Semester GPA: ${gpa}`;
    document.getElementById('courseName').value = '';
}

function resetGPA() {
    totalPoints = 0;
    totalCredits = 0;
    document.getElementById('courseList').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

// --- 3D CALCULATOR ENGINE LOGIC ---
let expression = "";
let lastAns = "0";

function calcInput(val) {
    const screen = document.getElementById('calcScreen');

    if (val === 'AC') {
        expression = "";
        screen.innerText = "0";
        return;
    }

    if (val === 'DEL') {
        expression = expression.slice(0, -1);
        screen.innerText = expression === "" ? "0" : expression;
        return;
    }

    if (val === 'Ans') {
        expression += lastAns;
    } else if (['SHIFT', 'ALPHA', 'MENU', '▲', '▼'].includes(val)) {
        return; // Navigation & modifier keys
    } else {
        if (expression === "0" && val !== '.') {
            expression = val;
        } else {
            expression += val;
        }
    }
    
    screen.innerText = expression;
}

function calculateResult() {
    const screen = document.getElementById('calcScreen');
    try {
        let evaluated = eval(expression.replace(/Math\.PI/g, Math.PI));
        lastAns = Number.isFinite(evaluated) ? evaluated.toString() : "Math Error";
        screen.innerText = lastAns;
        expression = lastAns;
    } catch (err) {
        screen.innerText = "Syntax Error";
        expression = "";
    }
}
