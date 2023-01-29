import React, { ReactNode } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export interface MenuDrawerItemProps {
	name: string;
	path?: string;
	icon?: ReactNode;
	open?: boolean;
}

const MenuDrawerItem = (props: MenuDrawerItemProps) => {
	const { name, path, icon, open } = props;
	return (
		<>
			<ListItem key={name} disablePadding sx={{ display: 'block' }}>
				<ListItemButton
					component={RouterLink as any}
					to={path}
					sx={{
						minHeight: 48,
						justifyContent: open ? 'initial' : 'center',
						px: 2.5,
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: open ? 3 : 'auto',
							justifyContent: 'center',
						}}
					>
						{icon}
					</ListItemIcon>
					<ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
				</ListItemButton>
			</ListItem>
		</>
	);
};

export default MenuDrawerItem;
