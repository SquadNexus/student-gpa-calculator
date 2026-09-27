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

// --- REALISTIC 3D SAMSUNG S25 ULTRA MODEL ENGINE (THREE.JS) ---
let expression = "";
let lastAns = "0";

// Canvas texture for the calculator screen built *directly* onto the 3D phone model
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 512;
screenCanvas.height = 256;
const screenCtx = screenCanvas.getContext('2d');
const screenTexture = new THREE.CanvasTexture(screenCanvas);

function updateScreenTexture() {
    // Draw LCD Style Screen background
    screenCtx.fillStyle = '#b5bec3';
    screenCtx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
    
    // Border inset shadow
    screenCtx.strokeStyle = '#555c63';
    screenCtx.lineWidth = 8;
    screenCtx.strokeRect(0, 0, screenCanvas.width, screenCanvas.height);

    // Top icons
    screenCtx.fillStyle = '#222';
    screenCtx.font = 'bold 20px monospace';
    screenCtx.fillText("M S Setup", 25, 35);
    screenCtx.fillText("5G DEG", 390, 35);

    // Divider line
    screenCtx.beginPath();
    screenCtx.moveTo(20, 50);
    screenCtx.lineTo(492, 50);
    screenCtx.strokeStyle = '#9aa5ab';
    screenCtx.lineWidth = 2;
    screenCtx.stroke();

    // Expression / Result text
    screenCtx.fillStyle = '#111';
    screenCtx.font = 'bold 42px monospace';
    screenCtx.textAlign = 'right';
    let displayText = expression === "" ? "0" : expression;
    if (displayText.length > 14) {
        displayText = displayText.slice(-14); // Keep text inside screen bounds
    }
    screenCtx.fillText(displayText, 480, 160);
    
    screenTexture.needsUpdate = true;
}
updateScreenTexture();

function handleCalcInput(val) {
    if (val === 'AC') {
        expression = "";
    } else if (val === 'DEL') {
        expression = expression.slice(0, -1);
    } else if (val === 'Ans') {
        expression += lastAns;
    } else if (['SHIFT', 'ALPHA', 'MENU', '▲', '▼'].includes(val)) {
        // Function keys handler placeholder
    } else {
        if (expression === "0" && val !== '.') {
            expression = val;
        } else {
            expression += val;
        }
    }
    updateScreenTexture();
}

function handleCalculate() {
    try {
        let evaluated = eval(expression.replace(/Math\.PI/g, Math.PI));
        lastAns = Number.isFinite(evaluated) ? evaluated.toString() : "Math Error";
        expression = lastAns;
    } catch (err) {
        expression = "Syntax Error";
    }
    updateScreenTexture();
}

// Three.js Setup
const container = document.getElementById('webgl-container');
const width = container.clientWidth || 380;
const height = container.clientHeight || 680;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.set(0, 0, 5.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// OrbitControls let you rotate the phone 360 degrees around all sides!
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3.5;
controls.maxDistance = 7;

// Studio Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.3));
const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Build Samsung S25 Ultra 3D Phone Group
const phoneGroup = new THREE.Group();
phoneGroup.rotation.x = 0.05;
phoneGroup.rotation.y = 0;

// 1. Realistic Samsung S25 Ultra Chassis Body (Sharper Titanium Corners & Flat Display Edges)
const phoneGeometry = new THREE.BoxGeometry(2.35, 4.7, 0.16);
const titaniumMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x272a30, // Titanium Gray 
    roughness: 0.25,
    metalness: 0.85 
});
const phoneBody = new THREE.Mesh(phoneGeometry, titaniumMaterial);
phoneGroup.add(phoneBody);

// 2. Front Screen Glass Panel
const glassGeo = new THREE.PlaneGeometry(2.22, 4.58);
const glassMat = new THREE.MeshStandardMaterial({ color: 0x090a0c, roughness: 0.1, metalness: 0.9 });
const frontGlass = new THREE.Mesh(glassGeo, glassMat);
frontGlass.position.z = 0.082;
phoneGroup.add(frontGlass);

// 3. Built-in Calculator Screen Mesh (Embedded directly onto the 3D phone screen!)
const screenGeo = new THREE.PlaneGeometry(2.0, 0.95);
const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
const screenMesh = new THREE.Mesh(screenGeo, screenMat);
screenMesh.position.set(0, 1.45, 0.085);
phoneGroup.add(screenMesh);

// 4. Punch-hole Selfie Camera Dot on the screen
const punchHoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16);
const punchHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
const punchHole = new THREE.Mesh(punchHoleGeo, punchHoleMat);
punchHole.rotation.x = Math.PI / 2;
punchHole.position.set(0, 2.12, 0.086);
phoneGroup.add(punchHole);

// 5. Back Panel & S25 Ultra Camera Lenses (Visible when rotated to the back!)
const backPanelGeo = new THREE.PlaneGeometry(2.25, 4.6);
const backMat = new THREE.MeshStandardMaterial({ color: 0x141619, roughness: 0.35, metalness: 0.4 });
const backPanel = new THREE.Mesh(backPanelGeo, backMat);
backPanel.position.z = -0.082;
backPanel.rotation.y = Math.PI; 
phoneGroup.add(backPanel);

// Pro Triple Camera Rings + Laser Autofocus on the Back
const lensGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
const lensMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2, metalness: 0.9 });
for (let i = 0; i < 4; i++) {
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    if (i < 3) {
        lens.position.set(-0.52, 1.6 - (i * 0.45), -0.098); // Main vertical camera cluster
    } else {
        lens.scale.set(0.6, 0.6, 0.6);
        lens.position.set(-0.25, 1.6, -0.098); // Periscope / sensor dot
    }
    phoneGroup.add(lens);
}

// Helper to generate Canvas textures for the 3D buttons
function createButtonMaterial(text, bgColor, textColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = textColor;
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let displayText = text;
    if (text === 'Math.sqrt(') displayText = '√';
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

// Keypad layout definition
const colKey = '#2c3036';
const colShift = '#d35400';
const colAlpha = '#884ea0';
const colMenu = '#2471a3';
const colAC = '#c0392b';
const colEq = '#27ae60';
const colOp = '#202226';

const layout = [
    [{label:'SHIFT', w:0.50, h:0.13, col:colShift}, {label:'ALPHA', w:0.50, h:0.13, col:colAlpha}, {label:'MENU', w:0.50, h:0.13, col:colMenu}, {label:'▲', w:0.35, h:0.13, col:colKey}],
    [{label:'Math.sqrt(', w:0.43, h:0.13, col:colOp}, {label:'**3', w:0.43, h:0.13, col:colOp}, {label:'**', w:0.43, h:0.13, col:colOp}, {label:'▼', w:0.35, h:0.13, col:colKey}],
    [{label:'Math.log(', w:0.43, h:0.13, col:colOp}, {label:'(-1)*', w:0.43, h:0.13, col:colOp}, {label:'Math.sin(', w:0.43, h:0.13, col:colOp}, {label:'Math.cos(', w:0.43, h:0.13, col:colOp}],
    [{label:'Math.tan(', w:0.43, h:0.13, col:colOp}, {label:'(', w:0.43, h:0.13, col:colOp}, {label:')', w:0.43, h:0.13, col:colOp}, {label:'/', w:0.43, h:0.13, col:colOp}],
    [{label:'7', w:0.43, h:0.13, col:colKey}, {label:'8', w:0.43, h:0.13, col:colKey}, {label:'9', w:0.43, h:0.13, col:colKey}, {label:'DEL', w:0.43, h:0.13, col:colShift}],
    [{label:'4', w:0.43, h:0.13, col:colKey}, {label:'5', w:0.43, h:0.13, col:colKey}, {label:'6', w:0.43, h:0.13, col:colKey}, {label:'AC', w:0.43, h:0.13, col:colAC}],
    [{label:'1', w:0.43, h:0.13, col:colKey}, {label:'2', w:0.43, h:0.13, col:colKey}, {label:'3', w:0.43, h:0.13, col:colKey}, {label:'*', w:0.43, h:0.13, col:colOp}],
    [{label:'0', w:0.43, h:0.13, col:colKey}, {label:'.', w:0.43, h:0.13, col:colKey}, {label:'Math.PI', w:0.43, h:0.13, col:colOp}, {label:'-', w:0.43, h:0.13, col:colOp}],
    [{label:'Ans', w:0.43, h:0.13, col:colKey}, {label:'/100', w:0.43, h:0.13, col:colOp}, {label:'=', w:0.43, h:0.13, col:colEq}, {label:'+', w:0.43, h:0.13, col:colOp}]
];

const interactiveButtons = [];

layout.forEach((row, rIndex) => {
    let rowWidth = row.reduce((acc, item) => acc + item.w + 0.02, -0.02);
    let startX = -rowWidth / 2 + row[0].w / 2;

    row.forEach((btnData, cIndex) => {
        let xPos = startX + cIndex * (btnData.w + 0.03);
        let btnGeo = new THREE.BoxGeometry(btnData.w, btnData.h, 0.03);
        let mat = createButtonMaterial(btnData.label, btnData.col);
        let btnMesh = new THREE.Mesh(btnGeo, mat);
        
        let yOffset = 0.75 - (rIndex * 0.15);

        btnMesh.position.set(xPos, yOffset, 0.088);
        btnMesh.userData = { value: btnData.label };
        phoneGroup.add(btnMesh);
        interactiveButtons.push(btnMesh);
    });
});

scene.add(phoneGroup);

// Raycasting to click buttons directly on the 3D phone screen
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

            clickedButton.position.z -= 0.01;
            setTimeout(() => { clickedButton.position.z += 0.01; }, 120);

            if (val === '=') {
                handleCalculate();
            } else {
                handleCalcInput(val);
            }
        }
    }
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
    const w = container.clientWidth || 380;
    const h = container.clientHeight || 680;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
