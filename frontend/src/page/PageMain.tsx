import React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import Button from '../components/Button';
import Switch from '../components/Switch';
import AppBar from '../components/OpenableAppBar';
import AppBarMenu from '../container/AppBarMenu';
import Contents from '../components/Contents';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import drawerMenu from '../resources/DrawerMenuInfo';
const PageMain: React.FC = () => {
	return (
		<>
			<AppBarMenu title={'Main'} drawerMenu={drawerMenu}>
				<Contents />
			</AppBarMenu>
		</>
	);
};

export default PageMain;
