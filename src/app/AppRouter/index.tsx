import { ReactNotifications } from 'react-notifications-component';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Page, ScrollToTop } from 'components';

//features
import Landing from 'src/features/LandingPage';
import MenuPage from 'src/features/MenuPage';
import SingleMenu from 'src/features/MenuPage/SingleMenu';
import ErrorPage from 'src/features/NotFoundRoute';
import RecipesPage from 'src/features/RecipesPage';
import SingleRecipePage from 'src/features/RecipesPage/SingleRecipePage';
import Library from 'features/Library';

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
            element: <RecipesPage />
          },
          {
            path: '/przepisy/:id',
            element: <SingleRecipePage />
          },
          {
            path: '/jadlospisy',
            element: <MenuPage />
          },
          {
            path: '/jadlospisy/:id',
            element: <SingleMenu />
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
