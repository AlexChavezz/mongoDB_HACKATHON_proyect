import { useState } from "react";
import { FormControl } from "../components/FormComponents/FormControl";
import { Item } from "../components/FormComponents/Item";
import { MainContainer } from "../components/MainContainer";
import { API } from "../helpers/API";
import styles from '../styles/SearchByTagCategoryPage.module.css';

const initialState = {
    planet: false,
    galaxy: false,
    star: false,
    event: false,
    constellation: false,
    nebula: false,
    comet: false,
    asteroid: false,
    moon: false,
    blackhole: false,
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
        try 
        {
            const response = await window.fetch(`${API}/items/getByCategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categories)
            })
            const data = await response.json();
            if(data.length === 0)
            {
                return setData([]);
            }
            setData(data);
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
                    <p className={styles.searchBycategoryFormTitle}>Search by categories</p>
                    <form
                        className={styles.searchByCategoryForm}
                        onSubmit={onSubmit}
                    >
                        <div>

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
                            <FormControl
                                name='event'
                                checked={categories.event}
                                setChecked={handleCheckboxChange}
                            />
                            <FormControl
                                name='constellation'
                                checked={categories.constellation}
                                setChecked={handleCheckboxChange}
                            />
                            <FormControl
                                name='nebula'
                                checked={categories.nebula}
                                setChecked={handleCheckboxChange}
                            />
                            <FormControl
                                name='moon'
                                checked={categories.moon}
                                setChecked={handleCheckboxChange}
                            />
                            <FormControl
                                name='blackhole'
                                checked={categories.blackhole}
                                setChecked={handleCheckboxChange}
                            />
                        </div>
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
                    {
                        data.map((item: any) => <Item {...item} key={item._id}/>)
                    }
                </article>
            </section>
        </MainContainer>
    );
}
