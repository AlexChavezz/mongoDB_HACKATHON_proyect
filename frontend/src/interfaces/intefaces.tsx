

export interface ButtonProps
{
    text: string,
    className: string,
    onClick: () => void
}

export interface MainContainerProps
{
    children: React.ReactElement | []
}