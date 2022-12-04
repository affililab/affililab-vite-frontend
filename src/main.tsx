import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {
    AppProvider,
    Box,
    Button,
    FabButtonAnimate,
    Icon,
    Page,
    ToggleButton,
    ToggleButtonGroup,
    useSettings,
    DashboardLayout, Card, CardContent, CardHeader, Typography
} from "my-lib";
import {store, persistor} from './redux';
import {PATH_APP} from "./routes/paths"
import navConfig from './routes/NavConfig';
import "typeface-inter";
import 'simplebar-react/dist/simplebar.min.css';

const MyIndexComp = () => {
    const  [toggle, setToggle] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {themeMode, onChangeMode} = useSettings();

    return <Page title={'something'} sx={{ height: 1 }}>
        <Card sx={{height: 1}}>
            <CardContent>
                <Typography variant={'h6'} color={'text.secondary'}>Checking height</Typography>
                <ToggleButtonGroup
                    // color="secondary"
                    value={themeMode}
                    exclusive
                    onChange={onChangeMode}
                    sx={{ width: "80px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}
                >
                    <ToggleButton sx={{ height: "100%" }} value="dark">
                        <Icon
                            icon={'ph:moon-duotone'}
                        /></ToggleButton>
                    <ToggleButton sx={{ height: "100%" }} value="light">
                        <Icon
                            icon={'ph:sun-duotone'}
                        />
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={() => { setToggle(toggle) }} >Button</Button>
            </CardContent>
        </Card>
        {/*<Box sx={{ position: "fixed", bottom: (theme: any) => theme.spacing(6), right: (theme: any) => theme.spacing(6), zIndex: 1002 }}>*/}
        {/*    <FabButtonAnimate onClick={() => setIsModalOpen(true)} variant="extended" size="medium" color="primary">*/}
        {/*        <Icon icon="bxs:magic-wand" width={24} height={24} />*/}
        {/*        help finding product*/}
        {/*    </FabButtonAnimate>*/}
        {/*</Box>*/}
    </Page>;
};

const MENU_OPTIONS = [
    {
        label: 'Product Finder',
        linkTo: '/',
    },
    {
        label: 'App',
        linkTo: '/app',
    },
    {
        label: 'Profile',
        linkTo: '/app/account',
    }
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AppProvider logoSettings={{ small:  'http://localhost:3000/static/brand/logo.svg', big: 'http://localhost:3000/static/brand/logo_full.svg' }} store={store} persistor={persistor} apiURL={'http://localhost:4000/graphql'} routes={[
            {
                path: "/",
                element: <DashboardLayout paths={PATH_APP} navConfig={navConfig} menuOptions={MENU_OPTIONS} />,
                children:[
                    {
                        path: "",
                        element: <MyIndexComp />
                    }
                ]
            },
            {
                path: "/something",
                element: <MyIndexComp />
            }
        ]} />
    </React.StrictMode>
);
