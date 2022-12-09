import { useContext } from "react";
import { FormControl } from "../components/FormComponents/FormControl";
import { Item } from "../components/FormComponents/Item";
import { MainContainer } from "../components/MainContainer";
import { CategoriesContext } from "../context/CategoriesContext";
import { useCategories } from "../hooks/useCategories";
import styles from '../styles/SearchByTagCategoryPage.module.css';


export const SearchByTagCategory = () => {
    const { categories, categoriesData } = useContext(CategoriesContext);
    const [ getAsyncItems, clearSyncItems, handleCategorieCheckboxChange ] = useCategories();

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
                        onSubmit={getAsyncItems}
                    >
                        <div>

                            <FormControl
                                name='planet'
                                checked={categories.planet}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='star'
                                checked={categories.star}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='galaxy'
                                checked={categories.galaxy}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='event'
                                checked={categories.event}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='constellation'
                                checked={categories.constellation}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='nebula'
                                checked={categories.nebula}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='satellite'
                                checked={categories.satellite}
                                setChecked={handleCategorieCheckboxChange}
                            />
                            <FormControl
                                name='blackhole'
                                checked={categories.blackhole}
                                setChecked={handleCategorieCheckboxChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Apply"
                            className={`${styles.formButton}  ${styles.applyButton}`}
                        />
                         <input
                            onClick={clearSyncItems}
                            type="button"
                            value="Clear"
                            className={styles.formButton}
                        />
                    </form>
                </article>
                <article
                    className={styles.searchByCategoryResults}
                >
                    {
                        categoriesData && categoriesData.map((item: any) => <Item {...item} key={item._id}/>)
                    }
                </article>
            </section>
        </MainContainer>
    );
}