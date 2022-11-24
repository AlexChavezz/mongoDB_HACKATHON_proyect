

export interface ButtonProps
{
    text: string,
    className: string,
    onClick: () => void
}

export interface ConstellationState
{
    _id: string,
    name: string,
    myth: string
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