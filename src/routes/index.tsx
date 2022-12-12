import {
    AccountPopover,
    AuthGuard,
    Box,
    Button, Card, CardContent,
    DashboardLayout, Icon,
    ListingLayout, Page,
    SearchInput, ToggleButton, ToggleButtonGroup, Typography,
    useAuth,
    useSettings
} from "my-lib";
import React, {useState} from "react";
import {PATH_APP} from "./paths";
import navConfig from "./NavConfig";
import {ProductFinderModule} from "../modules/ProductFinder";
import {openModal} from "@slices/auth";
import {openModal as openModalPayment} from "@slices/payment";
import {LoginModal} from "@components/Auth/LoginModal";
import {RegisterModal} from "@components/Auth/RegisterModal";
import {PlanModal} from "@components/Payment/PlanModal";
import {UserManagementModule} from "../modules/UserManagement";

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
    </Page>
};

const RightElementsProductFinder = () => {
    const { user } = useAuth();
    const {themeMode, onChangeMode} = useSettings();
    return <>
        <Box>
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
        </Box>
        {!(!!user) && <Box>
            {/*Register*/}
            <Button variant="text" onClick={() => {
                openModalPayment()
            }}>Pricing</Button>
        </Box>}
        {!(!!user) && <Box>
            {/*Login*/}
            <Button variant="text" onClick={() => {
                openModal()
            }}>Login</Button>
        </Box>}
        {!(!!user) && <Box>
            {/*Register*/}
            <Button variant="text" onClick={() => {
                openModal("register")
            }}>Register</Button>
        </Box>}
        {!!user && <AccountPopover menuOptions={MENU_OPTIONS}/>}
    </>
};

const RightElements = () => {
    const { user } = useAuth();
    const {themeMode, onChangeMode} = useSettings();
    return <>
        <Box>
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
        </Box>
    </>
};

export const routes = [
    {
        path: "/app",
        element: <AuthGuard>
            <DashboardLayout centerElements={[<SearchInput key={1} />]} rightElements={[<RightElements key={2} />]} paths={PATH_APP} navConfig={navConfig} menuOptions={MENU_OPTIONS} />
        </AuthGuard>,
        children: [
            <MyIndexComp />,
            UserManagementModule
        ]
    },
    {
        path: "/",
        element: <>
            <ListingLayout centerElements={[<SearchInput key={1} />]} rightElements={[<RightElementsProductFinder key={2} />]} />
            <LoginModal />
            <RegisterModal />
            <PlanModal />
            </>,
        children: [
            ProductFinderModule
        ]
    }
];