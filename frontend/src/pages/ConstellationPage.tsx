import { MainContainer } from '../components/MainContainer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/ConstellationPageStyles.module.css';
import { Comments } from '../components/Comment';
import { developmentAPI } from '../helpers/developmentAPI';
import { ConstellationState } from '../interfaces/intefaces';


const constelationState = {
    _id: '',
    name: '',
    myth:''
}

export const ConstellationPage = () => {
    const { constellation } = useParams();
    const [constellationData, setConstellationData] = useState<ConstellationState>(constelationState);

    useEffect(() => {
        window.fetch(`${developmentAPI}/getByName/${constellation}`)
        .then(res => res.json())
        .then(data => {
            if(data._id) return setConstellationData(data);
            throw new Error ('No data');            
        })
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
                        <h3
                            className={styles.constellationCommentsTitle}
                        >COMMENTS</h3>
                        <Comments />
                    </div>
                </article>
                <article
                    className={styles.constellationHistory}
                >
                    <h3
                        className={styles.constellationHistoryTitle}
                    >Did You Know?</h3>
                    <p
                        className={styles.constellationHistoryText}
                    >
                        {constellationData.myth}
                    </p>
                </article>
            </section>
        </MainContainer>
    );
}