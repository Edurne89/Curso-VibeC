const questions = [

    // MATERIAL SANITARIO (7)

    {
        question: "¿Qué material se utiliza para tomar la tensión arterial?",
        options: [
            "Fonendoscopio y esfingomanómetro",
            "Pulsioxímetro",
            "Glucómetro",
            "Termómetro"
        ],
        answer: 0
    },

    {
        question: "¿Para qué sirve una cánula de Guedel?",
        options: [
            "Inmovilizar extremidades",
            "Mantener la vía aérea permeable",
            "Administrar medicación",
            "Tomar la temperatura"
        ],
        answer: 1
    },

    {
        question: "¿Qué dispositivo mide la saturación de oxígeno?",
        options: [
            "Glucómetro",
            "Tensiómetro",
            "Pulsioxímetro",
            "DEA"
        ],
        answer: 2
    },

    {
        question: "¿Qué material permite inmovilizar una extremidad lesionada?",
        options: [
            "Férula",
            "Fonendoscopio",
            "Mascarilla",
            "Pulsioxímetro"
        ],
        answer: 0
    },

    {
        question: "¿Dónde deben desecharse las agujas usadas?",
        options: [
            "Papelera común",
            "Bolsa amarilla",
            "Contenedor de punzocortantes",
            "Contenedor de cartón"
        ],
        answer: 2
    },

    {
        question: "¿Qué mascarilla proporciona altas concentraciones de oxígeno?",
        options: [
            "Venturi",
            "Mascarilla con reservorio",
            "Quirúrgica",
            "FFP2"
        ],
        answer: 1,
    },

    {
        question: "¿Para qué se utiliza un DEA?",
        options: [
            "Monitorizar temperatura",
            "Tomar glucemia",
            "Desfibrilar",
            "Inmovilizar"
        ],
        answer: 2
    },

    // ATENCIÓN EXTRAHOSPITALARIA (7)

    {
        question: "¿Qué es el triaje?",
        options: [
            "Traslado al hospital",
            "Clasificación de pacientes",
            "Administración de medicación",
            "Limpieza de material"
        ],
        answer: 1
    },

    {
        question: "¿Qué se valora primero en la secuencia ABCDE?",
        options: [
            "Respiración",
            "Circulación",
            "Vía aérea",
            "Exposición"
        ],
        answer: 2
    },

    {
        question: "¿Cuál es el teléfono único europeo de emergencias?",
        options: [
            "061",
            "091",
            "112",
            "080"
        ],
        answer: 2
    },

    {
        question: "¿Qué posición favorece la respiración en un paciente consciente con disnea?",
        options: [
            "Trendelenburg",
            "Prono",
            "Semiincorporado",
            "PLS"
        ],
        answer: 2
    },

    {
        question: "¿Qué debe hacerse antes de acceder a una escena?",
        options: [
            "Tomar constantes",
            "Valorar la seguridad",
            "Aplicar oxígeno",
            "Mover al paciente"
        ],
        answer: 1
    },

    {
        question: "¿Qué significa la S en el método PAS?",
        options: [
            "Salir",
            "Socorrer",
            "Seguir",
            "Sanar"
        ],
        answer: 1
    },

    {
        question: "¿Qué documento recoge la atención prestada al paciente?",
        options: [
            "Hoja de ruta",
            "Informe asistencial",
            "Factura",
            "Prescripción médica"
        ],
        answer: 1
    },

    // PRIMEROS AUXILIOS (6)

    {
        question: "¿Cuál es la primera actuación ante una hemorragia externa?",
        options: [
            "Presión directa",
            "Torniquete inmediato",
            "Aplicar hielo",
            "Elevar piernas"
        ],
        answer: 0
    },

    {
        question: "¿Cuál es la profundidad recomendada de las compresiones en adultos?",
        options: [
            "1-2 cm",
            "3-4 cm",
            "5-6 cm",
            "8 cm"
        ],
        answer: 2
    },

    {
        question: "¿Qué posición se recomienda para una persona inconsciente que respira?",
        options: [
            "Fowler",
            "Trendelenburg",
            "Posición lateral de seguridad",
            "Sentada"
        ],
        answer: 2
    },

    {
        question: "¿Qué debe hacerse ante una quemadura leve?",
        options: [
            "Aplicar hielo",
            "Romper ampollas",
            "Aplicar agua fresca",
            "Cubrir con algodón"
        ],
        answer: 2
    },

    {
        question: "¿Qué signo indica un atragantamiento grave?",
        options: [
            "Tos eficaz",
            "Habla normal",
            "Incapacidad para hablar",
            "Risa"
        ],
        answer: 2
    },

    {
        question: "¿Qué síntoma es frecuente en un esguince?",
        options: [
            "Parada respiratoria",
            "Dolor e inflamación",
            "Pérdida de visión",
            "Convulsiones"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let lastAnswerCorrect = false;

const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const progressBarWrapper = document.getElementById("progress-bar-wrapper");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const progressAmbulance = document.getElementById("progress-ambulance");
const timerElement = document.getElementById("timer");

// Timer: 14 minutes (in seconds)
const TIMER_DURATION = 14 * 60;
let timerRemaining = TIMER_DURATION;
let timerInterval = null;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    instructions.classList.add("hidden");
    quiz.classList.remove("hidden");
    progressBarWrapper.classList.remove("hidden");
    progressLabel.classList.remove("hidden");
    // iniciar temporizador y pregunta
    resetTimer();
    startTimer();
    showQuestion();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRemaining = TIMER_DURATION;
    if (timerElement) {
        timerElement.textContent = formatTime(timerRemaining);
        timerElement.classList.remove('hidden');
    }
}

function startTimer() {
    if (!timerElement) return;
    clearInterval(timerInterval);
    timerElement.classList.remove('hidden');
    timerInterval = setInterval(() => {
        timerRemaining--;
        if (timerRemaining < 0) {
            clearInterval(timerInterval);
            timeExpired();
            return;
        }
        timerElement.textContent = formatTime(timerRemaining);
        // aviso a 2 minutos
        if (timerRemaining === 120) {
            triggerTwoMinuteWarning();
        }
    }, 1000);
}

function triggerTwoMinuteWarning() {
    if (!timerElement) return;
    timerElement.classList.add('warn');
    // add visual warning beneath timer if not present
    if (!document.getElementById('time-warning')) {
        const warn = document.createElement('div');
        warn.id = 'time-warning';
        warn.className = 'time-warning';
        warn.setAttribute('role', 'alert');
        warn.textContent = 'Quedan 2 minutos';
        // insert after timer
        timerElement.parentNode.insertBefore(warn, progressBarWrapper);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    if (timerElement) timerElement.classList.add('hidden');
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function timeExpired() {
    // detener y mostrar mensaje de fracaso
    stopTimer();
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(b => b.disabled = true);
    nextBtn.classList.add('hidden');

    quiz.classList.add('hidden');
    progressBarWrapper.classList.add('hidden');
    progressLabel.classList.add('hidden');

    resultElement.classList.remove('hidden');
    resultElement.innerHTML = `
        <h2>Tiempo agotado</h2>
        <p>⛑️ No has llegado al hospital — vuelve a intentarlo.</p>
        <button id="restart-btn">Reiniciar actividad</button>
    `;

    document.getElementById('restart-btn').addEventListener('click', () => resetActivity());
}

function resetActivity() {
    // stop timer and clear intervals
    stopTimer();
    clearInterval(timerInterval);

    // reset state
    currentQuestion = 0;
    score = 0;
    lastAnswerCorrect = false;

    // reset UI
    progressFill.style.width = `0%`;
    progressAmbulance.style.left = `0%`;
    feedbackElement.textContent = '';
    answersElement.innerHTML = '';

    // hide quiz/result and show instructions
    quiz.classList.add('hidden');
    resultElement.classList.add('hidden');
    instructions.classList.remove('hidden');

    // hide progress and timer
    progressBarWrapper.classList.add('hidden');
    progressLabel.classList.add('hidden');
    if (timerElement) {
        timerElement.classList.add('hidden');
        timerElement.classList.remove('warn');
        timerElement.textContent = formatTime(TIMER_DURATION);
    }

    // remove any time warning element
    const warn = document.getElementById('time-warning');
    if (warn && warn.parentNode) warn.parentNode.removeChild(warn);
}

function showQuestion() {

    const question = questions[currentQuestion];

    const totalQuestions = questions.length;
    const progressPercent = totalQuestions > 1
        ? (currentQuestion / (totalQuestions - 1)) * 100
        : 0;

    progressLabel.textContent = `Pregunta ${currentQuestion + 1} de ${totalQuestions}`;
    progressFill.style.width = `${progressPercent}%`;
    progressAmbulance.style.left = `${progressPercent}%`;

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    nextBtn.classList.add("hidden");

    const letters = ["A", "B", "C", "D"];

    question.options.forEach((option, index) => {

        const button = document.createElement("button");
        button.classList.add("answer-btn", `option-${letters[index].toLowerCase()}`);
        button.innerHTML = `<span class="option-letter">${letters[index]}</span><span>${option}</span>`;

        button.addEventListener("click", () => selectAnswer(index));

        answersElement.appendChild(button);

    });
}

function selectAnswer(selectedIndex) {

    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");

    if (selectedIndex === question.answer) {
        score++;
        lastAnswerCorrect = true;
        buttons.forEach(btn => btn.disabled = true);
        buttons[selectedIndex].classList.add("correct");
        feedbackElement.textContent = "✅ Correcto";
        nextBtn.textContent = "Siguiente pregunta";
        nextBtn.classList.remove("hidden");
    } else {
        lastAnswerCorrect = false;
        buttons[selectedIndex].classList.add("incorrect");
        feedbackElement.textContent = "❌ Incorrecto. Vuelve a intentarlo.";
        nextBtn.classList.add("hidden");
    }
}

nextBtn.addEventListener("click", () => {
    if (!lastAnswerCorrect) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {

    stopTimer();
    quiz.classList.add("hidden");
    progressBarWrapper.classList.add("hidden");
    progressLabel.classList.add("hidden");
    resultElement.classList.remove("hidden");

    let message = "";

    if (score >= 18) {
        message = "🏆 Excelente repaso.";
    } else if (score >= 14) {
        message = "✅ Buen trabajo.";
    } else if (score >= 10) {
        message = "📚 Repaso aceptable, pero conviene reforzar contenidos.";
    } else {
        message = "⚠️ Se recomienda revisar los contenidos de primer curso.";
    }

    resultElement.innerHTML = `
        <h2>Resultado final</h2>
        <p><strong>${score} de ${questions.length} respuestas correctas</strong></p>
        <p>${message}</p>
        <button id="restart-btn">Repetir actividad</button>
    `;

    document
        .getElementById("restart-btn")
        .addEventListener("click", () => resetActivity());
}