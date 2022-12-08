

export interface ButtonProps
{
    text: string,
    className: string,
    onClick: () => void,
    children?: React.ReactElement | [],
    isDisabled?: boolean
}


export interface Comments {
    _id: string,
    item_id: string,
    comment: string,
    user_id: string,
    user: string,
}


export interface ItemDataState
{
    _id: string,
    name: string,
    explanation: string,
    imageUrl: string,
    category: string,
    comments: Comments[] | [],
}

export interface MainContainerProps
{
    children: React.ReactElement | []
}

export interface CommentProps
{
    comment: string,
    _id: string
}

export interface SearchResultsProps
{
    autoCompleteResults: [] | {
        _id: string;
        name: string;
        category: string
    }[]
}

export interface AuthModalContextData
{
    showAuthModal: boolean,
    setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type authState = "SIGN IN" | "SIGN UP";

export interface AuthFormProps
{
    authState: authState,
}

export interface AuthFormInterface
{
    userName: string,
    password: string,
    confirmPassword?: string    
}

export interface User 
{
    _id: string,
    userName: string,
    token: string
}


export interface AuthContextInterface
{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface CommentFormProps {
    itemData: ItemDataState,
    setItemData: React.Dispatch<React.SetStateAction<ItemDataState>>
}


export interface FormControlProps {
    name: string,
    checked: boolean,
    setChecked: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface ItemProps {
    name: string,
    imageUrl: string,
    category: string
}


export interface ErrorContextInterface {
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export interface CategoriesContextInterface
{
    categories:CategoriesState|any,
    setCategories: React.Dispatch<React.SetStateAction<CategoriesState>>,
    categoriesData: CategoriesDataPerObject[] | null,
    setCategoriesData: React.Dispatch<React.SetStateAction<CategoriesDataPerObject[]|null>>
}

interface CategoriesState
{
    planet: boolean,
    galaxy: boolean,
    star: boolean,
    event: boolean,
    constellation: boolean,
    nebula: boolean,
    comet: boolean,
    asteroid: boolean,
    natural_satellites: boolean,
    blackhole: boolean
}


export interface CategoriesDataPerObject
{
    name: string,
    imageUrl: string,
    category: string
}

