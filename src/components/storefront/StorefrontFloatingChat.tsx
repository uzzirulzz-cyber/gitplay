import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const StorefrontFloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const { chatMessages, sendChatMessage } = useCommerce();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal.trim(), 'customer');
    setInputVal('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0b141a] border border-[#1a2540] shadow-2xl overflow-hidden flex flex-col h-[420px] text-white">
          {/* Header */}
          <div className="bg-[#202c33] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white text-base">
                <i className="bi bi-whatsapp"></i>
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">PlayBeat Live Support</div>
                <div className="text-[10px] text-[#25d366] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                  <span>Online · Instant Activation</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="https://wa.me/923000000000?text=Hello%20PlayBeat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#8696a0] hover:text-white"
                title="Open in WhatsApp app"
              >
                <i className="bi bi-box-arrow-up-right text-xs"></i>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#8696a0] hover:text-white"
                aria-label="Close chat"
              >
                <i className="bi bi-x-lg text-sm"></i>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto wa-bg-pattern text-xs">
            {chatMessages.map((msg) => {
              const isCustomer = msg.sender === 'customer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[82%] rounded-xl px-3 py-2 ${
                    isCustomer
                      ? 'ml-auto bg-[#005c4b] text-[#e9edef] rounded-br-none'
                      : 'mr-auto bg-[#202c33] text-[#e9edef] rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] text-white/50 text-right mt-1 mono">
                    {msg.timestamp} {isCustomer ? '✓✓' : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="bg-[#202c33] p-2.5 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about YouTube, Netflix, or IPTV..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#2a3942] text-xs text-[#e9edef] placeholder-[#8696a0] rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#25d366]"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:brightness-110 flex-none"
              aria-label="Send message"
            >
              <i className="bi bi-send-fill text-xs"></i>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#25d366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-2xl relative"
        aria-label="Open customer support chat"
      >
        <i className={`bi ${isOpen ? 'bi-x-lg text-lg' : 'bi-whatsapp'}`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ef4444] border-2 border-[var(--bg)] flex items-center justify-center text-[9px] font-bold">
            1
          </span>
        )}
      </button>
    </div>
  );
};
