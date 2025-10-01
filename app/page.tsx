"use client";
import { useState, useEffect, useMemo } from "react";
import { quizData } from "@/components/Questions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Componente Principal de la App ---
export default function App() {
  const [gameState, setGameState] = useState("start");
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCreator, setShowCreator] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [shuffledQuiz, setShuffledQuiz] = useState(quizData);

  // Función para mezclar preguntas
  function shuffleArray(array: any[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleStart = (): void => {
    setGameState("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setShuffledQuiz(shuffleArray(quizData)); // Mezclar preguntas al iniciar
  };

  const handleAnswerSelect = (optionIndex: number): void => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: optionIndex,
    });
    if (autoNext && currentQuestionIndex < quizData.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300); // Breve pausa para feedback visual
    }
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
    shuffledQuiz.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round(
      100 + (correctAnswers / shuffledQuiz.length) * 900
    );
    setScore(finalScore);
    setGameState("results");
  };

  const renderContent = () => {
    switch (gameState) {
      case "quiz":
        return (
          <QuizView
            currentQuestion={shuffledQuiz[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={shuffledQuiz.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={calculateScore}
            onJump={(idx) => setCurrentQuestionIndex(idx)}
            autoNext={autoNext}
            setAutoNext={setAutoNext}
          />
        );
      case "results":
        return (
          <ResultsView
            score={score}
            totalQuestions={shuffledQuiz.length}
            correctAnswers={Math.round(((score - 100) / 900) * shuffledQuiz.length)}
            onRestart={handleStart}
            answers={answers}
            questions={shuffledQuiz}
          />
        );
      case "start":
      default:
        return <StartView onStart={handleStart} />;
    }
  };

  return (
    <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white min-h-screen flex items-center justify-center font-sans p-3 sm:p-4 md:p-6 relative overflow-x-hidden">
      <ParticlesBackground />
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {renderContent()}
        {/* Botón Creator solo visible en mobile */}
        <button
          onClick={() => setShowCreator(true)}
          className="block sm:hidden mt-6 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-5 rounded-full shadow-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ boxShadow: "0 8px 32px 0 rgba(56,189,248,0.4)" }}
          aria-label="Ver información del creador"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Credits
          </span>
        </button>
      </div>

      {/* Botón Creator solo visible en desktop/tablet */}
      <button
        onClick={() => setShowCreator(true)}
        className="hidden sm:block fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-full shadow-xl z-50 text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{ boxShadow: "0 8px 32px 0 rgba(56,189,248,0.4)" }}
        aria-label="Ver información del creador"
      >
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          Credits
        </span>
      </button>

      <AnimatePresence>
        {showCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setShowCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 text-center border-2 border-cyan-400/50 flex flex-col items-center w-full max-w-sm md:max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCreator(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-cyan-400 hover:text-cyan-300 text-3xl sm:text-4xl font-bold focus:outline-none transition-colors"
                aria-label="Cerrar"
              >
                &times;
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold  mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                جوهاني أنطونيو رودريغيز
              </h2>

              <div className="relative mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"></div>
                <Image
                  src="/creator.jpg"
                  alt="Foto del creador"
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                  width={128}
                  height={128}
                />
              </div>

              <p className="text-base sm:text-lg md:text-xl text-white font-semibold mb-3 sm:mb-4">
                Developed by{" "}
                <span className="text-cyan-300 font-bold">BootsDev-X</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 w-full">
                <a
                  href="https://www.youtube.com/@BootsDev-X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 w-full sm:flex-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white flex-shrink-0"
                  >
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.136 3.5 12 3.5 12 3.5s-7.136 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.436 0 12 0 12s0 3.564.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.864 20.5 12 20.5 12 20.5s7.136 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.564 24 12 24 12s0-3.564-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-sm sm:text-base">YouTube</span>
                </a>
                <a
                  href="https://github.com/main2526"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 w-full sm:flex-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white flex-shrink-0"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.751 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                  </svg>
                  <span className="text-sm sm:text-base">GitHub</span>
                </a>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed px-2">
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

// --- Animación de partículas de fondo ---
const PARTICLE_COUNT = 18;
const PARTICLE_COLORS = [
  "rgba(56,189,248,0.18)", // cyan
  "rgba(99,102,241,0.15)", // indigo
  "rgba(139,92,246,0.13)", // violet
  "rgba(59,130,246,0.15)", // blue
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    const generated = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const size = randomBetween(24, 64);
      const left = randomBetween(0, 100);
      const delay = randomBetween(0, 3);
      const duration = randomBetween(7, 14);
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      return { size, left, delay, duration, color, key: i };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.key}
          initial={{ y: "100vh", opacity: 0.7 }}
          animate={{ y: "-10vh", opacity: 0.2 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            borderRadius: "20%",
            background: p.color,
            filter: "blur(3px)",
          }}
        />
      ))}
    </div>
  );
};

// --- Componentes de Vistas ---

const StartView = ({ onStart }: { onStart: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center border border-cyan-500/20"
  >
    <div className="mb-6 sm:mb-8">
      <div className="inline-block p-3 sm:p-4 bg-cyan-500/10 rounded-full mb-4">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 sm:mb-4 leading-tight">
        Examen de Práctica POMA
      </h1>
    </div>
    <p className="text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto px-2">
      Pon a prueba tus habilidades con estas preguntas de práctica. Tu
      puntuación se calculará en una escala de 100 a 1000.
    </p>
    <button
      onClick={onStart}
      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
    >
      Comenzar Examen
    </button>
  </motion.div>
);

interface ResultsViewProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
  answers: { [key: number]: number };
  questions: any[]; // Agregado para recibir las preguntas
}

const ResultsView = ({
  score,
  totalQuestions,
  correctAnswers,
  onRestart,
  answers,
  questions, // Recibiendo las preguntas
}: ResultsViewProps) => {
  const failedQuestions = questions
    .map((q, idx) => ({
      ...q,
      userAnswer: answers[idx],
      index: idx,
    }))
    .filter((q) => q.userAnswer !== undefined && q.userAnswer !== q.answer);

  const percentage = (correctAnswers / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl text-center border border-cyan-500/20"
    >
      <div className="mb-6 sm:mb-8">
        <div className="inline-block p-3 sm:p-4 bg-cyan-500/10 rounded-full mb-4">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          Resultados Finales
        </h2>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-cyan-500/20">
        <p className="text-slate-300 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
          Respondiste correctamente a{" "}
          <span className="font-bold text-cyan-400">{correctAnswers}</span> de{" "}
          <span className="font-bold text-cyan-400">{totalQuestions}</span>{" "}
          preguntas
          <span className="block mt-2 text-xs sm:text-sm text-slate-400">
            ({percentage.toFixed(1)}% de aciertos)
          </span>
        </p>

        <div className="mb-4 sm:mb-6">
          <p className="text-base sm:text-lg text-slate-400 mb-2">
            Tu puntuación es:
          </p>
          <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 my-2 sm:my-3">
            {score}
          </p>
          <p className="text-xs sm:text-sm text-slate-500">
            (en una escala de 100 a 1000)
          </p>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-3 sm:h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </div>
      </div>

      {failedQuestions.length > 0 && (
        <div className="bg-slate-900/80 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 shadow-lg border border-red-400/30">
          <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-3 sm:mb-4 flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Preguntas para repasar
          </h3>
          <div className="space-y-3 sm:space-y-4 text-left max-h-96 overflow-y-auto pr-2">
            {failedQuestions.map((q) => (
              <div
                key={q.index}
                className="p-3 sm:p-4 rounded-lg bg-slate-800/80 border-l-4 border-red-400 hover:bg-slate-800 transition-colors"
              >
                <div className="font-semibold text-slate-100 mb-2 text-sm sm:text-base leading-relaxed">
                  <span className="text-cyan-400 mr-2">{q.index + 1}.</span>
                  {q.question}
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="text-slate-400">
                    Tu respuesta:{" "}
                    <span className="font-bold text-red-400">
                      {q.options[q.userAnswer]}
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Solución correcta:{" "}
                    <span className="font-bold text-cyan-400">
                      {q.options[q.answer]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl w-full sm:w-auto"
      >
        Intentar de Nuevo
      </button>
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
  autoNext: boolean;
  setAutoNext: React.Dispatch<React.SetStateAction<boolean>>;
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
  autoNext,
  setAutoNext,
}: QuizViewProps) => {
  const [showHint, setShowHint] = useState(false);
  const [jumpTo, setJumpTo] = useState("");
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full border border-cyan-500/20"
    >
      {/* MODO DE AVANCE AUTOMÁTICO/MANUAL */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={autoNext}
          onChange={() => setAutoNext((v) => !v)}
          id="autoNextMode"
        />
        <label
          htmlFor="autoNextMode"
          className="text-cyan-300 text-sm font-semibold cursor-pointer"
        >
          Avanzar automáticamente al seleccionar respuesta
        </label>
      </div>

      <div className="mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <p className="text-cyan-400 font-semibold text-base sm:text-lg">
            Pregunta {questionIndex + 1} de {totalQuestions}
          </p>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={totalQuestions}
              value={jumpTo}
              onChange={(e) => setJumpTo(e.target.value)}
              className="w-16 sm:w-20 p-2 rounded-lg border-2 border-cyan-400/50 bg-slate-900 text-white text-center text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="N°"
            />
            <button
              onClick={() => {
                const num = Number.parseInt(jumpTo, 10);
                if (!isNaN(num) && num >= 1 && num <= totalQuestions) {
                  onJump(num - 1);
                  setJumpTo("");
                }
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm"
            >
              Ir
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-5 sm:mb-6 bg-slate-900/50 rounded-xl p-4 sm:p-5 border border-cyan-500/10"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-relaxed">
          {currentQuestion.question}
        </h2>
      </motion.div>

      <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          return (
            <motion.button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`
                w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200
                ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-cyan-500/50 text-slate-100"
                }
              `}
            >
              <span className="font-bold mr-2 sm:mr-3 text-sm sm:text-base">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-sm sm:text-base leading-relaxed">
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-col items-center mb-5 sm:mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 hover:from-blue-600 hover:via-cyan-500 hover:to-blue-500 text-white font-bold py-2.5 px-5 sm:px-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={showHint ? "animate-spin" : ""}
          >
            <path
              d="M12 8v4l2 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {showHint ? "Ocultar sugerencia" : "Mostrar sugerencia"}
        </button>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-4"
            >
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-r from-cyan-500/80 to-blue-500/80 shadow-xl border-2 border-cyan-300">
                <span className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-white">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-cyan-200"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      fill="#0ea5e9"
                    />
                    <path
                      d="M12 8v4l2 2"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Sugerencia rápida
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-100 drop-shadow-lg bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Opción {currentQuestion.answer + 1}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center gap-2 sm:gap-4">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base flex-1 sm:flex-initial"
        >
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">←</span>
        </button>
        {/* Solo mostrar Siguiente si autoNext está desactivado */}
        {!autoNext && questionIndex !== totalQuestions - 1 && (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base flex-1 sm:flex-initial"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <span className="sm:hidden">→</span>
          </button>
        )}
        {questionIndex === totalQuestions - 1 && (
          <button
            onClick={onSubmit}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base flex-1 sm:flex-initial"
          >
            Finalizar
          </button>
        )}
      </div>
    </motion.div>
  );
};
