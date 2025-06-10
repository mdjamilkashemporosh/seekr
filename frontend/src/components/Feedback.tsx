import Button from './Button';

interface FeedbackProps {
    message: string;
}

export default function Feedback({ message }: FeedbackProps) {
    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen space-y-6 text-center ">
            <h1 className="text-2xl font-bold text-black/80">🎉 Evaluation Complete</h1>

            <div className="w-[70%] p-4 border-2 border-black/20 rounded-lg">
                <p className="text-black/70">{message}</p>
            </div>

            <Button label="Start Over" onClick={handleRestart} />
        </div>
    );
}
