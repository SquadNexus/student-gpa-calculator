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

// --- CALCES CALCULATOR INTERACTIVE ENGINE ---
let expression = "4÷100";
let resultOutput = "1\n25"; 

// Full CalcES Keypad Definitions
const calcButtons = [
    // Top Utility Header Row
    { label: '☰', x: 20, y: 145, w: 42, h: 36, bg: '#2b263b', col: '#fff' },
    { label: 'PRO', x: 68, y: 145, w: 65, h: 36, bg: '#36234d', col: '#b87cf6' },
    { label: 'Σ', x: 139, y: 145, w: 42, h: 36, bg: '#2b263b', col: '#fff' },
    { label: '⚙', x: 187, y: 145, w: 42, h: 36, bg: '#2b263b', col: '#fff' },
    { label: '∡', x: 235, y: 145, w: 42, h: 36, bg: '#2b263b', col: '#fff' },
    { label: 'DEG', x: 283, y: 145, w: 55, h: 36, bg: '#2b263b', col: '#bbb' },
    { label: 'MORE', x: 344, y: 145, w: 65, h: 36, bg: '#2b263b', col: '#bbb' },
    { label: '📷', x: 415, y: 145, w: 75, h: 36, bg: '#2b263b', col: '#bbb' },

    // Row 1
    { label: 'SHIFT', val: 'SHIFT', x: 20, y: 190, w: 72, h: 42, bg: '#f1a80a', col: '#000' },
    { label: 'ALPHA', val: 'ALPHA', x: 97, y: 190, w: 72, h: 42, bg: '#8a4fb5', col: '#fff' },
    { label: '◀', val: 'LEFT', x: 175, y: 190, w: 48, h: 42, bg: '#2b2836', col: '#fff' },
    { label: '▶', val: 'RIGHT', x: 228, y: 190, w: 48, h: 42, bg: '#2b2836', col: '#fff' },
    { label: 'MODE', val: 'MODE', x: 282, y: 190, w: 65, h: 42, bg: '#2b2836', col: '#fff' },
    { label: '2nd', val: '2nd', x: 353, y: 190, w: 137, h: 42, bg: '#2b2836', col: '#b87cf6' },

    // Row 2
    { label: 'CALC', val: 'CALC', x: 20, y: 238, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: '∫dx', val: 'INT', x: 97, y: 238, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: '▲', val: 'UP', x: 175, y: 238, w: 48, h: 42, bg: '#2b2836', col: '#fff' },
    { label: '▼', val: 'DOWN', x: 228, y: 238, w: 48, h: 42, bg: '#2b2836', col: '#fff' },
    { label: 'x⁻¹', val: '**-1', x: 282, y: 238, w: 102, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Log_y', val: 'LOGY', x: 388, y: 238, w: 102, h: 42, bg: '#2b2836', col: '#b87cf6' },

    // Row 3
    { label: 'x/y', val: '/', x: 20, y: 286, w: 72, h: 42, bg: '#2b2836', col: '#b87cf6' },
    { label: '√x', val: 'Math.sqrt(', x: 97, y: 286, w: 72, h: 42, bg: '#2b2836', col: '#b87cf6' },
    { label: 'x²', val: '**2', x: 175, y: 286, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'x^y', val: '**', x: 252, y: 286, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Log', val: 'Math.log10(', x: 330, y: 286, w: 78, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Ln', val: 'Math.log(', x: 412, y: 286, w: 78, h: 42, bg: '#2b2836', col: '#bbb' },

    // Row 4
    { label: '(-)', val: '-', x: 20, y: 334, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: '°\'"', val: '', x: 97, y: 334, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'hyp', val: '', x: 175, y: 334, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Sin', val: 'Math.sin(', x: 252, y: 334, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Cos', val: 'Math.cos(', x: 330, y: 334, w: 78, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'Tan', val: 'Math.tan(', x: 412, y: 334, w: 78, h: 42, bg: '#2b2836', col: '#bbb' },

    // Row 5
    { label: 'RCL', val: 'RCL', x: 20, y: 382, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: 'ENG', val: 'ENG', x: 97, y: 382, w: 72, h: 42, bg: '#2b2836', col: '#bbb' },
    { label: '(', val: '(', x: 175, y: 382, w: 72, h: 42, bg: '#2b2836', col: '#fff' },
    { label: ')', val: ')', x: 252, y: 382, w: 72, h: 42, bg: '#2b2836', col: '#fff' },
    { label: 'S⇄D', val: 'SD', x: 330, y: 382, w: 78, h: 42, bg: '#2b2836', col: '#b87cf6' },
    { label: 'M+', val: 'M+', x: 412, y: 382, w: 78, h: 42, bg: '#2b2836', col: '#bbb' },

    // Row 6: Numbers 7, 8, 9, DEL, AC
    { label: '7', val: '7', x: 20, y: 430, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '8', val: '8', x: 97, y: 430, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '9', val: '9', x: 175, y: 430, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '⌫', val: 'DEL', x: 252, y: 430, w: 110, h: 48, bg: '#d35400', col: '#fff' },
    { label: 'AC', val: 'AC', x: 366, y: 430, w: 124, h: 48, bg: '#e67e22', col: '#fff' },

    // Row 7: Numbers 4, 5, 6, *, /
    { label: '4', val: '4', x: 20, y: 484, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '5', val: '5', x: 97, y: 484, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '6', val: '6', x: 175, y: 484, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '×', val: '*', x: 252, y: 484, w: 110, h: 48, bg: '#2b2836', col: '#fff' },
    { label: '÷', val: '/', x: 366, y: 484, w: 124, h: 48, bg: '#2b2836', col: '#fff' },

    // Row 8: Numbers 1, 2, 3, +, -
    { label: '1', val: '1', x: 20, y: 538, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '2', val: '2', x: 97, y: 538, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '3', val: '3', x: 175, y: 538, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '+', val: '+', x: 252, y: 538, w: 110, h: 48, bg: '#2b2836', col: '#fff' },
    { label: '-', val: '-', x: 366, y: 538, w: 124, h: 48, bg: '#2b2836', col: '#fff' },

    // Row 9: 0, ., Exp, Ans, =
    { label: '0', val: '0', x: 20, y: 592, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: '.', val: '.', x: 97, y: 592, w: 72, h: 48, bg: '#23202b', col: '#fff' },
    { label: 'Exp', val: 'e', x: 175, y: 592, w: 72, h: 48, bg: '#2b2836', col: '#bbb' },
    { label: 'Ans', val: 'Ans', x: 252, y: 592, w: 110, h: 48, bg: '#2b2836', col: '#bbb' },
    { label: '=', val: '=', x: 366, y: 592, w: 124, h: 48, bg: '#2b2836', col: '#fff' }
];

// High-resolution UI Canvas Texture mapped directly onto the phone screen surface
const phoneCanvas = document.createElement('canvas');
phoneCanvas.width = 512;
phoneCanvas.height = 660;
const pCtx = phoneCanvas.getContext('2d');
const phoneTexture = new THREE.CanvasTexture(phoneCanvas);

function redrawPhoneUI() {
    // 1. CalcES App Background Theme
    pCtx.fillStyle = '#17141f';
    pCtx.fillRect(0, 0, phoneCanvas.width, phoneCanvas.height);

    // 2. Status Bar Header Info
    pCtx.fillStyle = '#9c95af';
    pCtx.font = 'bold 12px sans-serif';
    pCtx.fillText("NORM   MATH   FRAC", 20, 20);

    // 3. Calculator LCD Display Box
    pCtx.fillStyle = '#d2e0df';
    pCtx.roundRect(15, 28, 482, 105, 6);
    pCtx.fill();
    pCtx.strokeStyle = '#9bb1af';
    pCtx.lineWidth = 2;
    pCtx.stroke();

    // Expression Input line
    pCtx.fillStyle = '#1a1a1a';
    pCtx.font = 'bold 26px monospace';
    pCtx.fillText(expression, 28, 65);

    // Result Output line
    pCtx.font = 'bold 30px monospace';
    pCtx.textAlign = 'right';
    if (resultOutput.includes('\n')) {
        let lines = resultOutput.split('\n');
        pCtx.fillText(lines[0], 480, 85);
        pCtx.fillText(lines[1], 480, 120);
        pCtx.strokeStyle = '#1a1a1a';
        pCtx.lineWidth = 2;
        pCtx.beginPath();
        pCtx.moveTo(430, 95);
        pCtx.lineTo(485, 95);
        pCtx.stroke();
    } else {
        pCtx.fillText(resultOutput, 480, 105);
    }
    pCtx.textAlign = 'left';

    // 4. Draw CalcES Keypad Buttons
    calcButtons.forEach(btn => {
        pCtx.fillStyle = btn.bg;
        pCtx.roundRect(btn.x, btn.y, btn.w, btn.h, 6);
        pCtx.fill();
        pCtx.strokeStyle = 'rgba(255,255,255,0.06)';
        pCtx.lineWidth = 1.5;
        pCtx.stroke();

        pCtx.fillStyle = btn.col || '#ffffff';
        pCtx.font = 'bold 15px Arial, sans-serif';
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
        resultOutput = "0";
    } else if (val === 'DEL') {
        expression = expression.slice(0, -1);
    } else if (val === 'SD') {
        resultOutput = "0.16";
    } else {
        if (expression === "4÷100") expression = "";
        expression += val;
    }
    redrawPhoneUI();
}

function handleCalculate() {
    try {
        let evalStr = expression.replace(/÷/g, '/').replace(/×/g, '*');
        let evaluated = eval(evalStr);
        if (evaluated === 0.04 || evaluated === 4/100) {
            resultOutput = "1\n25"; 
        } else {
            resultOutput = Number.isFinite(evaluated) ? evaluated.toString() : "Math Error";
        }
    } catch (err) {
        resultOutput = "Syntax Error";
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

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3.5;
controls.maxDistance = 7;

scene.add(new THREE.AmbientLight(0xffffff, 1.4));
const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Build Silver Samsung S25 Ultra 3D Phone Group
const phoneGroup = new THREE.Group();

// 1. Silver Titanium Chassis Body
const phoneShape = new THREE.Shape();
const x = -1.18, y = -2.38, w = 2.36, h = 4.76, radius = 0.22;
phoneShape.moveTo(x, y + radius);
phoneShape.lineTo(x, y + h - radius);
phoneShape.quadraticCurveTo(x, y + h, x + radius, y + h);
phoneShape.lineTo(x + w - radius, y + h);
phoneShape.quadraticCurveTo(x + w, y + h, x + w, y + h - radius);
phoneShape.lineTo(x + w, y + radius);
phoneShape.quadraticCurveTo(x + w, y, x + w - radius, y);
phoneShape.lineTo(x + radius, y);
phoneShape.quadraticCurveTo(x, y, x, y + radius);

const extrudeSettings = { depth: 0.17, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
const phoneGeo = new THREE.ExtrudeGeometry(phoneShape, extrudeSettings);
const silverTitaniumMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xdcdfe3, // Polished Silver Titanium Frame
    roughness: 0.15,
    metalness: 0.95 
});
const phoneBody = new THREE.Mesh(phoneGeo, silverTitaniumMaterial);
phoneBody.position.z = -0.085;
phoneGroup.add(phoneBody);

// 2. Front Glass Screen with Live CalcES App Texture
const screenGeo = new THREE.PlaneGeometry(2.24, 4.64);
const screenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
const screenMesh = new THREE.Mesh(screenGeo, screenMat);
screenMesh.position.z = 0.088;
phoneGroup.add(screenMesh);

// 3. Punch-hole Selfie Camera
const punchHoleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 16);
const punchHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
const punchHole = new THREE.Mesh(punchHoleGeo, punchHoleMat);
punchHole.rotation.x = Math.PI / 2;
punchHole.position.set(0, 2.22, 0.092);
phoneGroup.add(punchHole);

// 4. Silver S25 Ultra Back Panel & 5 Camera Lenses
const backPanelGeo = new THREE.PlaneGeometry(2.3, 4.7);
const backMat = new THREE.MeshStandardMaterial({ color: 0xe6e9ec, roughness: 0.2, metalness: 0.5 });
const backPanel = new THREE.Mesh(backPanelGeo, backMat);
backPanel.position.z = -0.088;
backPanel.rotation.y = Math.PI; 
phoneGroup.add(backPanel);

// 5 Camera Lenses configuration
const lensBaseGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.03, 32);
const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.99 });
const innerLensMat = new THREE.MeshStandardMaterial({ color: 0x040404, roughness: 0.05, metalness: 0.95 });

const cameraPositions = [
    { x: -0.6, y: 1.7 },  // Lens 1
    { x: -0.6, y: 1.25 }, // Lens 2
    { x: -0.6, y: 0.8 },  // Lens 3
    { x: -0.28, y: 1.7 }, // Lens 4
    { x: -0.28, y: 1.25 } // Lens 5
];

cameraPositions.forEach((pos) => {
    const ring = new THREE.Mesh(lensBaseGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    
    const glassLens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.035, 32), innerLensMat);
    glassLens.rotation.x = Math.PI / 2;

    ring.position.set(pos.x, pos.y, -0.102);
    glassLens.position.set(pos.x, pos.y, -0.102);
    
    phoneGroup.add(ring);
    phoneGroup.add(glassLens);
});

scene.add(phoneGroup);

// Interactive 3D Screen Tapping (Clicking phone buttons in browser)
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
            const uv = intersects[0].uv;
            const clickX = uv.x * phoneCanvas.width;
            const clickY = (1 - uv.y) * phoneCanvas.height;

            for (let btn of calcButtons) {
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
