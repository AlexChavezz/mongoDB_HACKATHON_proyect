import { NavLink } from 'react-router-dom';
import styles from '../styles/404Page.module.css';


export const Page404 = () => {
    return (
        <section
            className={styles.page404Container}
        >
            <h2
                className={styles.page404Title}
            >404 Are you lose? Look at the stars.<NavLink to='/universe'>  Here!</NavLink></h2>
        </section>
    );
}