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

// Button definition array for the interactive screen touch UI
const buttonsData = [
    { label: 'SHIFT', x: 30, y: 150, w: 105, h: 45, bg: '#d35400' },
    { label: 'ALPHA', x: 145, y: 150, w: 105, h: 45, bg: '#884ea0' },
    { label: 'MODE', x: 260, y: 150, w: 105, h: 45, bg: '#2471a3' },
    { label: '▲', x: 375, y: 150, w: 105, h: 45, bg: '#2c3036' },

    { label: '√', val: 'Math.sqrt(', x: 30, y: 205, w: 105, h: 45, bg: '#202226' },
    { label: 'x³', val: '**3', x: 145, y: 205, w: 105, h: 45, bg: '#202226' },
    { label: 'x^y', val: '**', x: 260, y: 205, w: 105, h: 45, bg: '#202226' },
    { label: '▼', x: 375, y: 205, w: 105, h: 45, bg: '#2c3036' },

    { label: 'ln', val: 'Math.log(', x: 30, y: 260, w: 105, h: 45, bg: '#202226' },
    { label: '(-)', val: '(-1)*', x: 145, y: 260, w: 105, h: 45, bg: '#202226' },
    { label: 'sin', val: 'Math.sin(', x: 260, y: 260, w: 105, h: 45, bg: '#202226' },
    { label: 'cos', val: 'Math.cos(', x: 375, y: 260, w: 105, h: 45, bg: '#202226' },

    { label: 'tan', val: 'Math.tan(', x: 30, y: 315, w: 105, h: 45, bg: '#202226' },
    { label: '(', val: '(', x: 145, y: 315, w: 105, h: 45, bg: '#202226' },
    { label: ')', val: ')', x: 260, y: 315, w: 105, h: 45, bg: '#202226' },
    { label: '/', val: '/', x: 375, y: 315, w: 105, h: 45, bg: '#202226' },

    { label: '7', val: '7', x: 30, y: 370, w: 105, h: 50, bg: '#2c3036' },
    { label: '8', val: '8', x: 145, y: 370, w: 105, h: 50, bg: '#2c3036' },
    { label: '9', val: '9', x: 260, y: 370, w: 105, h: 50, bg: '#2c3036' },
    { label: 'DEL', val: 'DEL', x: 375, y: 370, w: 105, h: 50, bg: '#d35400' },

    { label: '4', val: '4', x: 30, y: 430, w: 105, h: 50, bg: '#2c3036' },
    { label: '5', val: '5', x: 145, y: 430, w: 105, h: 50, bg: '#2c3036' },
    { label: '6', val: '6', x: 260, y: 430, w: 105, h: 50, bg: '#2c3036' },
    { label: 'AC', val: 'AC', x: 375, y: 430, w: 105, h: 50, bg: '#c0392b' },

    { label: '1', val: '1', x: 30, y: 490, w: 105, h: 50, bg: '#2c3036' },
    { label: '2', val: '2', x: 145, y: 490, w: 105, h: 50, bg: '#2c3036' },
    { label: '3', val: '3', x: 260, y: 490, w: 105, h: 50, bg: '#2c3036' },
    { label: '*', val: '*', x: 375, y: 490, w: 105, h: 50, bg: '#202226' },

    { label: '0', val: '0', x: 30, y: 550, w: 105, h: 50, bg: '#2c3036' },
    { label: '.', val: '.', x: 145, y: 550, w: 105, h: 50, bg: '#2c3036' },
    { label: 'π', val: 'Math.PI', x: 260, y: 550, w: 105, h: 50, bg: '#202226' },
    { label: '-', val: '-', x: 375, y: 550, w: 105, h: 50, bg: '#202226' },

    { label: 'Ans', val: 'Ans', x: 30, y: 610, w: 105, h: 50, bg: '#2c3036' },
    { label: '%', val: '/100', x: 145, y: 610, w: 105, h: 50, bg: '#202226' },
    { label: '=', val: '=', x: 260, y: 610, w: 220, h: 50, bg: '#27ae60' }
];

// High-resolution UI Canvas Texture mapped directly onto the phone screen surface
const phoneCanvas = document.createElement('canvas');
phoneCanvas.width = 512;
phoneCanvas.height = 720;
const pCtx = phoneCanvas.getContext('2d');
const phoneTexture = new THREE.CanvasTexture(phoneCanvas);

function redrawPhoneUI() {
    // 1. Phone App Background Wallpaper
    pCtx.fillStyle = '#0f1115';
    pCtx.fillRect(0, 0, phoneCanvas.width, phoneCanvas.height);

    // 2. Status Bar
    pCtx.fillStyle = '#ffffff';
    pCtx.font = 'bold 16px sans-serif';
    pCtx.fillText("10:41", 35, 30);
    pCtx.fillText("5G  100%", 410, 30);

    // 3. Calculator LCD Display Box
    pCtx.fillStyle = '#b5bec3';
    pCtx.roundRect(30, 50, 452, 80, 8);
    pCtx.fill();
    pCtx.strokeStyle = '#555c63';
    pCtx.lineWidth = 3;
    pCtx.stroke();

    // Screen info icons
    pCtx.fillStyle = '#222';
    pCtx.font = 'bold 15px monospace';
    pCtx.fillText("M S Setup", 45, 75);
    pCtx.fillText("DEG", 420, 75);

    // Expression/Result output
    pCtx.fillStyle = '#111';
    pCtx.font = 'bold 36px monospace';
    pCtx.textAlign = 'right';
    let displayText = expression === "" ? "0" : expression;
    if (displayText.length > 12) displayText = displayText.slice(-12);
    pCtx.fillText(displayText, 465, 118);
    pCtx.textAlign = 'left'; // reset

    // 4. Draw Touch Screen Calculator Buttons
    buttonsData.forEach(btn => {
        pCtx.fillStyle = btn.bg;
        pCtx.roundRect(btn.x, btn.y, btn.w, btn.h, 10);
        pCtx.fill();
        pCtx.strokeStyle = 'rgba(255,255,255,0.15)';
        pCtx.lineWidth = 2;
        pCtx.stroke();

        // Button label text
        pCtx.fillStyle = '#ffffff';
        pCtx.font = 'bold 20px Arial, sans-serif';
        pCtx.textAlign = 'center';
        pCtx.textBaseline = 'middle';
        pCtx.fillText(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    });

    phoneTexture.needsUpdate = true;
}
redrawPhoneUI();

function handleCalcInput(val) {
    if (val === 'AC') {
        expression = "";
    } else if (val === 'DEL') {
        expression = expression.slice(0, -1);
    } else if (val === 'Ans') {
        expression += lastAns;
    } else if (['SHIFT', 'ALPHA', 'MODE', '▲', '▼'].includes(val)) {
        // Mode/Setup switcher placeholder
    } else {
        if (expression === "0" && val !== '.') {
            expression = val;
        } else {
            expression += val;
        }
    }
    redrawPhoneUI();
}

function handleCalculate() {
    try {
        let evaluated = eval(expression.replace(/Math\.PI/g, Math.PI));
        lastAns = Number.isFinite(evaluated) ? evaluated.toString() : "Math Error";
        expression = lastAns;
    } catch (err) {
        expression = "Syntax Error";
    }
    redrawPhoneUI();
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
scene.add(new THREE.AmbientLight(0xffffff, 1.4));
const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Build Samsung S25 Ultra 3D Phone Group
const phoneGroup = new THREE.Group();
phoneGroup.rotation.x = 0.05;
phoneGroup.rotation.y = 0;

// 1. Realistic Samsung S25 Ultra Titanium Chassis Body
const phoneGeometry = new THREE.BoxGeometry(2.35, 4.7, 0.16);
const titaniumMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x272a30, // Titanium Gray Finish
    roughness: 0.25,
    metalness: 0.85 
});
const phoneBody = new THREE.Mesh(phoneGeometry, titaniumMaterial);
phoneGroup.add(phoneBody);

// 2. Front Screen Glass with Calculator Touch UI Screen Texture
const screenGeo = new THREE.PlaneGeometry(2.22, 4.58);
const screenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
const screenMesh = new THREE.Mesh(screenGeo, screenMat);
screenMesh.position.z = 0.082;
phoneGroup.add(screenMesh);

// 3. Punch-hole Selfie Camera Dot on top of screen
const punchHoleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.01, 16);
const punchHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
const punchHole = new THREE.Mesh(punchHoleGeo, punchHoleMat);
punchHole.rotation.x = Math.PI / 2;
punchHole.position.set(0, 2.22, 0.086);
phoneGroup.add(punchHole);

// 4. Realistic S25 Ultra Back Panel & Pro Camera System
const backPanelGeo = new THREE.PlaneGeometry(2.25, 4.6);
const backMat = new THREE.MeshStandardMaterial({ color: 0x141619, roughness: 0.3, metalness: 0.5 });
const backPanel = new THREE.Mesh(backPanelGeo, backMat);
backPanel.position.z = -0.082;
backPanel.rotation.y = Math.PI; 
phoneGroup.add(backPanel);

// Camera Island Glass Base plate on the back
const camIslandGeo = new THREE.BoxGeometry(0.65, 1.6, 0.015);
const camIslandMat = new THREE.MeshStandardMaterial({ color: 0x1c1e22, roughness: 0.2, metalness: 0.8 });
const camIsland = new THREE.Mesh(camIslandGeo, camIslandMat);
camIsland.position.set(-0.5, 1.3, -0.091);
phoneGroup.add(camIsland);

// 4 Pro Ultra Camera Lenses + Flash Sensor with Silver Metallic Rings
const lensBaseGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 32);
const ringMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, roughness: 0.15, metalness: 0.95 });
const innerLensMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1, metalness: 0.9 });

for (let i = 0; i < 4; i++) {
    // Silver metal ring trim
    const ring = new THREE.Mesh(lensBaseGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    
    // Dark glass inside ring
    const glassLens = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.035, 32), innerLensMat);
    glassLens.rotation.x = Math.PI / 2;

    let posX = -0.5;
    let posY = 1.7 - (i * 0.45);
    
    // Align S25 Ultra realistic staggered sensor layout
    if (i === 3) {
        posX = -0.22; // Side flash/laser sensor dot
        posY = 1.7;
    }

    ring.position.set(posX, posY, -0.10);
    glassLens.position.set(posX, posY, -0.10);
    phoneGroup.add(ring);
    phoneGroup.add(glassLens);
}

scene.add(phoneGroup);

// Raycasting to accurately click touch buttons on the 3D phone screen
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
        const intersects = raycaster.intersectObject(screenMesh);

        if (intersects.length > 0) {
            // Get exact UV coordinates where the user clicked on the screen plane
            const uv = intersects[0].uv;
            const clickX = uv.x * phoneCanvas.width;
            const clickY = (1 - uv.y) * phoneCanvas.height;

            // Check which button was tapped
            for (let btn of buttonsData) {
                if (
                    clickX >= btn.x &&
                    clickX <= btn.x + btn.w &&
                    clickY >= btn.y &&
                    clickY <= btn.y + btn.h
                ) {
                    if (btn.val === '=') {
                        handleCalculate();
                    } else if (btn.val) {
                        handleCalcInput(btn.val);
                    }
                    break;
                }
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
