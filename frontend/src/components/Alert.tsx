import { useAlert } from '../hooks/useAlert';
import styles from '../styles/AlertComponentStyles.module.css';

export const Alert = () => {
    const {error} = useAlert();
    return (
        <div
            className={styles.alertContainer}
        >
            <p>{error}</p>
        </div>
    );
}