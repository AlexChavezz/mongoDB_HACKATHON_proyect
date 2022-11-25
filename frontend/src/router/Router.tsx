import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page404 } from '../pages/404';
import { ConstellationPage } from '../pages/ConstellationPage';
import { HomePage } from '../pages/HomePage';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='universe' element={<HomePage />} />
                <Route path='universe/:constellation' element={<ConstellationPage />} />
                <Route path='*' element={<Page404/>} />
            </Routes>
        </BrowserRouter>
    );
}