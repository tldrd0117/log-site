import React, { ReactNode } from 'react';
import OpenableAppBar from '../components/OpenableAppBar';
import MenuDrawer from '../components/MenuDrawer';
import { MenuDrawerItemProps } from '../components/MenuDrawerItem';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

interface AppBarMenuProps {
	title?: string;
	children?: ReactNode;
	drawerMenu?: Array<Array<MenuDrawerItemProps>>;
	appBarMenu?: Array<{}>;
}

const AppBarMenu = (props: AppBarMenuProps) => {
	const { drawerMenu, appBarMenu, title } = props;
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Box sx={{ display: 'flex' }} key={title}>
				<CssBaseline />
				<OpenableAppBar title={title} drawerWidth={240} open={open} handleDrawerOpen={handleDrawerOpen} />
				<MenuDrawer key={title} drawerMenu={drawerMenu} open={open} handleDrawerClose={handleDrawerClose} />
				{props.children}
			</Box>
		</>
	);
};

export default AppBarMenu;
