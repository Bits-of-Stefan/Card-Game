import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from 'react-router-dom';

import App from '@/App';
import Landing from '@/pages/landing/Landing';
import NotFound from '@/pages/not-found/NotFound';
import { PageRoute } from '@/types';

export const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path={PageRoute.LANDING} element={<App />}>
      <Route index element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
