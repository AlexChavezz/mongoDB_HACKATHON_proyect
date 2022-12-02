import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AuthModalContext } from '../../context/AuthModalContext';
import { API } from '../../helpers/API';
import { CommentFormProps } from '../../interfaces/intefaces';
import styles from '../../styles/CommentFormComponentStyles.module.css';
import { Button } from './Button';


export const CommentForm = ({ itemData, setItemData }: CommentFormProps) => {

    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);
    const { setShowAuthModal } = useContext(AuthModalContext);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        const isCommentEmpty = comment.trim().length === 0;
        if( user && !isCommentEmpty)
        {
            // -> json to send
            const newComment = {
                comment,
                user: user.userName,
                item_id: itemData._id,
                user_id: user._id,
            }
            // -> send comment to backend
            try
            {
                const response:any = await fetch(`${API}/comments/publish-comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newComment)
                });
                const data = await response.json();
                console.log(data)
                if( data.insertedId )
                {
                    setItemData({...itemData, comments: [...itemData.comments, {...newComment, _id: data.insertedId}]});
                    setComment("");
                }
            }
            catch(error)
            {
                console.log(error);
            }
        }
        else
        {
            // -> show modal
        }
    }

    const onChangeComment = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = target;
        setComment(value);
    }
   
    return (
        <form
        onSubmit={onSubmit}
            className={styles.commentFormContainer}
        >
            <label 
                htmlFor='comment'
                className={styles.commentFormLabel}
            >
                Share your own comment: 
            </label>
            <textarea
                className={styles.commentFormTextArea}
                placeholder='type your comment here'
                name='comment'
                value={comment}
                onChange={onChangeComment}
            />

            <Button
                text='Publish'
                className={styles.commentFormSubmitButton}
                onClick={() => {}}
            />
        </form>
    );
}