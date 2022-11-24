import { MainContainer } from '../components/MainContainer';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../styles/ConstellationPageStyles.module.css';

export const ConstellationPage = () => {
    const { constellation } = useParams();
    useEffect(() => {
        console.log('render')
    }, [])
    console.log(constellation)
    return (
        <MainContainer>
            <section
                className={styles.contelationMainPage}
            >
                <article
                    className={styles.constellationInfo}
                >
                    <div
                        className={styles.constellationImageContainer}
                    >

                    </div>
                    <div
                        className={styles.constellationComments}
                    >
                    </div>
                </article>
                <article
                    className={styles.constellationHistory}
                >
                    <p
                        className={styles.constellationHistoryText}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim incidunt nobis nihil accusantium commodi culpa inventore numquam, sint dignissimos, deserunt accusamus explicabo? Nihil eligendi ducimus qui consequatur repellendus numquam similique!
                    </p>
                </article>
            </section>
        </MainContainer>
    );
}