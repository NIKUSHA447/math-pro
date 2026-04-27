let userName = "";
let currentQuestionIndex = 0;
let score = 0;

// კითხვების ბაზა მე-6 კლასის მასალის მიხედვით [cite: 1, 2]
const questions6 = [
    // რაუნდი 1: ბუნებრივი რიცხვები (3 ქულა) [cite: 13, 36, 59]
    { q: "ჩაწერეთ ციფრებით: სამი მილიონი ორასი ათი ათასი", a: ["3 210 000", "3 020 000", "3 200 100", "3 210"], c: 0, p: 3 }, [cite: 33]
    { q: "რომელ კლასს განეკუთვნება ციფრი 5 რიცხვში 5 374 218?", a: ["მილიონთა", "ათასეულთა", "ერთეულთა", "მილიარდთა"], c: 0, p: 3 }, [cite: 23, 24]
    { q: "გამოთვალე: 34 567 + 28 934", a: ["63 501", "62 501", "63 401", "64 501"], c: 0, p: 3 }, [cite: 53, 323]
    { q: "რას უდრის 500 000 − 237 458?", a: ["262 542", "263 542", "272 542", "262 442"], c: 0, p: 3 }, [cite: 54, 324]
    { q: "შეასრულე მოქმედება: 84 672 ÷ 24", a: ["3 528", "3 428", "3 518", "3 628"], c: 0, p: 3 }, [cite: 56, 326]
    { q: "რა არის ნებისმიერი რიცხვისა და 0-ის ნამრავლი?", a: ["0", "1", "თვითონ რიცხვი", "დაუშვებელია"], c: 0, p: 3 }, [cite: 43]
    { q: "გამოთვალე: 18 + 6 × 4 − 12", a: ["30", "84", "42", "18"], c: 0, p: 3 }, [cite: 63, 330]
    { q: "რას უდრის (25 − 7) × 3 + 100 ÷ 5?", a: ["74", "54", "64", "84"], c: 0, p: 3 }, [cite: 64, 331]
    { q: "გამოთვალე: 5 × (3 + 7) − 4 × (8 − 3)", a: ["30", "50", "20", "40"], c: 0, p: 3 }, [cite: 66, 333]
    { q: "რას უდრის 124 × 305 + 870 ÷ 15?", a: ["37 878", "37 820", "38 000", "37 500"], c: 0, p: 3 }, [cite: 57, 327]

    // რაუნდი 2: გაყოფადობა და მამრავლები (4 ქულა) [cite: 67, 68]
    { q: "რიცხვი იყოფა 3-ზე, თუ მისი ციფრების ჯამი იყოფა:", a: ["3-ზე", "2-ზე", "9-ზე", "6-ზე"], c: 0, p: 4 }, [cite: 70]
    { q: "რომელ რიცხვზე იყოფა 2 340?", a: ["ყველა ჩამოთვლილზე", "მხოლოდ 10-ზე", "მხოლოდ 5-ზე", "მხოლოდ 2-ზე"], c: 0, p: 4 }, [cite: 73]
    { q: "ჩამოთვლილთაგან რომელია მარტივი რიცხვი?", a: ["17", "15", "21", "25"], c: 0, p: 4 }, [cite: 77, 79]
    { q: "რას უდრის უსგ(24, 36)?", a: ["12", "6", "24", "72"], c: 0, p: 4 }, [cite: 98, 341]
    { q: "რას უდრის უმჯ(4, 6)?", a: ["12", "24", "6", "10"], c: 0, p: 4 }, [cite: 95]
    { q: "დაშალეთ 36 პირველმამრავლებად:", a: ["2² × 3²", "2 × 3", "2³ × 3", "4 × 9"], c: 0, p: 4 }, [cite: 85, 335]
    { q: "რიცხვი იყოფა 25-ზე, თუ მისი ბოლო ორი ციფრია:", a: ["00, 25, 50 ან 75", "მხოლოდ 25", "მხოლოდ 00", "ნებისმიერი კენტი"], c: 0, p: 4 }, [cite: 70]
    { q: "რას უდრის უმჯ(24, 36)?", a: ["72", "48", "12", "144"], c: 0, p: 4 }, [cite: 98, 341]
    { q: "მარტივი რიცხვი ეწოდება რიცხვს, რომელიც იყოფა:", a: ["1-ზე და საკუთარ თავზე", "მხოლოდ 2-ზე", "მხოლოდ კენტ რიცხვებზე", "ნებისმიერ რიცხვზე"], c: 0, p: 4 }, [cite: 77]
    { q: "რას უდრის უსგ(15, 25, 35)?", a: ["5", "15", "25", "1"], c: 0, p: 4 }, [cite: 100, 343]

    // რაუნდი 3: ჩვეულებრივი წილადები (4 ქულა) [cite: 101]
    { q: "გამოთვალე: 2/3 + 3/4", a: ["1 5/12", "5/7", "17/12", "1"], c: 0, p: 4 }, [cite: 133, 347]
    { q: "შეასრულე მოქმედება: 5/6 − 3/8", a: ["11/24", "2/24", "1/2", "8/14"], c: 0, p: 4 }, [cite: 134, 348]
    { q: "გამოთვალე: 3/5 × 10/9", a: ["2/3", "30/45", "1/2", "3/9"], c: 0, p: 4 }, [cite: 144]
    { q: "შეასრულე გაყოფა: 7/8 ÷ 7/4", a: ["1/2", "1/4", "2", "49/32"], c: 0, p: 4 }, [cite: 154]
    { q: "რას უდრის 1/3 + 1/4?", a: ["7/12", "2/7", "5/12", "1/7"], c: 0, p: 4 }, [cite: 128]
    { q: "წილადის შემცირება ნიშნავს მრიცხველის და მნიშვნელის გაყოფას მათ:", a: ["უსგ-ზე", "უმჯ-ზე", "ნამრავლზე", "სხვაობაზე"], c: 0, p: 4 }, [cite: 113]
    { q: "რომელია არასწორი წილადი?", a: ["7/4", "3/5", "1/2", "9/10"], c: 0, p: 4 }, [cite: 108]
    { q: "გამოთვალე: 3/4 ÷ 9/8", a: ["2/3", "27/32", "3/2", "1/2"], c: 0, p: 4 }, [cite: 151]
    { q: "რას უდრის 3/8 + 5/8?", a: ["1", "8/16", "2/8", "0"], c: 0, p: 4 }, [cite: 127]
    { q: "გამოთვალე: 5/9 + 2/9", a: ["7/9", "7/18", "3/9", "1"], c: 0, p: 4 }, [cite: 131, 345]

    // რაუნდი 4: ათობითი წილადები და პროცენტები (5 ქულა) [cite: 157, 190]
    { q: "რას უდრის 800-ის 35%?", a: ["280", "350", "240", "300"], c: 0, p: 5 }, [cite: 201]
    { q: "გამოთვალე: 12.45 + 7.8 + 0.035", a: ["20.285", "19.285", "20.385", "20.250"], c: 0, p: 5 }, [cite: 174, 353]
    { q: "რას უდრის 100 − 38.76?", a: ["61.24", "62.24", "71.24", "61.34"], c: 0, p: 5 }, [cite: 175, 354]
    { q: "გამოთვალე: 5.6 × 2.4", a: ["13.44", "12.44", "13.54", "14.44"], c: 0, p: 5 }, [cite: 176, 355]
    { q: "იპოვეთ მთელი რიცხვი, თუ მისი 25% არის 40", a: ["160", "100", "200", "120"], c: 0, p: 5 }, [cite: 204]
    { q: "დაამრგვალეთ 3.748 მეასედამდე:", a: ["3.75", "3.74", "3.7", "3.8"], c: 0, p: 5 }, [cite: 184]
    { q: "რას უდრის 3.75 × 100?", a: ["375", "37.5", "3750", "0.375"], c: 0, p: 5 }, [cite: 177, 356]
    { q: "1200-ის 15% არის:", a: ["180", "120", "150", "200"], c: 0, p: 5 }, [cite: 209, 362]
    { q: "გამოთვალე: 12.25 ÷ 2.5", a: ["4.9", "4.5", "5.1", "4.2"], c: 0, p: 5 }, [cite: 179, 358]
    { q: "ფასი შემცირდა 20%-ით და გახდა 640 ლარი. რა იყო საწყისი ფასი?", a: ["800 ლარი", "750 ლარი", "700 ლარი", "900 ლარი"], c: 0, p: 5 }, [cite: 216, 369]

    // რაუნდი 5: გეომეტრია და სტატისტიკა (5 ქულა) [cite: 217, 294]
    { q: "სამკუთხედის კუთხეებია 40° და 70°. იპოვეთ მესამე კუთხე:", a: ["70°", "80°", "60°", "90°"], c: 0, p: 5 }, [cite: 244, 371]
    { q: "მართკუთხედის გვერდებია 7 სმ და 5 სმ. რას უდრის ფართობი?", a: ["35 სმ²", "24 სმ²", "12 სმ²", "70 სმ²"], c: 0, p: 5 }, [cite: 252, 376]
    { q: "იპოვეთ 4, 7, 3, 8, 3 მონაცემების საშუალო არითმეტიკული:", a: ["5", "4", "6", "3"], c: 0, p: 5 }, [cite: 300]
    { q: "წრის რადიუსია 5 სმ. რას უდრის წრეწირის სიგრძე (π ≈ 3.14)?", a: ["31.4 სმ", "15.7 სმ", "62.8 სმ", "78.5 სმ"], c: 0, p: 5 }, [cite: 266, 382]
    { q: "კუბის გვერდია 4 სმ. რას უდრის მისი მოცულობა?", a: ["64 სმ³", "16 სმ³", "32 სმ³", "48 სმ³"], c: 0, p: 5 }, [cite: 289, 387]
    { q: "რას უდრის სამკუთხედის კუთხეების ჯამი?", a: ["180°", "360°", "90°", "270°"], c: 0, p: 5 }, [cite: 232]
    { q: "ოთხკუთხედის კუთხეების ჯამი არის:", a: ["360°", "180°", "540°", "90°"], c: 0, p: 5 }, [cite: 249]
    { q: "იპოვეთ მედიანა რიცხვებისთვის: 11, 12, 13, 14, 15", a: ["13", "12", "14", "11"], c: 0, p: 5 }, [cite: 309, 395]
    { q: "კამათლის გაგორებისას 3-იანის მოსვლის ალბათობაა:", a: ["1/6", "1/2", "1/3", "1/4"], c: 0, p: 5 }, [cite: 316]
    { q: "რა არის მოდა მონაცემებისთვის: 3, 3, 4, 7, 8?", a: ["3", "4", "7", "8"], c: 0, p: 5 } [cite: 305]
];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goToClasses() {
    userName = document.getElementById('user-name').value;
    if(!userName || userName.length < 2) return alert("გთხოვთ, შეიყვანოთ სახელი და გვარი!");
    showScreen('class-screen');
}

function startLevel(grade) {
    if(grade === 6) {
        showScreen('study-screen');
    } else {
        alert("მალე დაემატება!");
    }
}

function startQuizNow() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const q = questions6[currentQuestionIndex];
    const round = Math.floor(currentQuestionIndex / 10) + 1;
    
    document.getElementById('round-info').innerHTML = `რაუნდი: ${round}/5 | კითხვა: ${currentQuestionIndex + 1}/50 <span class="points-tag">${q.p} ქულა</span>`;
    document.getElementById('score-info').innerText = `ქულა: ${score}`;
    document.getElementById('question-text').innerText = q.q;
    
    const progress = ((currentQuestionIndex) / questions6.length) * 100;
    document.getElementById('progress-fill').style.width = progress + "%";

    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";
    
    q.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => {
            grid.style.pointerEvents = "none";
            if(index === q.c) {
                btn.classList.add('correct');
                score += q.p;
            } else {
                btn.classList.add('wrong');
                grid.children[q.c].classList.add('correct');
            }
            
            setTimeout(() => {
                currentQuestionIndex++;
                grid.style.pointerEvents = "auto";
                if(currentQuestionIndex < questions6.length) {
                    loadQuestion();
                } else {
                    showDiploma();
                }
            }, 1000);
        };
        grid.appendChild(btn);
    });
}

function showDiploma() {
    showScreen('finish-screen');
    const nameSpace = document.getElementById('final-name');
    const certBox = document.getElementById('cert-box');
    const certType = document.getElementById('cert-type');
    const finalScoreDisplay = document.getElementById('final-score');
    nameSpace.innerText = userName;
    
    if(score < 120) {
        certBox.className = "fail-box";
        certType.innerText = "❌ ტესტი ვერ ჩაბარდა";
        finalScoreDisplay.innerHTML = `<p style="color: #ff4444; font-size: 1.5rem;">როგორც ჩანს მასალა კარგად არ გადაიმეორე!</p><p>შენი ქულა: ${score} (საჭიროა მინიმუმ 120)</p>`;
    } else {
        if(score >= 180) { 
            certType.innerText = "🥇 ოქროს დიპლომი"; 
            certBox.className = "diploma gold-border"; 
        } else if(score >= 150) { 
            certType.innerText = "🥈 ვერცხლის დიპლომი"; 
            certBox.className = "diploma silver-border"; 
        } else { 
            certType.innerText = "🥉 ბრინჯაოს დიპლომი"; 
            certBox.className = "diploma bronze-border"; 
        }
        finalScoreDisplay.innerText = `დაგროვილი ქულა: ${score} / 200`;
    }
}
