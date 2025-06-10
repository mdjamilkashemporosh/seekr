interface BlackButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function BlackButton({ label, onClick, disabled = false, }: BlackButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-black text-white rounded-lg py-3 px-10 text-xl font-medium flex items-center justify-center gap-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-black/85 duration-300"}`}>
            {label}
        </button>
    );
}