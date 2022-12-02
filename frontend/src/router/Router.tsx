import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page404 } from '../pages/404';
import { ItemPage } from '../pages/ItemPage';
import { HomePage } from '../pages/HomePage';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='universe' element={<HomePage />} />
                <Route path='universe/:constellation' element={<ItemPage />} />
                <Route path='*' element={<Page404/>} />
            </Routes>
        </BrowserRouter>
    );
}