"use client";
import React, { useState, useEffect } from "react";
import { quizData } from "@/components/Questions";
import Image from "next/image";
import { motion } from "framer-motion";
// --- Componente Principal de la App ---
export default function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'quiz', 'results'
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCreator, setShowCreator] = useState(false); // <-- estado para popup

  const handleStart = (): void => {
    setGameState("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
  };

  const handleAnswerSelect = (optionIndex: number): void => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = (): void => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = (): void => {
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round(
      100 + (correctAnswers / quizData.length) * 900
    );
    setScore(finalScore);
    setGameState("results");
  };

  const renderContent = () => {
    switch (gameState) {
      case "quiz":
        return (
          <QuizView
            currentQuestion={quizData[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizData.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={calculateScore}
            onJump={(idx) => setCurrentQuestionIndex(idx)} // <-- nuevo prop
          />
        );
      case "results":
        return (
          <ResultsView
            score={score}
            totalQuestions={quizData.length}
            correctAnswers={Math.round(((score - 100) / 900) * quizData.length)}
            onRestart={handleStart}
            answers={answers}
          />
        );
      case "start":
      default:
        return <StartView onStart={handleStart} />;
    }
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex items-center justify-center font-sans p-4 relative">
      <div className="w-full max-w-2xl mx-auto">{renderContent()}</div>
      {/* Botón Creador flotante, arriba en mobile, abajo en desktop */}
      <button
        onClick={() => setShowCreator(true)}
        className="fixed right-4 top-2  md:right-4 bg-gradient-to-r from-cyan-400 mb-40 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50 text-sm md:py-3 md:px-6 md:text-base"
        style={{ boxShadow: "0 4px 24px 0 rgba(56,189,248,0.3)" }}
      >
        Creator
      </button>
      {/* Modal Creador */}
      {showCreator && (
        <div
          className="fixed  inset-0 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-2"
          onClick={() => setShowCreator(false)}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "keyframes", stiffness: 60, damping: 18 }}
            className="bg-slate-800 rounded-2xl shadow-2xl m-2 p-4 md:p-8 text-center border-4 border-cyan-400 flex flex-col items-center w-full max-w-xs md:max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón X para cerrar dentro del popup */}
            <button
              onClick={() => setShowCreator(false)}
              className="absolute top-2 right-4 text-cyan-400 hover:text-cyan-300 text-4xl md:text-4xl font-bold focus:outline-none"
              aria-label="Cerrar"
              style={{ zIndex: 10 }}
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-4 animate-glow-horizontal">
              Creator
            </h2>
            <Image
              src="/creator.jpg"
              alt="Foto del creador"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-cyan-300 shadow-lg mb-2 md:mb-4 animate-fade-in"
              width={128}
              height={128}
            />
            <p className="text-lg md:text-xl text-white font-semibold mb-2 animate-fade-in">
              Developed by{" "}
              <span className="text-cyan-300 font-bold animate-pulse">
                BootsDev-X
              </span>
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-2 md:mb-4 w-full items-center justify-center">
              <a
                href="https://www.youtube.com/@BootsDev-X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 w-full justify-center md:w-auto"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.136 3.5 12 3.5 12 3.5s-7.136 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.436 0 12 0 12s0 3.564.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.864 20.5 12 20.5 12 20.5s7.136 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.564 24 12 24 12s0-3.564-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </a>
              <a
                href="https://github.com/main2526"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black gap-2 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 w-full justify-center md:w-auto"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.751 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
            <p className="text-slate-400 mb-2 md:mb-4 animate-fade-in text-sm md:text-base">
              ¡Esta app está hecha con el fin de que practiques y aprendas, para
              que logres pasar el examen POMA del ITLA! 🚀
            </p>
          </motion.div>
        </div>
      )}
    </main>
  );
}

// --- Componentes de Vistas ---

const StartView = ({ onStart }: { onStart: any }) => (
  <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl text-center animate-fade-in">
    <h1 className="text-4xl font-bold text-cyan-400 mb-4">
      Examen de Práctica POMA
    </h1>
    <p className="text-slate-300 mb-8 text-lg">
      Pon a prueba tus habilidades con estas preguntas de práctica. Tu
      puntuación se calculará en una escala de 100 a 1000.
    </p>
    <button
      onClick={onStart}
      className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
    >
      Comenzar Examen
    </button>
  </div>
);

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
  answers: { [key: number]: number };
}

const ResultsView = ({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
  answers,
}: ResultsViewProps) => {
  // Encuentra las preguntas falladas
  const failedQuestions = quizData
    .map((q, idx) => ({
      ...q,
      userAnswer: answers[idx],
      index: idx,
    }))
    .filter((q) => q.userAnswer !== undefined && q.userAnswer !== q.answer);

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-100 mb-4">
        Resultados Finales
      </h2>
      <p className="text-slate-300 mb-6 text-lg">
        Respondiste correctamente a {correctAnswers} de {totalQuestions}{" "}
        preguntas.
      </p>
      <div className="mb-8">
        <p className="text-lg text-slate-400">Tu puntuación es:</p>
        <p className="text-7xl font-bold text-cyan-400 my-2">{score}</p>
        <p className="text-sm text-slate-500">(en una escala de 100 a 1000)</p>
      </div>
      {failedQuestions.length > 0 && (
        <div className="bg-slate-900/80 rounded-xl p-6 mt-8 shadow-lg border border-cyan-700">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Preguntas para repasar
          </h3>
          <ul className="space-y-6 text-left">
            {failedQuestions.map((q) => (
              <li
                key={q.index}
                className="p-4 rounded-lg bg-slate-800 border-l-4 border-red-400"
              >
                <div className="font-semibold text-slate-100 mb-2">
                  {q.index + 1}. {q.question}
                </div>
                <div className="mb-1 text-slate-400">
                  Tu respuesta:{" "}
                  <span className="font-bold text-red-400">
                    {q.options[q.userAnswer]}
                  </span>
                </div>
                <div className="mb-1 text-slate-400">
                  Solución correcta:{" "}
                  <span className="font-bold text-cyan-400">
                    {q.options[q.answer]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={onRestart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg mt-8"
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface QuizViewProps {
  currentQuestion: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onAnswerSelect: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onJump: (index: number) => void; // <-- nuevo prop
}

const QuizView = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrev,
  onSubmit,
  onJump,
}: QuizViewProps) => {
  const [showHint, setShowHint] = useState(false);
  const [jumpTo, setJumpTo] = useState(""); // <-- nuevo estado
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full animate-fade-in">
      {/* Encabezado y Barra de Progreso */}
      <div className="mb-6">
        <p className="text-cyan-400 font-semibold text-lg">
          Pregunta {questionIndex + 1} de {totalQuestions}
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2">
          <div
            className="bg-cyan-500 h-2.5 rounded-full"
            style={{
              width: `${progress}%`,
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>

      {/* Saltar a pregunta */}
      <div className="flex items-center justify-center mb-4 gap-2">
        <input
          type="number"
          min={1}
          max={totalQuestions}
          value={jumpTo}
          onChange={(e) => setJumpTo(e.target.value)}
          className="w-20 p-2 rounded-lg border border-cyan-400 bg-slate-900 text-white text-center"
          placeholder="N°"
        />
        <button
          onClick={() => {
            const num = parseInt(jumpTo, 10);
            if (!isNaN(num) && num >= 1 && num <= totalQuestions) {
              onJump(num - 1);
              setJumpTo("");
            }
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Ir
        </button>
      </div>

      {/* Pregunta */}
      <h2 className="text-xl md:text-2xl font-semibold text-slate-100 mb-6 min-h-[6rem] flex items-center">
        {currentQuestion.question}
      </h2>

      {/* Opciones */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? "bg-cyan-500 border-cyan-400 text-white shadow-md"
                    : "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-500"
                }
              `}
            >
              <span className="font-bold mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Botón de sugerencia y varita mágica */}
      <div className="flex flex-col items-center mt-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className={`bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-4 flex items-center gap-2 ${
            showHint ? "opacity-80" : ""
          }`}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className={
              showHint ? "animate-spin-slow-reverse" : "animate-spin-slow"
            }
          >
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {showHint ? "Ocultar sugerencia" : "Mostrar sugerencia"}
        </button>
        {showHint && (
          <div className="w-full flex flex-row items-center justify-center animate-fade-in">
            <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 shadow-xl border-2 border-blue-300 animate-glow-horizontal">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-wand"
              >
                <path
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-4xl font-extrabold text-white drop-shadow-lg  ">
                Respuesta mágica:
              </span>
              <span className="text-6xl font-black text-cyan-200 ">
                {currentQuestion.answer + 1}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        {questionIndex === totalQuestions - 1 ? (
          <button
            onClick={onSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

