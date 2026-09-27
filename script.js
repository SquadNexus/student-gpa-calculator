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

// --- 3D CATIGA CS-991EX CALCULATOR ENGINE (THREE.JS) ---
let csExpression = "";
let csLastAns = "0";

function handleCalcInput(val) {
    const screen = document.getElementById('csScreen');

    if (val === 'AC') {
        csExpression = "";
        screen.innerText = "0";
        return;
    }

    if (val === 'DEL') {
        csExpression = csExpression.slice(0, -1);
        screen.innerText = csExpression === "" ? "0" : csExpression;
        return;
    }

    if (val === 'Ans') {
        csExpression += csLastAns;
    } else if (['SHIFT', 'ALPHA', 'MENU', '▲', '▼'].includes(val)) {
        return; // Non-input navigation keys
    } else {
        if (csExpression === "0" && val !== '.') {
            csExpression = val;
        } else {
            csExpression += val;
        }
    }
    screen.innerText = csExpression;
}

function handleCalculate() {
    const screen = document.getElementById('csScreen');
    try {
        let evaluated = eval(csExpression.replace(/Math\.PI/g, Math.PI));
        csLastAns = Number.isFinite(evaluated) ? evaluated.toString() : "Math Error";
        screen.innerText = csLastAns;
        csExpression = csLastAns;
    } catch (err) {
        screen.innerText = "Syntax Error";
        csExpression = "";
    }
}

// Three.js Setup with Safe Dimension Fallbacks
const container = document.getElementById('webgl-container');
const width = container.clientWidth || 380;
const height = container.clientHeight || 640;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.set(0, 0, 5.7);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 4;
controls.maxDistance = 7.5;

// Lighting Setup
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Build CATIGA Model Group with subtle realistic tilt
const catigaGroup = new THREE.Group();
catigaGroup.rotation.x = 0.05;
catigaGroup.rotation.y = -0.05;

// 1. Casing Body
const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 4.4, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x181a1d, roughness: 0.4 })
);
catigaGroup.add(body);

// 2. Faceplate Panel
const faceplate = new THREE.Mesh(
    new THREE.BoxGeometry(2.25, 4.25, 0.24),
    new THREE.MeshStandardMaterial({ color: 0x22252a, roughness: 0.5 })
);
faceplate.position.z = 0.01;
catigaGroup.add(faceplate);

// Helper function to create text-labeled button materials via Canvas Textures
function createButtonMaterial(text, bgColor, textColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let displayText = text;
    if (text === 'Math.sqrt(') displayText = '√';
    else if (text === 'Math.log10(') displayText = 'log';
    else if (text === 'Math.log(') displayText = 'ln';
    else if (text === 'Math.sin(') displayText = 'sin';
    else if (text === 'Math.cos(') displayText = 'cos';
    else if (text === 'Math.tan(') displayText = 'tan';
    else if (text === '**3') displayText = 'x³';
    else if (text === '**') displayText = 'x^y';
    else if (text === '(-1)*') displayText = '(-)';
    else if (text === '/100') displayText = '%';

    ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.4 });
}

// Color definitions
const colKey = '#2c3036';
const colShift = '#d35400';
const colAlpha = '#884ea0';
const colMenu = '#2471a3';
const colAC = '#c0392b';
const colEq = '#27ae60';
const colOp = '#202226';

// Complete Keypad Layout definition
const layout = [
    [{label:'SHIFT', w:0.65, h:0.15, col:colShift}, {label:'ALPHA', w:0.65, h:0.15, col:colAlpha}, {label:'MENU', w:0.65, h:0.15, col:colMenu}],
    [{label:'▲', w:0.35, h:0.13, col:colKey}, {label:'▼', w:0.35, h:0.13, col:colKey}],
    [{label:'Math.sqrt(', w:0.45, h:0.15, col:colOp}, {label:'**3', w:0.45, h:0.15, col:colOp}, {label:'**', w:0.45, h:0.15, col:colOp}, {label:'Math.log10(', w:0.45, h:0.15, col:colOp}],
    [{label:'Math.log(', w:0.45, h:0.15, col:colOp}, {label:'(-1)*', w:0.45, h:0.15, col:colOp}, {label:'Math.sin(', w:0.45, h:0.15, col:colOp}, {label:'Math.cos(', w:0.45, h:0.15, col:colOp}],
    [{label:'Math.tan(', w:0.45, h:0.15, col:colOp}, {label:'(', w:0.45, h:0.15, col:colOp}, {label:')', w:0.45, h:0.15, col:colOp}, {label:'/', w:0.45, h:0.15, col:colOp}],
    [{label:'7', w:0.45, h:0.15, col:colKey}, {label:'8', w:0.45, h:0.15, col:colKey}, {label:'9', w:0.45, h:0.15, col:colKey}, {label:'DEL', w:0.45, h:0.15, col:colShift}],
    [{label:'4', w:0.45, h:0.15, col:colKey}, {label:'5', w:0.45, h:0.15, col:colKey}, {label:'6', w:0.45, h:0.15, col:colKey}, {label:'AC', w:0.45, h:0.15, col:colAC}],
    [{label:'1', w:0.45, h:0.15, col:colKey}, {label:'2', w:0.45, h:0.15, col:colKey}, {label:'3', w:0.45, h:0.15, col:colKey}, {label:'*', w:0.45, h:0.15, col:colOp}],
    [{label:'0', w:0.45, h:0.15, col:colKey}, {label:'.', w:0.45, h:0.15, col:colKey}, {label:'Math.PI', w:0.45, h:0.15, col:colOp}, {label:'-', w:0.45, h:0.15, col:colOp}],
    [{label:'Ans', w:0.45, h:0.15, col:colKey}, {label:'/100', w:0.45, h:0.15, col:colOp}, {label:'=', w:0.45, h:0.15, col:colEq}, {label:'+', w:0.45, h:0.15, col:colOp}]
];

const interactiveButtons = [];

// Generate 3D button meshes
layout.forEach((row, rIndex) => {
    let rowWidth = row.reduce((acc, item) => acc + item.w + 0.03, -0.03);
    let startX = -rowWidth / 2 + row[0].w / 2;

    row.forEach((btnData, cIndex) => {
        let xPos = startX + cIndex * (btnData.w + 0.04);
        let btnGeo = new THREE.BoxGeometry(btnData.w, btnData.h, 0.05);
        let mat = createButtonMaterial(btnData.label, btnData.col);
        let btnMesh = new THREE.Mesh(btnGeo, mat);
        
        let yOffset = 1.25 - (rIndex * 0.19);

        btnMesh.position.set(xPos, yOffset, 0.04);
        btnMesh.userData = { value: btnData.label };
        catigaGroup.add(btnMesh);
        interactiveButtons.push(btnMesh);
    });
});

scene.add(catigaGroup);

// Raycasting handler for clicking 3D keys
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    ) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveButtons);

        if (intersects.length > 0) {
            const clickedButton = intersects[0].object;
            const val = clickedButton.userData.value;

            // Tactile press depression animation
            clickedButton.position.z -= 0.02;
            setTimeout(() => {
                clickedButton.position.z += 0.02;
            }, 120);

            if (val === '=') {
                handleCalculate();
            } else {
                handleCalcInput(val);
            }
        }
    }
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Responsive resize handling
window.addEventListener('resize', () => {
    const w = container.clientWidth || 380;
    const h = container.clientHeight || 640;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
