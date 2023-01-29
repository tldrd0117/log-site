import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import Button from '../components/Button';
import Switch from '../components/Switch';
import AppBar from '../components/OpenableAppBar';
import AppBarMenu from '../container/AppBarMenu';
import Contents from '../components/Contents';
import DashBoard from '../container/DashBoard';
import drawerMenu from '../resources/DrawerMenuInfo';
const PageDashBoard: React.FC = () => {
	return (
		<>
			<AppBarMenu title={'Dashboard'} drawerMenu={drawerMenu}>
				<DashBoard />
			</AppBarMenu>
		</>
	);
};

export default PageDashBoard;
