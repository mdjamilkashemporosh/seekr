import { useState } from 'react';
import { z } from 'zod';
import { Toaster, toast } from 'sonner';
import Button from '../components/Button';
import allowedLevels from '../data/allowedLevels';
import allowedTopics from '../data/allowedTopics';
import ComboboxSelect from '../components/Combobox';
import { API_BASE_URL } from '../config/config';
import { parseQuestions } from '../utils/parseQuestions';
import QA from '../components/QA';
import QuestionLoading from './QuestionLoading';
const selectionSchema = z.object({
  topic: z.string().nonempty('Topic is required'),
  level: z.string().nonempty('Level is required'),
});

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qaList, setQaList] = useState<{ number: number; question: string; answer: string }[]>([]);

  const handleStart = async () => {
    const result = selectionSchema.safeParse({
      topic: selectedTopic ?? '',
      level: selectedLevel ?? '',
    });

    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      toast.warning(firstError);
      return;
    }

    toast.success('Starting...');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/questions?topic=${selectedTopic}&level=${selectedLevel}&count=20`);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Failed to fetch questions.');
      }
      const data = await response.json();
      const parsed = parseQuestions(data?.questions);
      setQaList(parsed);
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading) { return <QuestionLoading />; }
  if (qaList?.length > 0) return <QA qaList={qaList} />;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col justify-center">
        <div className="flex items-center justify-center mb-6 gap-2">
          <ComboboxSelect label="Topic" options={allowedTopics} value={selectedTopic} onChange={setSelectedTopic} />
          <ComboboxSelect label="Level" options={allowedLevels} value={selectedLevel} onChange={setSelectedLevel} />
        </div>
        <Button label="Start" onClick={handleStart} />
        <Toaster richColors position="top-center" />
      </div>
    </div>
  );
}
