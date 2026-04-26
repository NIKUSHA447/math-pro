// კითხვების ბაზა
const quizData = [
    {
        question: "რას უდრის 124-ისა და 36-ის ჯამი?",
        options: ["150", "160", "140", "170"],
        correct: 1
    },
    {
        question: "რას უდრის 15-ის 20%?",
        options: ["2", "3", "5", "4"],
        correct: 1
    },
    {
        question: "რამდენია 3/4-ისა და 1/4-ის ჯამი?",
        options: ["1/2", "1", "4/8", "2/4"],
        correct: 1
    }
];

let currentQuiz = 0;
let score = 0;

// ფუნქცია ტესტის ჩასატვირთად
function loadQuiz() {
    const container = document.getElementById('quiz-container');
    if (currentQuiz < quizData.length) {
        const q = quizData[currentQuiz];
        container.innerHTML = `
            <h3>კითხვა ${currentQuiz + 1}: ${q.question}</h3>
            ${q.options.map((opt, index) => 
                `<button onclick="submitAnswer(${index})">${opt}</button>`
            ).join('')}
        `;
    } else {
        showCertificate();
    }
}

// პასუხის შემოწმება
function submitAnswer(index) {
    if (index === quizData[currentQuiz].correct) {
        score++;
    }
    currentQuiz++;
    loadQuiz();
}

// სერთიფიკატის ჩვენება
function showCertificate() {
    const name = prompt("შეიყვანე შენი სახელი სერთიფიკატისთვის:");
    const container = document.getElementById('quiz-container');
    const cert = document.getElementById('certificate');
    const certText = document.getElementById('cert-text');
    
    container.style.display = 'none';
    cert.style.display = 'block';
    
    certText.innerHTML = `
        <div style="border: 10px solid #00ffcc; padding: 40px; background: #222; position: relative;">
            <h1 style="color: gold;">სერთიფიკატი</h1>
            <p>ეს სერთიფიკატი ეძლევა <strong>${name || 'მოსწავლეს'}</strong></p>
            <p>მათემატიკის ტესტში მიღებული ქულისთვის: ${score}/${quizData.length}</p>
            <hr>
            <div style="margin-top: 20px; font-family: 'Courier New', Courier, monospace; color: #00ffcc;">
                დამზადებულია ნიკა ნანავას მიერ (NIKA NANAVA)
            </div>
        </div>
    `;
}

// ტესტის გაშვება ჩატვირთვისას
window.onload = loadQuiz;
