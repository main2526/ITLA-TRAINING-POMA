"use client";
import React, { useState, useEffect } from "react";
import { quizData } from "@/components/Questions";
import Image from "next/image";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";

// --- Íconos para la UI (Componentes SVG) ---
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
      clipRule="evenodd"
    />
  </svg>
);

const RestartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M11.828 2.25c-3.535 0-6.436 2.636-6.892 6.012A.75.75 0 014.19 7.5h1.16a.75.75 0 01.742.622A4.502 4.502 0 0110.5 4.5a4.5 4.5 0 014.5 4.5c0 2.343-1.83 4.26-4.156 4.473a.75.75 0 01-.65-.74V11.25a.75.75 0 01.75-.75h.001c.414 0 .75.336.75.75v.001a2.996 2.996 0 002.995-2.887 3 3 0 00-3-3.001H10.5A6 6 0 004.5 9c0 3.212 2.52 5.85 5.72 5.994A.75.75 0 0111 15.75v1.494a.75.75 0 01-.75.75h-.001a.75.75 0 01-.75-.75v-.001a4.484 4.484 0 00-4.43-4.382A4.5 4.5 0 001.5 12a4.5 4.5 0 014.352-4.487A.75.75 0 016.6 6.892a6.002 6.002 0 005.228-10.355.75.75 0 01.992.428l.338 1.013a.75.75 0 01-.428.992l-1.013.338a.75.75 0 01-.992-.428 4.502 4.502 0 01-2.904 7.642.75.75 0 01-.743-.623h-1.16a.75.75 0 01-.742-.622A6.002 6.002 0 0010.5 18a6 6 0 006-6c0-3.212-2.52-5.85-5.72-5.994A.75.75 0 0110 5.25V3.756a.75.75 0 011.088-.676l1.242.717a.75.75 0 010 1.352l-1.242.717A.75.75 0 0110 5.25v-.001H9a4.502 4.502 0 00-4.156 2.873.75.75 0 01-1.3-.746A6.002 6.002 0 019 3.75c.995 0 1.93.242 2.762.668A.75.75 0 0111.828 2.25z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Componente Principal de la App ---
export default function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'quiz', 'results'
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCreator, setShowCreator] = useState(false);

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
            key="quiz"
            currentQuestion={quizData[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizData.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={calculateScore}
            onJump={(idx) => setCurrentQuestionIndex(idx)}
          />
        );
      case "results":
        return (
          <ResultsView
            key="results"
            score={score}
            totalQuestions={quizData.length}
            correctAnswers={Math.round(((score - 100) / 900) * quizData.length)}
            onRestart={handleStart}
            answers={answers}
          />
        );
      case "start":
      default:
        return <StartView key="start" onStart={handleStart} />;
    }
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex items-center justify-center font-sans p-4 relative overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black z-0"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>

      <div className="w-full max-w-2xl mx-auto z-10">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>

      {/* Botón Creador */}
      <motion.button
        onClick={() => setShowCreator(true)}
        className="fixed right-4 top-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50 text-sm md:py-3 md:px-6 md:text-base"
        style={{ boxShadow: "0 4px 24px 0 rgba(56,189,248,0.3)" }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        Credits
      </motion.button>

      {/* Modal Creador */}
      <AnimatePresence>
        {showCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreator(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-cyan-400/50 flex flex-col items-center w-full max-w-sm md:max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCreator(false)}
                className="absolute top-2 right-4 text-cyan-400 hover:text-cyan-300 text-5xl font-bold focus:outline-none"
                aria-label="Cerrar"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-cyan-400 mb-4 animate-glow">
                جوهاني أ. رودريغيز
              </h2>
              <Image
                src="/creator.jpg"
                alt="Foto del creador"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-cyan-300 shadow-lg mb-4"
                width={128}
                height={128}
              />
              <p className="text-xl text-white font-semibold mb-3">
                Developed by{" "}
                <span className="text-cyan-300 font-bold animate-pulse">
                  BootsDev-X
                </span>
              </p>
              <div className="flex flex-col md:flex-row gap-3 mb-4 w-full items-center justify-center">
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
                  >
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.136 3.5 12 3.5 12 3.5s-7.136 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.436 0 12 0 12s0 3.564.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.864 20.5 12 20.5 12 20.5s7.136 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.564 24 12 24 12s0-3.564-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
                <a
                  href="https://github.com/main2526"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-900 gap-2 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105 w-full justify-center md:w-auto"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.751 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </div>
              <p className="text-slate-400 text-sm md:text-base">
                ¡Esta app está hecha con el fin de que practiques y aprendas,
                para que logres pasar el examen POMA del ITLA! 🚀
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- Componentes de Vistas ---

const viewVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: easeIn } },
};

const StartView = ({ onStart }: { onStart: () => void }) => (
  <motion.div
    variants={viewVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center border border-slate-700"
  >
    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-glow">
      Examen de Práctica POMA
    </h1>
    <p className="text-slate-300 mb-8 text-lg">
      Pon a prueba tus habilidades. Tu puntuación se calculará en una escala de
      100 a 1000.
    </p>
    <motion.button
      onClick={onStart}
      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      Comenzar Examen
    </motion.button>
  </motion.div>
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
  const failedQuestions = quizData
    .map((q, idx) => ({ ...q, userAnswer: answers[idx], index: idx }))
    .filter((q) => q.userAnswer !== undefined && q.userAnswer !== q.answer);

  const percentage = (correctAnswers / totalQuestions) * 100;

  return (
    <motion.div
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl text-center border border-slate-700"
    >
      <h2 className="text-3xl font-bold text-slate-100 mb-4">
        Resultados Finales
      </h2>

      <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto my-6 flex items-center justify-center">
        <svg
          className="absolute w-full h-full transform -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#score-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 339 }}
            animate={{ strokeDashoffset: 339 - (339 * percentage) / 100 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            strokeDasharray="339"
          />
          <defs>
            <linearGradient id="score-gradient">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl font-bold text-cyan-400">
            {score}
          </span>
          <span className="text-sm text-slate-400">Puntuación</span>
        </div>
      </div>

      <p className="text-slate-300 mb-8 text-lg">
        Respondiste correctamente a <strong>{correctAnswers}</strong> de{" "}
        <strong>{totalQuestions}</strong> preguntas.
      </p>

      {failedQuestions.length > 0 && (
        <div className="bg-slate-900/80 rounded-xl p-4 md:p-6 mt-8 shadow-inner border border-slate-700">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">
            Preguntas para repasar
          </h3>
          <ul className="space-y-4 text-left">
            {failedQuestions.map((q) => (
              <li
                key={q.index}
                className="p-4 rounded-lg bg-slate-800 border border-slate-700"
              >
                <p className="font-semibold text-slate-100 mb-3">
                  {q.index + 1}. {q.question}
                </p>
                <div className="text-sm text-slate-300 border-t border-slate-700 pt-2 space-y-2">
                  <p>
                    Tu respuesta:{" "}
                    <span className="font-bold text-red-400">
                      ❌ {q.options[q.userAnswer]}
                    </span>
                  </p>
                  <p>
                    Solución:{" "}
                    <span className="font-bold text-green-400">
                      ✅ {q.options[q.answer]}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <motion.button
        onClick={onRestart}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg mt-8 inline-flex items-center gap-2"
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.5)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <RestartIcon className="w-5 h-5" />
        Intentar de Nuevo
      </motion.button>
    </motion.div>
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
  onJump: (index: number) => void;
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
  const [jumpValue, setJumpValue] = useState("");
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  // Ocultar la pista al cambiar de pregunta
  useEffect(() => {
    setShowHint(false);
  }, [questionIndex]);

  // Función para manejar el salto
  const handleJump = () => {
    const num = parseInt(jumpValue);
    if (!isNaN(num) && num >= 1 && num <= totalQuestions) {
      onJump(num - 1);
      setJumpValue("");
    }
  };

  return (
    <motion.div
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl w-full border border-slate-700"
    >
      {/* Buscador para saltar preguntas */}
      <div className="mb-4 flex items-center gap-2 justify-end">
        <input
          type="number"
          min={1}
          max={totalQuestions}
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={` (1-${totalQuestions})`}
          className="w-32 px-3 py-2 rounded-lg border border-cyan-400 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
        />
        <motion.button
          onClick={handleJump}
          disabled={
            jumpValue === "" ||
            isNaN(parseInt(jumpValue)) ||
            parseInt(jumpValue) < 1 ||
            parseInt(jumpValue) > totalQuestions
          }
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Ir
        </motion.button>
      </div>

      <div className="mb-6">
        <p className="text-cyan-400 font-semibold text-lg">
          Pregunta {questionIndex + 1} de {totalQuestions}
        </p>
        <div className="w-full bg-slate-700 rounded-full h-3.5 mt-2 shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.h2
          key={questionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-xl md:text-2xl font-semibold text-slate-100 mb-6 min-h-[6rem] flex items-center justify-center text-center"
        >
          {currentQuestion.question}
        </motion.h2>
      </AnimatePresence>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <motion.button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 text-base ${
                isSelected
                  ? "bg-cyan-500 border-cyan-400 text-white shadow-md "
                  : "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-500"
              }`}
            >
              <span className="font-bold mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setShowHint(!showHint)}
          className="bg-slate-700 hover:bg-slate-600 text-cyan-300 font-bold py-2 px-6 rounded-full shadow-lg flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span role="img" aria-label="light-bulb">
            💡
          </span>
          {showHint ? "Ocultar Pista" : "Mostrar Pista"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -20,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className="mt-4 text-center overflow-hidden"
          >
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shadow-lg">
              <p className="font-bold text-lg text-white">
                <span className="text-cyan-300 mr-2">Sugerencia Mágica:</span>
                {currentQuestion.options[currentQuestion.answer]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
          whileHover={{ scale: questionIndex === 0 ? 1 : 1.1 }}
          whileTap={{ scale: questionIndex === 0 ? 1 : 0.9 }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Anterior
        </motion.button>
        {questionIndex === totalQuestions - 1 ? (
          <motion.button
            onClick={onSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 15px rgba(34, 197, 94, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            Finalizar
          </motion.button>
        ) : (
          <motion.button
            onClick={onNext}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform inline-flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Siguiente
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
