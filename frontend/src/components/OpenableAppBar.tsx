import * as React from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

interface OpenableAppBarProps {
	title?: string;
	open?: boolean;
	drawerWidth?: number;
	handleDrawerOpen?: () => void;
}

interface BaseAppBarProps extends AppBarProps {
	drawerWidth?: number;
	open?: boolean;
}

const BaseAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<BaseAppBarProps>(({ theme, open, drawerWidth }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const OpenableAppBar = (props: OpenableAppBarProps) => {
	const { open, handleDrawerOpen, drawerWidth, title } = props;
	return (
		<>
			<BaseAppBar position="fixed" open={open} drawerWidth={drawerWidth}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						{title}
					</Typography>
				</Toolbar>
			</BaseAppBar>
		</>
	);
};

export default OpenableAppBar;
