export function cleanEvaluationResult(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')       // Remove bold markdown (**text** → text)
    .replace(/###?\s/g, '')                 // Remove headers (### Summary → Summary)
    .replace(/^- /gm, '• ')                 // Replace list items with bullets
    .replace(/\n{2,}/g, '\n\n')             // Normalize extra line breaks
    .trim();
}
