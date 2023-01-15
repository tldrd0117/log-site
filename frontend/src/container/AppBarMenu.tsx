import React from "react";
import OpenableAppBar from "../components/OpenableAppBar";
import MenuDrawer from "../components/MenuDrawer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Contents from "../components/Contents"

const AppBarMenu = () =>{
    const drawerMenu = {

    }
    const appBarMenu = {

        
    }
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return <>

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <OpenableAppBar drawerWidth={240} open={open} handleDrawerOpen={handleDrawerOpen}/>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose}/>
            <Contents/>
        </Box>
    </>
}

export default AppBarMenu