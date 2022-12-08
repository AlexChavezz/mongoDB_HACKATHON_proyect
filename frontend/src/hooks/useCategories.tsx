import { useContext } from 'react'; 
import { initialState } from '../App';
import { CategoriesContext } from '../context/CategoriesContext';
import { API } from '../helpers/API';

type useCategories = [
    getAsyncItems: (event: React.FormEvent<HTMLFormElement>) => void,
    clearSyncItems: () => void,
    handleCategorieCheckboxChange: ({target}: React.ChangeEvent<HTMLInputElement>) => void
];

export const useCategories = ():useCategories => {
    
    const { 
        categories,
        categoriesData,
        setCategories,
        setCategoriesData
    } = useContext(CategoriesContext);
    
    const clearSyncItems = () => {
        setCategoriesData([]);
        setCategories(initialState);
    }

    const handleCategorieCheckboxChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setCategories({
            ...categories,
            [target.name]: !categories[target.name]
        })
    }

    const getAsyncItems = async (event: React.FormEvent<HTMLFormElement>) => {
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
                return setCategoriesData([]);
            }
            setCategoriesData(data);
        }
        catch (error)
        {
            console.log(error)
        }
    }
    
    return [
        getAsyncItems,
        clearSyncItems,
        handleCategorieCheckboxChange
    ]
}