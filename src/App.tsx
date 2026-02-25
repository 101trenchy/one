import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.604l-5.195-6.791-5.95 6.791h-3.308l7.73-8.835L2.421 2.25h6.759l4.888 6.469L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function App() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [copied, setCopied] = useState(false);
  const fullText = '>one life, its worth an attempt';
  const contractAddress = '';

  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const disableDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('dragstart', disableDragStart);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('dragstart', disableDragStart);
    };
  }, []);

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const baseSpeed = 60;
      const variance = Math.random() * 30;
      const typingSpeed = baseSpeed + variance;

      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [displayedText, fullText]);

  useEffect(() => {
    const isTyping = displayedText.length < fullText.length;
    const cursorSpeed = isTyping ? 400 : 530;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorSpeed);

    return () => clearInterval(cursorInterval);
  }, [displayedText, fullText]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterClick = () => {
    window.open('', '_blank');
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f1f1fe] fade-in">
      {/* Background image - 50% reduced size, positioned in bottom-left */}
      <div className="fixed bottom-0 left-0 pointer-events-none select-none image-container">
        <img
          src="https://i.imgur.com/HjyIjGW.png"
          alt=""
          className="h-1/2 w-auto object-contain object-bottom-left"
          draggable="false"
        />
      </div>

      {/* Main content - centered layout */}
      <div className="fixed inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="text-container max-w-2xl w-full">
          <pre className="greentext font-mono text-lg md:text-xl lg:text-2xl leading-relaxed whitespace-pre-wrap break-words">
            {displayedText}
            <span className={`cursor ${showCursor ? 'visible' : 'invisible'}`}>█</span>
          </pre>

          <div className="button-group mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3 justify-center">
            <button
              onClick={handleTwitterClick}
              className="chan-button flex items-center justify-center gap-2 px-6 py-3 rounded-sm border-2 border-[#789922] bg-[#F0E0D6] text-[#789922] font-mono text-sm font-bold transition-all duration-200 hover:bg-[#789922] hover:text-[#F0E0D6] hover:shadow-md active:scale-95"
              title="Visit X"
            >
              <XIcon />
              <span>x</span>
            </button>

            <button
              onClick={handleCopyAddress}
              className="chan-button flex items-center justify-center gap-2 px-6 py-3 rounded-sm border-2 border-[#789922] bg-[#F0E0D6] text-[#789922] font-mono text-sm font-bold transition-all duration-200 hover:bg-[#789922] hover:text-[#F0E0D6] hover:shadow-md active:scale-95"
              title={copied ? 'Copied!' : 'Copy contract address'}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>copied</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>copy ca</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
