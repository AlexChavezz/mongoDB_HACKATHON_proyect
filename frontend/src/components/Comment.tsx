import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { Comments as CommentsProps } from '../interfaces/intefaces';
import styles from '../styles/CommentComponentStyles.module.css';


export const Comment = ({ comment, user }:CommentsProps) => {

    const { user:userState } = useContext(AuthContext)
    
    return (
        <div
            className={styles.commentContainer}
        >
            <span
                className={styles.authorName}
            >{user} {user===userState?.userName?" (You)":""}</span>
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