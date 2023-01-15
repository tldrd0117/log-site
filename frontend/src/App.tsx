import React from "react";
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import Button from "./components/Button";
import Switch from "./components/Switch"
import AppBar from "./components/OpenableAppBar"
import GlobalStyle from "./components/GlobalStyle"
import AppBarMenu from "./container/AppBarMenu";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle/>
            <AppBarMenu/>
        </>
    )
};

export default App;