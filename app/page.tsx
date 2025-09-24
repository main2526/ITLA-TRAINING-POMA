"use client";
import React, { useState, useEffect } from "react";
import { quizData } from "@/components/Questions";

// --- Componente Principal de la App ---
export default function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'quiz', 'results'
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

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
    <main className="bg-slate-900 text-white min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-2xl mx-auto">{renderContent()}</div>
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
        Respondiste correctamente a {correctAnswers} de {totalQuestions} preguntas.
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
