import { Comments as CommentsProps } from '../interfaces/intefaces';
import styles from '../styles/CommentComponentStyles.module.css';


export const Comments = ({ comment, owner }:CommentsProps) => {
    return (
        <div
            className={styles.commentContainer}
        >
            <span
                className={styles.authorName}
            >author: {owner}</span>
                <p
                    className={styles.authorComment}
                >
                    {
                        comment
                    }
                </p>
        </div>
    );
}