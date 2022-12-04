import { NavLink } from "react-router-dom";
import { ItemProps } from "../../interfaces/intefaces";
import styles from '../../styles/ItemComponentStyles.module.css';


export const Item = ({ name, image, category }: ItemProps) => {
    return (
        <NavLink
        to={"/universe/" + name}
            className={styles.itemContainer}
        >
            <div
                className={styles.itemImageContainer}
            >
                <img className={styles.itemImage} src={image} alt={name} />
            </div>
            <div
                className={styles.itemInfoContainer}
            >
                <span
                    className={styles.itemInfoName}
                >Name: {" "}{name
                }</span>
                <span
                    className={styles.itemInfoName}
                >
                    Category: {" "}{category}
                </span>
            </div>
        </NavLink>
    );
}
