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

const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    instructions.classList.add("hidden");
    quiz.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {

    const question = questions[currentQuestion];

    progressElement.textContent =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

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

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === question.answer) {

        score++;

        buttons[selectedIndex].classList.add("correct");

        feedbackElement.textContent = "✅ Correcto";

    } else {

        buttons[selectedIndex].classList.add("incorrect");

        buttons[question.answer].classList.add("correct");

        feedbackElement.textContent =
            `❌ Incorrecto. Respuesta correcta: ${question.options[question.answer]}`;
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }

});

function showResults() {

    quiz.classList.add("hidden");
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
        .addEventListener("click", () => location.reload());
}