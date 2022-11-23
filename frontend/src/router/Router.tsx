import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConstellationPage } from '../pages/ConstellationPage';
import { HomePage } from '../pages/HomePage';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='universe' element={<HomePage />}/>
                <Route path=':constellation' element={<ConstellationPage />}/>
            </Routes>
        </BrowserRouter>
    );
}