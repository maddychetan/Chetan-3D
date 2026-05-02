import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Initialize scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0f172a, 10, 50);

// Initialize camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI / 2;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x3b82f6, 2, 50);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 2000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.6
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create floating skill cubes
const skillCubes = [];
const skills = [
    'Talent Acquisition', 'SaaS Hiring', 'ATS Automation', 'AI Recruitment',
    'Stakeholder Management', 'Data-Driven Hiring', 'Employer Branding',
    'Diversity & Inclusion', 'Market Intelligence', 'Process Optimization'
];

skills.forEach((skill, index) => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random() * 0xffffff),
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
    });
    
    const cube = new THREE.Mesh(geometry, material);
    
    // Position in a circle
    const angle = (index / skills.length) * Math.PI * 2;
    const radius = 12;
    cube.position.x = Math.cos(angle) * radius;
    cube.position.z = Math.sin(angle) * radius;
    cube.position.y = Math.random() * 4;
    
    cube.userData = { skill, index };
    scene.add(cube);
    skillCubes.push(cube);
});

// Create experience timeline
const timelineNodes = [];
const experiences = [
    { company: 'Resilinc', role: 'Global TA Partner', year: '2024-Present' },
    { company: 'Mitratech', role: 'Senior Recruiter', year: '2023' },
    { company: 'TomTom', role: 'Talent Acquisition Specialist', year: '2021-2022' },
    { company: 'KellyOCG', role: 'Senior IT Recruitment Consultant', year: '2019-2021' },
    { company: 'Sunrise Systems', role: 'Lead Technical Recruiter', year: '2016-2018' }
];

experiences.forEach((exp, index) => {
    const sphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.5,
        roughness: 0.3
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = (index - 2) * 4;
    sphere.position.y = 3;
    sphere.position.z = -5;
    
    // Add connecting line
    if (index > 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(sphere.position.x - 4, 3, -5),
            new THREE.Vector3(sphere.position.x, 3, -5)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    }
    
    scene.add(sphere);
    timelineNodes.push(sphere);
});

// Create achievement stars
const achievements = [
    'Most Promising New Talent',
    'Going the Extra Mile Award',
    'Recruiter Honor Award',
    'IBM Great Mind Challenge'
];

achievements.forEach((achievement, index) => {
    const starGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const starMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.2
    });
    
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.x = Math.random() * 20 - 10;
    star.position.y = Math.random() * 10 + 5;
    star.position.z = Math.random() * 20 - 10;
    
    scene.add(star);
});

// Create education platform
const educationPlatform = new THREE.Mesh(
    new THREE.BoxGeometry(15, 0.5, 8),
    new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.3,
        roughness: 0.7
    })
);
educationPlatform.position.y = -3;
educationPlatform.position.z = 10;
scene.add(educationPlatform);

// Add text to education platform
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('MSc Computer Science\nUniversity of Hertfordshire', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });
    
    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.8,
        roughness: 0.2
    });
    
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textGeometry.center();
    textMesh.position.y = -2;
    textMesh.position.z = 10;
    scene.add(textMesh);
});

// Add floating certifications
const certifications = [
    'Java Tutorial - Udemy',
    'Tech Recruiter Certification',
    'Diversity & Inclusion - LinkedIn',
    'Cyber Security Investigation'
];

certifications.forEach((cert, index) => {
    const planeGeometry = new THREE.PlaneGeometry(3, 0.5);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = Math.random() * 15 - 7.5;
    plane.position.y = Math.random() * 3 + 1;
    plane.position.z = Math.random() * 10 - 5;
    plane.rotation.y = Math.random() * Math.PI;
    
    scene.add(plane);
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// UI Interactions
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active panel
        document.querySelectorAll('.panel-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector([data-section="${target}"]).classList.add('active');
        
        // Animate camera based on section
        switch(target) {
            case 'profile':
                camera.position.set(0, 5, 15);
                break;
            case 'experience':
                camera.position.set(0, 8, 10);
                break;
            case 'achievements':
                camera.position.set(10, 5, 10);
                break;
            case 'skills':
                camera.position.set(-10, 5, 10);
                break;
            case 'education':
                camera.position.set(0, 3, 20);
                break;
        }
    });
});

// Skill cube interaction
let hoveredCube = null;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillCubes);
    
    if (intersects.length > 0) {
        if (hoveredCube !== intersects[0].object) {
            if (hoveredCube) {
                hoveredCube.scale.set(1, 1, 1);
            }
            hoveredCube = intersects[0].object;
            hoveredCube.scale.set(1.2, 1.2, 1.2);
        }
    } else if (hoveredCube) {
        hoveredCube.scale.set(1, 1, 1);
        hoveredCube = null;
    }
});

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    // Animate particles
    particlesMesh.rotation.y = time * 0.05;
    
    // Animate skill cubes
    skillCubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y = Math.sin(time + index) * 0.5 + (index * 0.3);
    });
    
    // Animate timeline nodes
    timelineNodes.forEach((node, index) => {
        node.position.y = Math.sin(time + index) * 0.3 + 3;
    });
    
    // Animate point light
    pointLight.position.x = Math.sin(time) * 5;
    pointLight.position.z = Math.cos(time) * 5;
    
    controls.update();
    renderer.render(scene, camera);
}

// Hide loading screen when everything is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 1000);
});

// Start animation
animate();
