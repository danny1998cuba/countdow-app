import {
    createHashRouter, createRoutesFromElements,
    Route, Navigate
} from 'react-router-dom'
import { Countdown, Design, Home, MyCountdowns, Settings } from '../pages'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route key='home' path='' element={<Home />} />
            <Route key='countdown' path='countdown' element={<Countdown />} />
            <Route key='settings' path='settings' element={
                <ProtectedRoute>
                    <Settings />
                </ProtectedRoute>} />
            <Route key='design' path='countdown/edit/:id' element={
                <ProtectedRoute>
                    <Design />
                </ProtectedRoute>} />
            <Route key='countdown' path='saved' element={
                <ProtectedRoute>
                    <MyCountdowns />
                </ProtectedRoute>} />
            <Route key='error' path="*" element={<Navigate to={`/`} replace={true} />} />
        </>
    )
);

