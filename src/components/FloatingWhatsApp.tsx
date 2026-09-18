import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_DETAILS } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [minimized, setMinimized] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Apply subtle entrance animation after exactly 2-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(BRAND_DETAILS.createGeneralWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {hasEntered && (
        <motion.div
          id="floating-whatsapp-container"
          initial={{ opacity: 0, scale: 0.82, y: 16 }}
          animate={{
            opacity: 1,
            scale: [0.82, 1.07, 0.98, 1],
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5"
        >
          {/* Helper label pill */}
          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ opacity: 0, x: 14, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.92 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="hidden sm:flex items-center gap-2.5 bg-[#FFFFFF] border border-[rgba(184,147,88,0.35)] text-[#1C1817] px-3.5 py-2 rounded-full shadow-xl backdrop-blur-md text-xs font-sans"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="tracking-wide font-medium">WhatsApp: 091737 85595 &bull; Bhagirathi</span>
                <button
                  onClick={() => setMinimized(true)}
                  className="text-[#6E6259] hover:text-[#1C1817] ml-1 p-0.5 cursor-pointer transition-colors"
                  aria-label="Dismiss label"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Main Floating Button */}
          <div className="relative">
            {/* Subtle attention ring pulse on entrance */}
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [1, 1.35, 1.45],
                opacity: [0.6, 0.2, 0],
              }}
              transition={{
                delay: 0.4,
                duration: 1.4,
                ease: 'easeOut',
              }}
              className="absolute -inset-1 rounded-full bg-[#25D366]/40 pointer-events-none"
            />

            <motion.button
              id="floating-whatsapp-btn"
              onClick={handleClick}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Chat with Rangbastra on WhatsApp: 091737 85595"
              title="WhatsApp: 091737 85595 (Bhagirathi)"
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] shadow-2xl transition-colors focus:outline-hidden cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
              <span className="sr-only">Chat on WhatsApp: 091737 85595</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

