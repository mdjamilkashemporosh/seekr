import { useEffect, useState } from 'react';
import { tips as allTips } from '../data/interviewTips';
import { shuffleArray } from '../utils/shuffleArray';

export default function QuestionLoading() {
  const [shuffledTips, setShuffledTips] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => { setShuffledTips(shuffleArray(allTips)); }, []);

  useEffect(() => {
    if (!shuffledTips.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= shuffledTips.length) {
          setShuffledTips(shuffleArray(allTips));
          return 0;
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [shuffledTips]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mb-8" />
      <h1 className="text-xl font-semibold text-black/80 mb-2">
        Hold tight, preparing your questions...
      </h1>
      <p className="text-sm text-black/60 max-w-md">
        This might take a few moments depending on your device and internet performance.
      </p>
      {shuffledTips.length > 0 && (
        <div className="mt-10 max-w-lg text-sm italic text-black/70">
          💡 {shuffledTips[currentIndex]}
        </div>
      )}
    </div>
  );
}