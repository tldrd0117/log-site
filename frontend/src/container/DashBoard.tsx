import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import DrawerHeader from '../components/DrawerHeader';
import ContentsListItem from '../components/ContentsListItem'
import Grid from '@mui/material/Grid'
import WriteButton from '../components/WriteButton'
import Button from '../components/Button'

const Contents = () => {
	return (
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
            <WriteButton/>
            <Grid my={1} overflow={"hidden"} container spacing={2}>
                <Grid item xs={4}>
                    <ContentsListItem/>
                </Grid>
                <Grid item xs={4}>
                    <ContentsListItem/>
                </Grid>
                <Grid item xs={4}>
                    <ContentsListItem/>
                </Grid>
            </Grid>
		</Box>
	);
};

export default Contents;
