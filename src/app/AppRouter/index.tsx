import { ReactNotifications } from 'react-notifications-component';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Page, ScrollToTop } from 'components';

//features
import Landing from 'src/features/LandingPage';
import ErrorPage from 'src/features/NotFoundRoute';
import Library from 'features/Library';
import RecepiesPage from 'src/features/RecepiesPage';

const RouterComponents = () => (
  <>
    <ScrollToTop />
    <ReactNotifications />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <RouterComponents />,
    children: [
      {
        path: '/',
        element: <Page />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <Landing />
          },
          {
            path: '/lib',
            element: <Library />
          },
          {
            path: '/przepisy',
            element: <RecepiesPage/>
          }
        ]
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
