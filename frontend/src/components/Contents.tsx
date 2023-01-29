import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DrawerHeader from './DrawerHeader';

const Contents = () => {
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
			<Typography paragraph>main</Typography>
			<Typography paragraph>firstPage</Typography>
		</Box>
	);
};

export default Contents;
