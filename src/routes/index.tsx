import {
    AccountPopover,
    AuthGuard,
    Box,
    Button, Card, CardContent,
    DashboardLayout, Icon,
    ListingLayout, Page,
    SearchInput, ToggleButton, ToggleButtonGroup, Typography,
    useAuth,
    useSettings,
    Router
} from "my-lib"
import React, {useState} from "react";
import {PATH_APP} from "./paths";
import navConfig from "./NavConfig";
import {ProductFinderModule} from "../modules/ProductFinder";
import {openModal} from "@slices/auth";
import {openModal as openModalPayment} from "@slices/payment";
import {LoginModal} from "@components/Auth/LoginModal";
import {RegisterModal} from "@components/Auth/RegisterModal";
import {PlanModal} from "@components/Payment/PlanModal";
import {UserModule} from "../modules/User";
import {RoleModule} from "../modules/Role";
import {PlanModule} from "../modules/Plan";
import {ELearningModule} from "../modules/ELearning";
import {ELearningResourcesTypeModule} from "../modules/ELearningResourcesType";
import {ToolsModule} from "../modules/Tools";
import {AdvertisingTypeModule} from "../modules/AdvertisingType";
import {CategoryModule} from "../modules/Category";
import {CampaignSupportCategoryModule} from "../modules/CampaignSupportCategory";
import {TargetGroupModule} from "../modules/TargetGroup";
import {TargetGroupTypeModule} from "../modules/TargetGroupType";
import {AdvertisementAssetModule} from "../modules/AdvertisementAsset";
import {ProductsModule} from "../modules/Products";
import {CategoryGroupModule} from "../modules/CategoryGroup";
import {CrawlingSourceModule} from "../modules/CrawlingSource";
import {SalaryModelModule} from "../modules/SalaryModel";
import {SourceModule} from "../modules/Source";
import {TrackingTypeModule} from "../modules/TrackingType";
import {RootModule} from "../modules/Root";
import {DashboardModule} from "../modules/Dashboard";
import {CampaignModule} from "../modules/Campaign";
import {SavedFilterModule} from "../modules/SavedFilter";
import {EventsModule} from "../modules/Events";
import {AccountModule} from "../modules/Account";
import {AdGeneratorTool} from "../modules/AdGeneratorTool";
/* PLOP_INJECT_TYPE_MODULE_IMPORT */
import {ToolTypeModule} from "../modules/ToolType";
import {ProfileSetupModal} from "@components/ProfileSetupModal";
import {IntroModal} from "@resources/Intro/components/IntroModal";

const { Outlet } = Router;

const MENU_OPTIONS = [
    {
        label: 'Dashboard',
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

    return <Page title={'something'}>
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
        {/*<Box>*/}
        {/*    <ToggleButtonGroup*/}
        {/*        // color="secondary"*/}
        {/*        value={themeMode}*/}
        {/*        exclusive*/}
        {/*        onChange={onChangeMode}*/}
        {/*        sx={{ width: "80px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}*/}
        {/*    >*/}
        {/*        <ToggleButton sx={{ height: "100%" }} value="dark">*/}
        {/*            <Icon*/}
        {/*                icon={'ph:moon-duotone'}*/}
        {/*            /></ToggleButton>*/}
        {/*        <ToggleButton sx={{ height: "100%" }} value="light">*/}
        {/*            <Icon*/}
        {/*                icon={'ph:sun-duotone'}*/}
        {/*            />*/}
        {/*        </ToggleButton>*/}
        {/*    </ToggleButtonGroup>*/}
        {/*</Box>*/}
        {!(!!user) && <Box>
            {/*Register*/}
            {/*<Button variant="text" onClick={() => {*/}
            {/*    openModalPayment()*/}
            {/*}}>Pricing</Button>*/}
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
        {/*<Box>*/}
        {/*    <ToggleButtonGroup*/}
        {/*        // color="secondary"*/}
        {/*        value={themeMode}*/}
        {/*        exclusive*/}
        {/*        onChange={onChangeMode}*/}
        {/*        sx={{ width: "80px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}*/}
        {/*    >*/}
        {/*        <ToggleButton sx={{ height: "100%" }} value="dark">*/}
        {/*            <Icon*/}
        {/*                icon={'ph:moon-duotone'}*/}
        {/*            /></ToggleButton>*/}
        {/*        <ToggleButton sx={{ height: "100%" }} value="light">*/}
        {/*            <Icon*/}
        {/*                icon={'ph:sun-duotone'}*/}
        {/*            />*/}
        {/*        </ToggleButton>*/}
        {/*    </ToggleButtonGroup>*/}
        {/*</Box>*/}
        <AccountPopover menuOptions={MENU_OPTIONS}/>
    </>
};

export const routes = [
    {
        element: <>
            <ProfileSetupModal />
            <IntroModal />
            <Outlet />
        </>,
        children: [
            {
                path: "/app",
                element: <AuthGuard>
                    <DashboardLayout rightElements={[<RightElements key={2}/>]} paths={PATH_APP} navConfig={navConfig}
                                     menuOptions={MENU_OPTIONS}/>
                </AuthGuard>,
                children: [
                    <MyIndexComp/>,
                    RootModule,
                    DashboardModule,
                    AccountModule,
                    AdvertisingTypeModule,
                    AdvertisementAssetModule,
                    CampaignModule,
                    CampaignSupportCategoryModule,
                    CategoryModule,
                    CategoryGroupModule,
                    CrawlingSourceModule,
                    EventsModule,
                    ELearningModule,
                    ELearningResourcesTypeModule,
                    PlanModule,
                    ProductsModule,
                    RoleModule,
                    SalaryModelModule,
                    SavedFilterModule,
                    SourceModule,
                    TargetGroupModule,
                    TargetGroupTypeModule,
                    ToolsModule,
                    TrackingTypeModule,
                    UserModule,
                    AdGeneratorTool,
                    /* PLOP_INJECT_TYPE_MODULE_REGISTER */
                    ToolTypeModule,
                ]
            },
            {
                path: "",
                element: <Page title={"Products"}>
                    <ListingLayout navConfig={navConfig} menuOptions={MENU_OPTIONS}
                                   centerElements={[<SearchInput key={1}/>]}
                                   rightElements={[<RightElementsProductFinder key={2}/>]}/>
                    <LoginModal/>
                    <RegisterModal/>
                    <PlanModal/>
                </Page>,
                children: [
                    ProductFinderModule
                ]
            }
        ]
    }
];