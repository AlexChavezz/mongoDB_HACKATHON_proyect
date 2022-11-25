

export interface ButtonProps
{
    text: string,
    className: string,
    onClick: () => void
}


export interface Comments {
    _id: string,
    constellation_id: string,
    comment: string,
    user_id: string,
    owner: string,
}


export interface ConstellationState
{
    _id: string,
    name: string,
    myth: string,
    comments: Comments[] | []
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
    }[]
}