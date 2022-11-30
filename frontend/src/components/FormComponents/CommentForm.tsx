import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { API } from '../../helpers/API';
import { useAuth } from '../../hooks/useAuth';
import { CommentFormProps } from '../../interfaces/intefaces';
import styles from '../../styles/CommentFormComponentStyles.module.css';
import { Comments } from '../Comment';
import { Button } from './Button';


export const CommentForm = ({ constellationData, setConstellationData }: CommentFormProps) => {

    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if( user )
        {
            // -> json to send
            const newComment = {
                comment, 
                user: user.userName,
                constellation_id: constellationData._id,
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
                if( data.insertedId )
                {
                    setConstellationData({...constellationData, comments: [...constellationData.comments, {...newComment, _id: data.insertedId}]});
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
            <textarea
                className={styles.commentFormTextArea}
                placeholder='type your comment here'
                name=''
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