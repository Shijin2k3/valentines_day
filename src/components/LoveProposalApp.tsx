import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Heart,
  Mail, MailOpen,
  Music,
  RefreshCw,
  Send,
  Sparkles, Stars,
  Sun,
  Moon
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Stage = 'envelope' | 'proposal' | 'accepted';

const LoveProposalApp = () => {
  const [stage, setStage] = useState<Stage>('envelope');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // System theme detection
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * 200; // Reduced range for mobile safety
    const y = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
    setYesButtonSize(prev => Math.min(prev + 0.15, 2.5)); // Slightly smaller max size for mobile
  };

  const resetNoButton = () => {
    setNoCount(0);
    setNoButtonPos({ x: 0, y: 0 });
    setYesButtonSize(1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No", "Are you sure?", "Really sure?", "Think again!", 
      "Last chance!", "Surely not?", "You might regret this!", 
      "Give it another thought!", "Is that your final answer?", 
      "You're breaking my heart ;("
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const markTheDate = () => {
    const event = {
      title: 'Romantic Valentine Dinner ❤️',
      text: 'Our Special Valentine Celebration',
      dates: '20270214T190000Z/20270214T220000Z',
      details: 'A magical evening with my favorite person!',
      location: 'Our Favorite Restaurant'
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const Particle = ({ color, size, delay }: { color: string; size: number; delay: number }) => (
    <motion.div
      initial={{ y: "110vh", opacity: 0, x: `${Math.random() * 100}vw` }}
      animate={{ 
        y: "-10vh", 
        opacity: [0, 1, 1, 0],
        x: `${(Math.random() * 100) + (mousePos.x * 20)}vw`,
        rotate: 360 
      }}
      transition={{ 
        duration: 8 + Math.random() * 7, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute pointer-events-none z-0"
    >
      <Heart fill={color} className="opacity-30" size={size} style={{ color }} />
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen transition-colors duration-700 flex items-center justify-center p-4 overflow-hidden font-['Outfit',sans-serif] selection:bg-pink-200 ${
        darkMode ? 'bg-[#1a0a0d] text-white' : 'bg-[#fff0f3] text-gray-900'
      }`}
    >
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle 
          key={i} 
          color={darkMode ? ['#ff4d6d', '#800f2f', '#590d22', '#ff758f'][i % 4] : ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1'][i % 4]} 
          size={10 + Math.random() * 30} 
          delay={i * 0.8}
        />
      ))}

      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            className="z-10 text-center w-full max-w-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              onClick={() => setStage('proposal')}
              className={`cursor-pointer p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-4 transition-colors duration-500 relative group ${
                darkMode ? 'bg-gray-900/80 border-pink-900/50' : 'bg-white border-pink-100'
              }`}
            >
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-pink-500 text-white p-3 md:p-4 rounded-2xl shadow-lg rotate-[-15deg] group-hover:rotate-0 transition-transform">
                <Mail className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="mb-6 md:mb-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MailOpen className="w-24 h-24 md:w-48 md:h-48 text-pink-400 mx-auto" strokeWidth={1} />
                </motion.div>
              </div>
              
              <h1 className="text-2xl md:text-5xl font-black text-[#ff4d6d] mb-4">
                You have a message!
              </h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Click to open the letter of love</p>
              
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-6 md:mt-8 flex justify-center"
              >
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl z-10 perspective-1000"
          >
            <div className={`backdrop-blur-2xl border p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(255,77,109,0.2)] text-center relative overflow-hidden transition-colors duration-500 ${
              darkMode ? 'bg-gray-900/90 border-pink-900/50' : 'bg-white/80 border-white'
            }`}>
              
              {/* Back Button */}
              <button 
                onClick={() => {
                  setStage('envelope');
                  resetNoButton();
                }}
                className={`absolute top-6 left-6 md:top-8 md:left-8 p-3 rounded-2xl transition-all ${
                  darkMode ? 'text-gray-500 hover:text-pink-400 hover:bg-white/5' : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'
                }`}
              >
                <ArrowLeft size={24} />
              </button>

              {/* Decorative icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 text-pink-300 opacity-40 hidden md:block"
              >
                <Sparkles size={40} />
              </motion.div>

              <div className="mb-6 md:mb-10 mt-2 md:mt-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className={`w-20 h-20 md:w-24 md:h-24 mx-auto drop-shadow-lg ${darkMode ? 'text-[#ff4d6d] fill-[#590d22]' : 'text-[#ff4d6d] fill-[#fff0f3]'}`} strokeWidth={1} />
                </motion.div>
              </div>

              <h2 className="text-pink-500 font-bold uppercase tracking-[0.2em] mb-4 text-xs md:text-sm">
                Straight from my heart
              </h2>
              
              <h1 className="text-3xl md:text-6xl font-black text-[#ff4d6d] mb-6 md:mb-8 leading-tight">
                Will you be my <span className={`${darkMode ? 'text-pink-300' : 'text-[#ff4d6d]'}`}>Valentine?</span>
              </h1>

              <p className={`text-sm md:text-lg font-medium mb-10 md:mb-12 italic leading-relaxed max-w-xs md:max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                "In a sea of people, my eyes will always search for you."
              </p>

              <div className="flex flex-col items-center justify-center gap-4 md:gap-6 relative min-h-[160px] md:min-h-[140px]">
                <motion.button
                  style={{ scale: yesButtonSize }}
                  whileHover={{ scale: yesButtonSize + 0.05 }}
                  whileTap={{ scale: yesButtonSize - 0.05 }}
                  onClick={() => setStage('accepted')}
                  className="px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-xl md:text-2xl shadow-xl z-20 flex items-center gap-3 w-full md:w-auto justify-center"
                >
                  <Send size={24} /> YES!
                </motion.button>

                <AnimatePresence>
                  <motion.button
                    key="no-btn"
                    animate={{ 
                      x: noButtonPos.x, 
                      y: noButtonPos.y,
                      scale: Math.max(1 - noCount * 0.05, 0.6)
                    }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className={`px-6 py-3 md:px-8 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] font-bold text-base md:text-lg border-2 transition-all z-10 w-full md:w-auto ${
                      darkMode 
                        ? 'bg-gray-800 text-gray-500 border-transparent hover:border-pink-900 hover:text-pink-400' 
                        : 'bg-white text-gray-400 border-transparent hover:border-pink-100 hover:text-pink-400'
                    }`}
                    style={{ 
                      position: noCount > 0 ? 'absolute' : 'relative',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {getNoButtonText()}
                  </motion.button>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`z-20 text-center p-6 md:p-8 max-w-2xl backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] border-2 shadow-2xl ${
              darkMode ? 'bg-black/40 border-pink-900/30' : 'bg-white/40 border-white'
            }`}
          >
            {/* Confetti Rain */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] md:rounded-[4rem]">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: `${Math.random() * 100}%`, rotate: 0 }}
                  animate={{ y: "100%", rotate: 360 }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute text-xl md:text-2xl"
                >
                  {['❤️', '💖', '✨', '🌸'][i % 4]}
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-6 md:mb-8"
            >
              <Heart className="w-24 h-24 md:w-48 md:h-48 text-[#ff4d6d] fill-[#ff4d6d] mx-auto drop-shadow-2xl" />
            </motion.div>
            
            <h1 className="text-4xl md:text-8xl font-black text-[#ff4d6d] mb-4 md:mb-6 drop-shadow-lg">
              YAYYY! 🥰
            </h1>
            
            <p className={`text-lg md:text-3xl font-bold mb-8 md:mb-12 ${darkMode ? 'text-pink-200' : 'text-[#800f2f]'}`}>
              You just made me the happiest person ever!
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markTheDate}
                className={`px-6 py-4 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-lg flex items-center justify-center gap-3 transition-colors ${
                  darkMode ? 'bg-pink-600 text-white hover:bg-pink-500' : 'bg-white text-[#ff4d6d] hover:bg-pink-50'
                }`}
              >
                <Calendar size={20} /> Mark the Date
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStage('envelope');
                  resetNoButton();
                }}
                className={`px-6 py-4 md:px-8 md:py-4 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-colors ${
                  darkMode ? 'bg-gray-800 text-pink-400 hover:bg-gray-700' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                }`}
              >
                <RefreshCw size={20} /> Start Over
              </motion.button>
            </div>

            <div className="mt-8 md:mt-12 flex items-center justify-center gap-4 text-pink-400 font-bold">
              <Stars className="animate-pulse w-4 h-4 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">FOREVER & ALWAYS</span>
              <Stars className="animate-pulse w-4 h-4 md:w-6 md:h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blobs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
        darkMode ? 'bg-pink-900/10' : 'bg-pink-300/20'
      }`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${
        darkMode ? 'bg-rose-900/10' : 'bg-rose-400/10'
      }`} />

      {/* Footer Info */}
      <div className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border shadow-sm z-30 transition-colors duration-500 ${
        darkMode ? 'bg-gray-900/50 border-white/5 text-gray-500' : 'bg-white/50 border-white/50 text-gray-400'
      }`}>
        <Music size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
        <div className={`w-px h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Love Proposal v2.0</span>
        <div className={`w-px h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div 
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-500" />
          ) : (
            <Moon size={18} className="text-indigo-400 hover:text-indigo-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoveProposalApp;
