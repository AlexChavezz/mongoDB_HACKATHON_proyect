import styles from '../styles/HeaderComponentStyles.module.css';
import { Button } from './Button';

export const Header = () => {
    return (
        <header
            className={styles.mainContentHeader}
        >
            <Button
                text='SIGN UP'
                onClick={() => { }}
                className={styles.mainContentHeaderButton}
            />
        </header>
    );
}