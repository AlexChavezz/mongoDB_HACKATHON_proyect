import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MainContainer } from "../components/MainContainer";
import styles from '../styles/SearchByTagCategoryPage.module.css';

const initialState = {
    planet: false,
    galaxy: false,
    star: false,
}

export const SearchByTagCategory = () => {
    const [categories, setCategories] = useState<any>(initialState);
    const [data, setData] = useState<any>([]);
    const handleCheckboxChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCategories({
            ...categories,
            [target.name]: !categories[target.name]
        })


    }
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
        try 
        {
            const response = await window.fetch('http://localhost:3000/api/items/getByCategories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categories)
            })
            const data = await response.json();
            console.log(data);
            if(data)
            {
                setData(data);
            }
        }
        catch (error)
        {
            console.log(error)
        }
    }

    return (
        <MainContainer>
            <section
                className={styles.mainContentSearchByCategory}
            >
                <article
                    className={styles.searchByCategoryInputs}
                >
                    <form
                        onSubmit={onSubmit}
                    >
                        <FormControl
                            name='planet'
                            checked={categories.planet}
                            setChecked={handleCheckboxChange}
                        />
                        <FormControl
                            name='star'
                            checked={categories.star}
                            setChecked={handleCheckboxChange}
                        />
                        <FormControl
                            name='galaxy'
                            checked={categories.galaxy}
                            setChecked={handleCheckboxChange}
                        />
                        <input
                            type="submit"
                            value="Apply"
                            className={styles.applyButton}
                        />
                    </form>
                </article>
                <article
                    className={styles.searchByCategoryResults}
                >
                    {/* <h3
                        className={styles.searchByCategoryResultsTitle}
                    >Results: </h3> */}
                    {
                        data.map((item: any) => <Item {...item} key={item._id}/>)
                    }
                </article>
            </section>
        </MainContainer>
    );
}


interface ItemProps {
    name: string,
    image: string,
    category: string
}

const Item = ({ name, image, category }: ItemProps) => {
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


interface FormControlProps {
    name: string,
    checked: boolean,
    setChecked: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

// interface FromControlProps extends CategoryState {
//     getCategoriesData: () => void,
//     changeCategoriesState: (isChecked: boolean, name: string) => void,
// }


const FormControl = ({ checked, name, setChecked }: FormControlProps) => {
    // const [checked, setChecked] = useState<boolean>(isChecked);
    // const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(!checked);

    //     console.log(!checked)
    //     changeCategoriesState(!checked, name);
    //     await getCategoriesData();
    // }

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