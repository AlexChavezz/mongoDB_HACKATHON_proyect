import styles from 'ButtonComponentStyles.module.css';
import { ButtonProps } from '../interfaces/intefaces';

export const Button = ({ className, onClick, text }:ButtonProps) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {
                text
            }
        </button>
    );
}