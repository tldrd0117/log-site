import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const App = (
	<>
		<React.StrictMode>
			<AppRouter />
		</React.StrictMode>
	</>
);
root.render(App);
