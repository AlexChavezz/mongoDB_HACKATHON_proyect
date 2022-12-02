import { MainContainer } from '../components/MainContainer';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/ConstellationPageStyles.module.css';
import { Comments } from '../components/Comment';
import { API } from '../helpers/API';
import { ConstellationState } from '../interfaces/intefaces';
import { CommentForm } from '../components/FormComponents/CommentForm';
import andromeda from '../assets/andromeda.jpg';

const constelationState = {
    _id: '',
    name: '',
    explanation: '',
    image: '',
    category:'',
    comments: []
}

export const ItemPage = () => {
    const { constellation } = useParams();
    const [constellationData, setConstellationData] = useState<ConstellationState>(constelationState);
    const navigate = useNavigate();
    // console.log(constellationData._id)
    useEffect(() => {
        window.fetch(`${API}/getByName/${constellation}`)
            .then(res => res.json())
            .then(data => {
                if (data._id) return setConstellationData(data);
                navigate('/404');
            })
    }, [])
    console.log(constellationData.image)
    if (constellationData._id === '') return <div>Loading...</div>
    return (
        <MainContainer>
            <section
                className={styles.itemMainPage}
            >
                <article
                    className={styles.itemMainPageContent}
                >
                    <div
                        className={styles.itemMainPageContentImage}
                    >
                        <img
                            className={styles.itemMainPageContentImageImg}
                            src={constellationData.image} alt={constellationData.name} />
                    </div>
                    <div
                        className={styles.itemMainPageContentDescription}
                    >
                        <span
                            className={styles.itemMainPageContentDescriptionName}
                        >
                            {constellationData.name}
                        </span>
                        <span
                            className={styles.itemMainPageContentDescriptionCategory}

                        >
                            Category:  {" "}
                            {constellationData.category}
                        </span>
                        <p
                            className={styles.itemMainPageContentDescriptionExplanation}
                        >{constellationData.explanation}</p>
                    </div>
                </article>
                <article
                    className={styles.itemMainPageContent}

                >

                </article>
            </section>
        </MainContainer>
    );
}