import { ButtonProps } from '../../interfaces/intefaces';

export const Button = ({ className, onClick, text, children, isDisabled }: ButtonProps) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={isDisabled}
        >
            {
                text
            }
            {
                children
            }
        </button>
    );
}