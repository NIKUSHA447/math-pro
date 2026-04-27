let userName = "";
let currentQuestion = 0;
let score = 0;

const questions6 = [
    // რაუნდი 1: ბუნებრივი რიცხვები (3 ქულა)
    { q: "ჩაწერეთ ციფრებით: სამი მილიონი ორასი ათი ათასი", a: ["3 210 000", "3 020 000", "3 200 100", "3 210"], c: 0, p: 3 },
    { q: "რას უდრის 124-ისა და 305-ის ნამრავლი?", a: ["37 820", "38 200", "37 400", "37 878"], c: 0, p: 3 },
    { q: "გამოთვალე: 34 567 + 28 934", a: ["63 501", "62 501", "63 401", "64 501"], c: 0, p: 3 },
    { q: "რას უდრის 500 000 − 237 458?", a: ["262 542", "263 542", "272 542", "262 442"], c: 0, p: 3 },
    { q: "შეასრულე მოქმედება: 84 672 ÷ 24", a: ["3 528", "3 428", "3 518", "3 628"], c: 0, p: 3 },
    { q: "რა არის ნებისმიერი რიცხვისა და 0-ის ნამრავლი?", a: ["0", "1", "თვითონ რიცხვი", "დაუშვებელია"], c: 0, p: 3 },
    { q: "რომელ კლასს განეკუთვნება ციფრი 5 რიცხვში 5 374 218?", a: ["მილიონთა", "ათასეულთა", "ერთეულთა", "მილიარდთა"], c: 0, p: 3 },
    { q: "გამოთვალე: 18 + 6 × 4 − 12", a: ["30", "84", "42", "18"], c: 0, p: 3 },
    { q: "რას უდრის (25 − 7) × 3 + 100 ÷ 5?", a: ["74", "54", "64", "84"], c: 0, p: 3 },
    { q: "გამოთვალე: 5 × (3 + 7) − 4 × (8 − 3)", a: ["30", "50", "20", "40"], c: 0, p: 3 },
    
    // რაუნდი 2: გაყოფადობა (4 ქულა)
    { q: "რიცხვი იყოფა 3-ზე, თუ მისი ციფრების ჯამი იყოფა:", a: ["3-ზე", "2-ზე", "9-ზე", "6-ზე"], c: 0, p: 4 },
    { q: "რომელ რიცხვზე იყოფა 2 340?", a: ["ყველა ჩამოთვლილზე", "მხოლოდ 10-ზე", "მხოლოდ 5-ზე", "მხოლოდ 2-ზე"], c: 0, p: 4 },
    { q: "აბა, ჩამოთვლილთაგან რომელია მარტივი რიცხვი?", a: ["17", "15", "21", "25"], c: 0, p: 4 },
    { q: "რას უდრის უსგ(24, 36)?", a: ["12", "6", "24", "72"], c: 0, p: 4 },
    { q: "რას უდრის უმჯ(4, 6)?", a: ["12", "24", "6", "10"], c: 0, p: 4 },
    // ... აქ გაგრძელდება კიდევ 35 კითხვა ანალოგიურად შენი ფაილიდან ...
];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToClasses() {
    userName = document.getElementById('user-name').value;
    if(!userName) return alert("შეიყვანე სახელი!");
    showScreen('class-screen');
}

function startLevel(grade) {
    if(grade !== 6) return alert("მალე დაემატება!");
    currentQuestion = 0; score = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const q = questions6[currentQuestion];
    const round = Math.floor(currentQuestion / 10) + 1;
    document.getElementById('round-info').innerText = `რაუნდი: ${round}/5 | კითხვა: ${currentQuestion + 1}/50`;
    document.getElementById('question-text').innerText = q.q;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";
    q.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => {
            if(index === q.c) score += q.p;
            currentQuestion++;
            if(currentQuestion < questions6.length) loadQuestion(); else showDiploma();
        };
        grid.appendChild(btn);
    });
}

function showDiploma() {
    showScreen('finish-screen');
    const nameSpace = document.getElementById('final-name');
    const certBox = document.getElementById('cert-box');
    nameSpace.innerText = userName;
    
    let type = "";
    if(score >= 180) { type = "ოქროს დიპლომი"; certBox.className = "diploma gold-border"; }
    else if(score >= 150) { type = "ვერცხლის დიპლომი"; certBox.className = "diploma silver-border"; }
    else if(score >= 120) { type = "ბრინჯაოს დიპლომი"; certBox.className = "diploma bronze-border"; }
    else { type = "სერთიფიკატი"; certBox.className = "diploma"; }
    
    document.getElementById('cert-type').innerText = type;
    document.getElementById('final-score').innerText = `ქულა: ${score}`;
}
