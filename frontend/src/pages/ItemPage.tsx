import { MainContainer } from '../components/MainContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/ConstellationPageStyles.module.css';
import { Comment } from '../components/Comment';
import { API } from '../helpers/API';
import { ItemDataState } from '../interfaces/intefaces';
import { CommentForm } from '../components/FormComponents/CommentForm';

const constelationState = {
    _id: '',
    name: '',
    explanation: '',
    imageUrl: '',
    category: '',
    comments: []
}

export const ItemPage = () => {
    const { item } = useParams();
    const [itemData, setItemData] = useState<ItemDataState>(constelationState);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        window.fetch(`${API}/items/getByName/${item}`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                if (data._id) return setItemData(data);
                navigate('/404');
            })
    }, [])
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
                            src={itemData.imageUrl} alt={itemData.name} />
                    </div>
                    <div
                        className={styles.itemMainPageContentDescription}
                    >

                        <span
                            className={styles.itemMainPageContentDescriptionName}
                        >
                            {itemData.name}
                        </span>
                        <span
                            className={styles.itemMainPageContentDescriptionCategory}

                        >
                            Category:  {" "}
                            {itemData.category}
                        </span>
                        <p
                            className={styles.itemMainPageContentDescriptionExplanation}
                        >{itemData.explanation}</p>

                    </div>
                </article>
                <article
                    className={styles.itemMainPageContent}
                >
                    <div
                        className={styles.itemMainPageCommentsContainer}
                    >
                        <h3
                            className={styles.itemMainPageContentDescriptionName}
                        >COMMENTS</h3>
                        <div
                            className={isLoading ? styles.loadingContainer : styles.itemMainPageCommentsContainerComments}
                        >

                            {itemData.comments.map((comment) => <Comment {...comment} key={comment._id} />)}

                        </div>
                        <div
                            className={styles.itemMainPageCommentsContainerForm}
                        >
                            <CommentForm itemData={itemData} setItemData={setItemData} />
                        </div>
                    </div>
                </article>
            </section>
        </MainContainer>
    );
}