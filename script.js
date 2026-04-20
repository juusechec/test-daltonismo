import { platesConfig, analyzeUserAnswers, DIAGNOSIS_MESSAGES } from './logic.js';

const plates = platesConfig;

let currentIndex = 0;
let userAnswers = [];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const userInput = document.getElementById('user-input');
const plateImg = document.getElementById('plate-image');
const progressBar = document.getElementById('progress');
const currentStepText = document.getElementById('current-step');

// Event Listeners
startBtn.addEventListener('click', startTest);
nextBtn.addEventListener('click', handleNext);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleNext();
});

function startTest() {
    startScreen.classList.remove('active');
    setTimeout(() => {
        startScreen.style.display = 'none';
        testScreen.classList.add('active');
        showPlate();
    }, 400);
}

function showPlate() {
    const plate = plates[currentIndex];
    plateImg.style.opacity = '0';
    
    setTimeout(() => {
        plateImg.src = `assets/images/${plate.img}`;
        plateImg.onload = () => {
            plateImg.style.opacity = '1';
        };
        currentStepText.innerText = currentIndex + 1;
        progressBar.style.width = `${((currentIndex) / plates.length) * 100}%`;
        userInput.value = '';
        userInput.focus();
    }, 200);
}

function handleNext() {
    const value = userInput.value.trim();
    userAnswers.push(value === '' ? null : parseInt(value));

    currentIndex++;
    if (currentIndex < plates.length) {
        showPlate();
    } else {
        finishTest();
    }
}

function finishTest() {
    progressBar.style.width = '100%';
    testScreen.classList.remove('active');
    
    setTimeout(() => {
        testScreen.style.display = 'none';
        resultScreen.classList.add('active');
        analyzeResults();
    }, 400);
}

function analyzeResults() {
    const reviewGrid = document.getElementById('plates-review');
    reviewGrid.innerHTML = '';
    
    const results = analyzeUserAnswers(userAnswers);

    userAnswers.forEach((ans, idx) => {
        const plate = plates[idx];
        const isCorrect = ans === plate.normal;
        
        // Add to review grid
        const item = document.createElement('div');
        item.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        item.innerHTML = `
            <img src="assets/images/${plate.img}" alt="Lámina ${idx+1}">
            <div>Lámina ${idx+1}</div>
            <div style="font-weight:bold">${ans === null ? 'N/A' : ans}</div>
            <div style="font-size:0.7rem; opacity:0.7">Solución: ${plate.normal}</div>
        `;
        reviewGrid.appendChild(item);
    });

    displayDiagnosis(results.diagnosisId);
}

function displayDiagnosis(diagnosisId) {
    const badge = document.getElementById('result-badge');
    const desc = document.getElementById('result-description');
    
    const info = DIAGNOSIS_MESSAGES[diagnosisId];

    badge.innerText = info.title;
    badge.className = `badge ${info.status}`;
    desc.innerText = info.text;
}
