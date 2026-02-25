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
  Sun
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Stage = 'envelope' | 'proposal' | 'accepted';

const LoveProposalApp = () => {
  const [stage, setStage] = useState<Stage>('envelope');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  const moveNoButton = () => {
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 250;
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
    setYesButtonSize(prev => Math.min(prev + 0.2, 3.5));
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
      className="relative min-h-screen bg-[#fff0f3] flex items-center justify-center p-4 overflow-hidden font-['Outfit',sans-serif] selection:bg-pink-200"
    >
      {/* Background Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle 
          key={i} 
          color={['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1'][i % 4]} 
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
            className="z-10 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              onClick={() => setStage('proposal')}
              className="cursor-pointer bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-pink-100 relative group"
            >
              <div className="absolute -top-6 -left-6 bg-pink-500 text-white p-4 rounded-2xl shadow-lg rotate-[-15deg] group-hover:rotate-0 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              
              <div className="mb-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MailOpen className="w-32 h-32 md:w-48 md:h-48 text-pink-400 mx-auto" strokeWidth={1} />
                </motion.div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-[#800f2f] mb-4">
                You have a message!
              </h1>
              <p className="text-gray-500 font-medium">Click to open the letter of love</p>
              
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 flex justify-center"
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
            <div className="bg-white/80 backdrop-blur-2xl border border-white p-8 md:p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(255,77,109,0.2)] text-center relative overflow-hidden">
              
              {/* Back Button */}
              <button 
                onClick={() => {
                  setStage('envelope');
                  resetNoButton();
                }}
                className="absolute top-8 left-8 p-3 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-2xl transition-all"
              >
                <ArrowLeft size={24} />
              </button>

              {/* Decorative icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 text-pink-300 opacity-40"
              >
                <Sparkles size={40} />
              </motion.div>

              <div className="mb-10 mt-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-24 h-24 text-[#ff4d6d] fill-[#fff0f3] mx-auto" strokeWidth={1} />
                </motion.div>
              </div>

              <h2 className="text-pink-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">
                Straight from my heart
              </h2>
              
              <h1 className="text-4xl md:text-6xl font-black text-[#800f2f] mb-8 leading-tight">
                Will you be my <span className="text-[#ff4d6d]">Valentine?</span>
              </h1>

              <p className="text-gray-600 text-lg font-medium mb-12 italic leading-relaxed max-w-md mx-auto">
                "In a sea of people, my eyes will always search for you."
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[140px]">
                <motion.button
                  style={{ scale: yesButtonSize }}
                  whileHover={{ scale: yesButtonSize + 0.05 }}
                  whileTap={{ scale: yesButtonSize - 0.05 }}
                  onClick={() => setStage('accepted')}
                  className="px-12 py-5 bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white rounded-[2rem] font-black text-2xl shadow-xl z-20 flex items-center gap-3"
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
                    className="px-8 py-4 bg-white text-gray-400 rounded-[1.5rem] font-bold text-lg border-2 border-transparent hover:border-pink-100 hover:text-pink-400 transition-all z-10"
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
            className="z-20 text-center p-8 max-w-2xl bg-white/40 backdrop-blur-3xl rounded-[4rem] border-2 border-white shadow-2xl"
          >
            {/* Confetti Rain (simplified for performance/visibility) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[4rem]">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: `${Math.random() * 100}%`, rotate: 0 }}
                  animate={{ y: "100%", rotate: 360 }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute text-2xl"
                >
                  {['❤️', '💖', '✨', '🌸'][i % 4]}
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-8"
            >
              <Heart className="w-32 h-32 md:w-48 md:h-48 text-[#ff4d6d] fill-[#ff4d6d] mx-auto drop-shadow-2xl" />
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black text-[#ff4d6d] mb-6 drop-shadow-lg">
              YAYYY! 🥰
            </h1>
            
            <p className="text-xl md:text-3xl font-bold text-[#800f2f] mb-12">
              You just made me the happiest person ever!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#ff4d6d] rounded-2xl font-bold text-lg shadow-lg flex items-center gap-3"
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
                className="px-8 py-4 bg-pink-100 text-pink-600 rounded-2xl font-bold text-lg flex items-center gap-3"
              >
                <RefreshCw size={20} /> Start Over
              </motion.button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-4 text-pink-400 font-bold">
              <Stars className="animate-pulse" />
              <span>FOREVER & ALWAYS</span>
              <Stars className="animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Footer Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-gray-400 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-sm z-30">
        <Music size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
        <div className="w-px h-4 bg-gray-300" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Love Proposal v2.0</span>
        <div className="w-px h-4 bg-gray-300" />
        <Sun size={18} className="hover:text-yellow-500 cursor-pointer transition-colors" />
      </div>
    </div>
  );
};

export default LoveProposalApp;
