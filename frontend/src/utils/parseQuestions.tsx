export function parseQuestions(raw: string): { number: number; question: string; answer: string }[] {
  return raw
    .split(/\n\d+\.\s/) // Split by numbered headings like "\n1. "
    .filter(Boolean)    // Remove empty strings
    .map((q, index) => {
      const number = index + 1;
      const cleaned = q.trim().replace(/^\d+\.\s*/, ''); // Remove any leftover "1. " at start
      return {
        number,
        question: cleaned,
        answer: '',
      };
    });
}