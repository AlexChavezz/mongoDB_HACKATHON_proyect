import { MainContainerProps } from '../interfaces/intefaces';
import styles from '../styles/MainContainerComponentStyles.module.css';
import { Header } from "./Header";



export const MainContainer = ({ children }:MainContainerProps) => {
    return (
        <section className={styles.mainContentContainer}>
            <Header />
            {
                children
            }
        </section>
    );
}