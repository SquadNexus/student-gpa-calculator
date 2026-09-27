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

// --- TRUE 3D SAMSUNG S25 ULTRA MODEL ENGINE (THREE.JS) ---
let expression = "";
let lastAns = "0";

function handleCalcInput(val) {
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
        return; 
    } else {
        if (expression === "0" && val !== '.') {
            expression = val;
        } else {
            expression += val;
        }
    }
    screen.innerText = expression;
}

function handleCalculate() {
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

// Three.js Setup
const container = document.getElementById('webgl-container');
const width = container.clientWidth || 360;
const height = container.clientHeight || 640;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.set(0, 0, 5.8);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// OrbitControls let you rotate the phone 360 degrees around all sides!
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 4;
controls.maxDistance = 7.5;

// Studio Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Build Samsung S25 Ultra 3D Phone Group
const phoneGroup = new THREE.Group();
phoneGroup.rotation.x = 0.1;
phoneGroup.rotation.y = -0.3;

// 1. Titanium Chassis Body (Box with depth)
const phoneGeometry = new THREE.BoxGeometry(2.3, 4.5, 0.18);
const titaniumMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2b2e35, // Titanium Gray Finish
    roughness: 0.3,
    metalness: 0.8 
});
const phoneBody = new THREE.Mesh(phoneGeometry, titaniumMaterial);
phoneGroup.add(phoneBody);

// 2. Back Panel with Camera Lenses (Visible when you rotate to the back!)
const backPanelGeo = new THREE.PlaneGeometry(2.2, 4.4);
const backMat = new THREE.MeshStandardMaterial({ color: 0x141619, roughness: 0.4 });
const backPanel = new THREE.Mesh(backPanelGeo, backMat);
backPanel.position.z = -0.095;
backPanel.rotation.y = Math.PI; // Face backwards
phoneGroup.add(backPanel);

// Add 3 Pro Camera Lenses on the Back
const lensGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.04, 32);
const lensMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2, metalness: 0.9 });
for (let i = 0; i < 3; i++) {
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(-0.5, 1.5 - (i * 0.5), -0.11);
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
    [{label:'SHIFT', w:0.52, h:0.14, col:colShift}, {label:'ALPHA', w:0.52, h:0.14, col:colAlpha}, {label:'MENU', w:0.52, h:0.14, col:colMenu}, {label:'▲', w:0.35, h:0.14, col:colKey}],
    [{label:'Math.sqrt(', w:0.45, h:0.14, col:colOp}, {label:'**3', w:0.45, h:0.14, col:colOp}, {label:'**', w:0.45, h:0.14, col:colOp}, {label:'▼', w:0.35, h:0.14, col:colKey}],
    [{label:'Math.log(', w:0.45, h:0.14, col:colOp}, {label:'(-1)*', w:0.45, h:0.14, col:colOp}, {label:'Math.sin(', w:0.45, h:0.14, col:colOp}, {label:'Math.cos(', w:0.45, h:0.14, col:colOp}],
    [{label:'Math.tan(', w:0.45, h:0.14, col:colOp}, {label:'(', w:0.45, h:0.14, col:colOp}, {label:')', w:0.45, h:0.14, col:colOp}, {label:'/', w:0.45, h:0.14, col:colOp}],
    [{label:'7', w:0.45, h:0.14, col:colKey}, {label:'8', w:0.45, h:0.14, col:colKey}, {label:'9', w:0.45, h:0.14, col:colKey}, {label:'DEL', w:0.45, h:0.14, col:colShift}],
    [{label:'4', w:0.45, h:0.14, col:colKey}, {label:'5', w:0.45, h:0.14, col:colKey}, {label:'6', w:0.45, h:0.14, col:colKey}, {label:'AC', w:0.45, h:0.14, col:colAC}],
    [{label:'1', w:0.45, h:0.14, col:colKey}, {label:'2', w:0.45, h:0.14, col:colKey}, {label:'3', w:0.45, h:0.14, col:colKey}, {label:'*', w:0.45, h:0.14, col:colOp}],
    [{label:'0', w:0.45, h:0.14, col:colKey}, {label:'.', w:0.45, h:0.14, col:colKey}, {label:'Math.PI', w:0.45, h:0.14, col:colOp}, {label:'-', w:0.45, h:0.14, col:colOp}],
    [{label:'Ans', w:0.45, h:0.14, col:colKey}, {label:'/100', w:0.45, h:0.14, col:colOp}, {label:'=', w:0.45, h:0.14, col:colEq}, {label:'+', w:0.45, h:0.14, col:colOp}]
];

const interactiveButtons = [];

layout.forEach((row, rIndex) => {
    let rowWidth = row.reduce((acc, item) => acc + item.w + 0.02, -0.02);
    let startX = -rowWidth / 2 + row[0].w / 2;

    row.forEach((btnData, cIndex) => {
        let xPos = startX + cIndex * (btnData.w + 0.03);
        let btnGeo = new THREE.BoxGeometry(btnData.w, btnData.h, 0.04);
        let mat = createButtonMaterial(btnData.label, btnData.col);
        let btnMesh = new THREE.Mesh(btnGeo, mat);
        
        let yOffset = 1.05 - (rIndex * 0.17);

        btnMesh.position.set(xPos, yOffset, 0.1);
        btnMesh.userData = { value: btnData.label };
        phoneGroup.add(btnMesh);
        interactiveButtons.push(btnMesh);
    });
});

scene.add(phoneGroup);

// Raycasting to click buttons when viewing the front screen
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

            clickedButton.position.z -= 0.015;
            setTimeout(() => { clickedButton.position.z += 0.015; }, 120);

            if (val === '=') {
                handleCalculate();
            } else {
                handleCalcInput(val);
            }
        }
    }
});

// Render Loop with smart LCD overlay visibility (hides when you rotate to the back of the phone!)
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Check if phone is facing the camera to display the screen overlay
    const vector = new THREE.Vector3(0, 0, 1);
    vector.applyQuaternion(phoneGroup.quaternion);
    const lcdOverlay = document.getElementById('lcdOverlay');
    
    if (vector.z > 0.1) {
        lcdOverlay.style.opacity = '1';
        lcdOverlay.style.pointerEvents = 'auto';
    } else {
        lcdOverlay.style.opacity = '0'; // Hide screen when viewing the back cover!
        lcdOverlay.style.pointerEvents = 'none';
    }

    renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
    const w = container.clientWidth || 360;
    const h = container.clientHeight || 640;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});
