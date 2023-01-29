import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import DrawerHeader from '../components/DrawerHeader';

const Contents = () => {
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
			<Skeleton variant="rounded" width={210} height={60} />
			<Skeleton variant="rounded" width={210} height={60} />
			<Skeleton variant="rounded" width={210} height={60} />
		</Box>
	);
};

export default Contents;
