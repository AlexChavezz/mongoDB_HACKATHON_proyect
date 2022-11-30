import { Comments as CommentsProps } from '../interfaces/intefaces';
import styles from '../styles/CommentComponentStyles.module.css';


export const Comments = ({ comment, user }:CommentsProps) => {
    return (
        <div
            className={styles.commentContainer}
        >
            <span
                className={styles.authorName}
            >{user}</span>
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