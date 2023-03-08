import { ReactNotifications } from 'react-notifications-component';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Page, ScrollToTop } from 'components';

//features
import Landing from 'src/features/LandingPage';
import MenuPage from 'src/features/MenuPage';
import ErrorPage from 'src/features/NotFoundRoute';
import RecipesPage from 'src/features/RecipesPage';
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
						element: <Landing />,
					},
					{
						path: '/lib',
						element: <Library />,
					},
					{
						path: '/przepisy',
						element: <RecipesPage />,
					},
					{
						path: '/jadlospisy',
						element: <MenuPage />,
					},
				],
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
