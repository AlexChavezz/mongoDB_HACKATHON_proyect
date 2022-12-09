import { FormControlProps } from "../../interfaces/intefaces";
import styles from  '../../styles/FormControlComponentStyles.module.css';

export const FormControl = ({ checked, name, setChecked, title }: FormControlProps) => {

    return (
        <div
            className={styles.searchByCategoryFormControl}
        >
            <label
                htmlFor={name}
                className={styles.searchByCategoryFormLabel}
            >
                {name}
            </label>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={setChecked}
                className={styles.checkbox}
            />
        </div>
    );
}