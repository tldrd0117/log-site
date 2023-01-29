import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const drawerMenuInfo = [
	[
		{
			name: 'dashboard',
			icon: <DashboardOutlinedIcon />,
			path: '/dashboard',
		},
		{
			name: 'tree',
			icon: <AccountTreeOutlinedIcon />,
			path: '/tree',
		},
		{
			name: 'recent',
			icon: <FormatListNumberedIcon />,
			path: '/recent',
		},
	],
];
export default drawerMenuInfo;
