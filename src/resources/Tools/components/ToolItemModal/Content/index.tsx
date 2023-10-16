import React, {FC, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    fRenderedHTML,
    Grid,
    Icon,
    Image,
    makeStyles,
    Scrollbar,
    styled,
    Tab,
    Tabs,
    ToggleButton,
    Tooltip,
    Typography,
    useAuth,
    capitalCase, IconButton
} from "my-lib";
import {partnerProgramsBackend} from "@config";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    cover: {
        width: "100%",
        height: "256px",
        position: "relative",
    }
}));

const ActionButtonsContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.spacing(2)
}));

const LogoCircle = styled(Box)(({theme}) => ({
    display: "flex",
    borderRadius: 100,
    background: "rgb(255, 255, 255)",
    justifyContent: "center",
    alignItems: "center",
    width: "128px",
    height: "128px",
    marginBottom: "-64px",
    border: "1px solid " + theme.palette.divider,
    padding: theme.spacing(2),
    overflow: "hidden"
}));

export const Content: FC<any> = ({
                            item,
                            handleClose,
                            addToCampaign,
                            actionItems = [
                                (item, isAuthenticated) => (isAuthenticated && addToCampaign) &&
                                    <IconButton aria-label="close" onClick={() => addToCampaign(item)}>
                                        <Icon width={32} height={32} icon={"codicon:add"}/>
                                    </IconButton>
                            ]
}) => {

    const classes = useStyles();

    const { isAuthenticated } = useAuth();

    const {
        description
    } = item;

    const [currentTab, setCurrentTab] = useState('General');

    const INFORMATION_TABS = [
        {
            value: "General",
            icon: <Icon icon={'charm:credit-card'} width={20} height={20}/>,
            component: <Box sx={(theme) => ({
                width: "100%",
                minHeight: "256px",
                maxHeight: "256px",
                borderRadius: "2px"
            })}>
                <Scrollbar
                    sx={(theme) => ({
                        // maxHeight: "256px",
                        minHeight: "256px",
                        maxHeight: "256px",
                        "ul": {
                            marginLeft: "2rem"
                        }
                    })}
                    forceVisible="y" autoHide={true}>
                    <Box
                        py={2}
                        px={6}
                        sx={(theme) => ({
                            minHeight: "256px",
                            height: "100%",
                            borderRadius: "2px",
                            bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[500_48] : theme.palette.background.neutral
                        })}
                    >
                        <Typography variant={"body2"} component="span" sx={(theme) => ({
                            bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[500_48] : theme.palette.background.neutral
                        })}>
                            {fRenderedHTML(description)}
                        </Typography>
                    </Box>
                </Scrollbar>
            </Box>
        },
        {
            value: "Features",
            icon: <Icon icon={'fluent:production-24-regular'} width={20} height={20}/>,
            component: <>
                { item?.features?.map(featureItem => <Accordion>
                        <AccordionSummary
                            expandIcon={<Icon icon={'ep:arrow-down'} width={20} height={20} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{featureItem.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {fRenderedHTML(featureItem.description)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )}
            </>
        }
    ];

    return <>
        {/* TODO: Top Cover */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2  }}>
            <Button size="large" color="info" href={item.link}  variant="contained" target="_blank"><Icon width={18} height={18} icon={"ph:link-bold"} mr={1} /> Get Tool</Button>
            <ActionButtonsContainer>
                {actionItems.map(actionItem => actionItem(item, isAuthenticated))}
                <IconButton aria-label="close" onClick={handleClose}>
                    <Icon width={42}
                          height={42}
                          icon={'ei:close'} />
                </IconButton>
            </ActionButtonsContainer>
        </Box>
        <Box className={classes.cover}>
            { item.cover && <Image sx={{ position: "absolute", inset: 0 }} src={item.cover?.includes("http") ? item.cover : partnerProgramsBackend.filesEndpoint + item.cover} />}
            {/* TODO: Logo */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 0, right: 0, left: 0 }}>
                <LogoCircle>
                    <Image style={{ height: "100%", width: "100%" }} src={item.logo?.includes("http") ? item.logo : partnerProgramsBackend.filesEndpoint + item.logo} />
                </LogoCircle>
            </Box>
        </Box>
        {/* TODO: categories */}
        <Box p={4}>
            <Grid sx={{ maxWidth: "284px" }} spacing={1} container>
                {item.categories.map((valueItem, index) => <Grid item><Chip key={index}
                                                              sx={{maxWidth: "212px"}}
                                                              size="small"
                                                              title={`${valueItem.title}`}
                                                              label={`${valueItem.title}`}/></Grid>)}
            </Grid>
        </Box>

        {/* TODO: Information Tabs */}
        <Box p={4}>
            <Tabs
                mt={2}
                value={currentTab}
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                onChange={(e, value) => setCurrentTab(value)}>
                {INFORMATION_TABS.map((tab, index) => (
                    <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
                ))}
            </Tabs>
            <Box mt={2}>
                {INFORMATION_TABS.find(tab => tab.value === currentTab)?.component}
            </Box>
        </Box>
    </>
}