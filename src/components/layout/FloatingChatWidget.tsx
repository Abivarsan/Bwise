import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { PRIORITY_SERVICES } from '../../data/servicesData';

/**
 * Reproduces the warm amber circular floating chat widget in the bottom-right corner
 * of S1.jpg, S5.jpg, and S6.jpg.
 */
export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const navigate = useNavigate();

  const handleQuickServiceSelect = (slug: string) => {
    setIsOpen(false);
    const svc = PRIORITY_SERVICES.find((s) => s.slug === slug);
    const catSlug = svc?.categorySlug || 'software-solutions';
    navigate(`/services?category=${catSlug}&service=${slug}#${slug}`);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    setIsOpen(false);
    setCustomMessage('');
    navigate(`/contact?topic=${encodeURIComponent(customMessage)}`);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[360px] bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.22)] border border-amber-200/80 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold leading-none">Bwise Hive Concierge</h4>
                <p className="text-[11px] text-amber-100 mt-0.5">Instant Studio Navigation</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 max-h-[320px] overflow-y-auto space-y-3 bg-[#FAF8F5]">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-stone-200/70 text-xs text-stone-700 leading-relaxed">
              👋 <strong>Welcome to the Bwise Hive!</strong> Which of our 12 specialized service studios would you like to explore right now?
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleQuickServiceSelect(svc.slug)}
                  className="px-2.5 py-1.5 rounded-full bg-white hover:bg-amber-500 hover:text-white border border-stone-200 hover:border-amber-500 text-[11px] font-semibold text-stone-800 transition cursor-pointer"
                >
                  {svc.shortTitle}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Ask about your project..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-full bg-stone-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Orange Chat Button matching bottom-right of S1.jpg, S5.jpg & S6.jpg */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Bwise Hive Assistant"
        className="w-14 h-14 rounded-full bg-gradient-to-b from-[#F5A646] to-[#E3841B] hover:from-[#F29A30] hover:to-[#D4730E] text-white shadow-[0_10px_28px_rgba(234,141,40,0.45)] hover:shadow-[0_14px_34px_rgba(234,141,40,0.65)] flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-white text-white" />
        )}
      </button>
    </div>
  );
};
