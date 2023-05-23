import {
    createRoutesFromElements,
    Route, Navigate, createBrowserRouter
} from 'react-router-dom'
import { Countdown, CountdownId, Design, Home, MyCountdowns, Settings } from '../pages'
import { ProtectedRoute } from './ProtectedRoute'
import { CountdownService } from '../data/services';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route key='home' path='' element={<Home />} />
            <Route key='countdown' path='countdown' element={<Countdown />} />
            <Route key='countdown_id' path='countdown/:id' element={<CountdownId />}
                loader={async ({ params }) => {
                    try {
                        let res = await CountdownService.getOne(params.id)
                        return res
                    } catch (error) {
                        throw new Response("Not Found", { status: 404 });
                    }
                }}
                errorElement={<Navigate to={'/'} replace={true} />}
            />
            <Route key='settings' path='settings' element={
                <ProtectedRoute Component={Settings} />} />
            <Route key='design' path='countdown/edit/:id' element={
                <ProtectedRoute Component={Design} />}
                loader={async ({ params }) => {
                    try {
                        let res = await CountdownService.getOne(params.id)
                        console.log(res);
                        return res
                    } catch (error) {
                        throw new Response("Not Found", { status: 404 });
                    }
                }}
                errorElement={<Navigate to={'/'} replace={true} />}
            />
            <Route key='saved' path='saved' element={
                <ProtectedRoute Component={MyCountdowns} />} />
            <Route key='error' path="*" element={<Navigate to={`/`} replace={true} />} />
        </>
    )
);

