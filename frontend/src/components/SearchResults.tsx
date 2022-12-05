import { NavLink } from 'react-router-dom';
import { SearchResultsProps } from '../interfaces/intefaces';
import styles from '../styles/SearchResultsContainerStyles.module.css';

export const SearchResults = ({ autoCompleteResults }: SearchResultsProps) => {
    return (
        <div
            className={styles.searchResultsContainer}
        >
            <ul
            >
                {
                    autoCompleteResults.map((element) => {
                        return (
                            <li
                                className={styles.searchResultsContainerItem}
                                key={element._id}
                            >
                                <NavLink
                                    to={`/universe/${element.name}`}
                                    className={styles.searchResultsContainerLink}
                                >
                                    [{element.category}]:   {"  "}  {element.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}