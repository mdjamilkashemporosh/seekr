import { useState } from 'react';
import Button from './Button';
import { API_BASE_URL } from '../config/config';
import EvaluationLoading from '../pages/EvaluationLoading';
import Feedback from './feedback';
import { toast } from 'sonner';
import { cleanEvaluationResult } from '../utils/cleanEvaluationResult';

interface QAItem {
  number: number;
  question: string;
  answer: string;
}

interface QAProps {
  qaList: QAItem[];
}

export default function QA({ qaList }: QAProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<QAItem[]>(qaList);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>("");

  const currentQuestion = questions[currentIndex];
  const inputId = `qa-${currentQuestion.number}`;

  const handleAnswerChange = (value: string) => {
    const updated = [...questions];
    updated[currentIndex] = {
      ...updated[currentIndex],
      answer: value,
    };
    setQuestions(updated);
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsEvaluating(true);
      const payload = {
        questions: questions.map((q) => q.question),
        answers: questions.map((q) => q.answer),
      };

      try {
        const response = await fetch(`${API_BASE_URL}/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        setFeedbackMessage(cleanEvaluationResult(data?.evaluation));
      } catch (error) {
        console.error("Submission error:", error);
        toast.error('Something went wrong while evaluation');
        toast.info('Reloading in 5 seconds...');

        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } finally {
        setIsEvaluating(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  if (feedbackMessage) { return <Feedback message={feedbackMessage} /> }
  if (isEvaluating) { return <EvaluationLoading />; }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen space-y-6 p-4">
      <div className="absolute top-0 left-0 w-full flex justify-center pt-6">
        <div className="text-lg text-black/50">
          {currentQuestion.number}/{qaList?.length}
        </div>
      </div>

      <div className="max-w-xl w-full space-y-4 text-black">
        <div className="text-lg">{currentQuestion.question}</div>

        <textarea
          id={inputId}
          className="w-full h-32 p-3 bg-white text-black border-2 border-black rounded-md focus:outline-none placeholder-gray-500"
          value={currentQuestion.answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Type your answer..."
        />
      </div>

      <div className="flex space-x-4">
        <Button label="Back" onClick={handleBack} disabled={currentIndex === 0} />
        <Button
          label={currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
