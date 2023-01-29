import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import RouterInfo from './resources/RouterInfo';

const AppRouter = () => {
	return (
		<>
			<GlobalStyle />
			<RouterProvider router={createBrowserRouter(RouterInfo)} />
		</>
	);
};

export default AppRouter;
