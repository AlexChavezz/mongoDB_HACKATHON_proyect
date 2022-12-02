import styles from '../styles/HomePageStyles.module.css';
import { MainContainer } from '../components/MainContainer';
import searchImahge from '../assets/search_FILL0_wght400_GRAD0_opsz48.svg';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { API } from '../helpers/API';
import { SearchResults } from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [constellation, setConstellation] = useState<string>('');
    const [autoCompleteResults, setAutoCompleteResults] = useState<{
        _id: string,
        name: string,
    }[] | []>([]);

    useEffect(() => {
        if(constellation.length > 0) {
            window.fetch(`${API}/autocomplete/${constellation}`)
                .then(res => res.json())
                .then(data => {
                    return setAutoCompleteResults(data)
                })
                .catch(res => console.log(res));            
        }
        setAutoCompleteResults([]);
    }, [constellation])

    const navigate = useNavigate();

    const inputHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) => setConstellation(target.value);
    const onSubmit = (e:React.FormEvent) => {
        e.preventDefault();
         //navigate(`/universe/${constellation}`);
    }


    return (
        <MainContainer>
            <form
                className={styles.Homeform}
                onSubmit={onSubmit}
            >
                <div
                    className={styles.HomeInputContainer}
                >
                    <input
                        className={styles.inputText}
                        type="text"
                        name="constellation"
                        value={constellation}
                        onChange={inputHandleChange}
                    />
                    <img
                        className={styles.searchImage}
                        src={searchImahge}
                        alt="search-image"
                    />
                    {
                        autoCompleteResults.length > 0 && <SearchResults autoCompleteResults={autoCompleteResults}/>
                    }
                </div>
            </form>
        </MainContainer>
    );
}