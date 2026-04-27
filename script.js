let userName = "";
let currentGrade = 8;
let currentRound = 1;
let currentQuestionIndex = 0;
let score = 0;

// კითხვების ბაზა (ნიმუში მე-8 კლასისთვის)
const questions = [
    { q: "რას უდრის √64?", a: ["6", "8", "10", "12"], correct: 1 },
    { q: "გამოთვალე: 2^3 + 5", a: ["11", "13", "10", "15"], correct: 1 },
    { q: "რას უდრის კუთხეების ჯამი სამკუთხედში?", a: ["90°", "180°", "360°", "270°"], correct: 1 },
    { q: "თუ 3x = 12, რას უდრის x?", a: ["2", "3", "4", "6"], correct: 2 },
    { q: "რას უდრის 0.5-ის კვადრატი?", a: ["0.25", "0.5", "1", "0.1"], correct: 0 },
    // დაამატე კიდევ ბევრი კითხვა აქ...
];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToClasses() {
    userName = document.getElementById('user-name').value;
    if (userName.length < 2) {
        alert("გთხოვთ, შეიყვანოთ სახელი და გვარი!");
        return;
    }
    showScreen('class-screen');
}

function startLevel(grade) {
    currentGrade = grade;
    score = 0;
    currentRound = 1;
    currentQuestionIndex = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const qData = questions[currentQuestionIndex % questions.length]; // იყენებს ბაზას
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('round-info').innerText = `რაუნდი: ${currentRound}/5`;
    document.getElementById('score-info').innerText = `ქულა: ${score}`;
    
    // პროგრესის ბარი
    const progress = ((currentQuestionIndex % 10) / 10) * 100;
    document.getElementById('progress-fill').style.width = progress + "%";

    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";
    qData.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, qData.correct);
        grid.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex % 10 === 0) {
        currentRound++;
    }

    if (currentRound > 5) {
        showFinish();
    } else {
        loadQuestion();
    }
}

function showFinish() {
    document.getElementById('final-user-name').innerText = userName;
    document.getElementById('final-stats').innerText = `თქვენ დააგროვეთ ${score} ქულა!`;
    showScreen('finish-screen');
}
