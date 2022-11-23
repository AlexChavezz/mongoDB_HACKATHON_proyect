import { MainContainer } from '../components/MainContainer';
import { useParams } from 'react-router-dom';

export const ConstellationPage = () => {
    const { constellation } = useParams();
    return (
        <MainContainer>
            {
                constellation
            }
        </MainContainer>
    );
}