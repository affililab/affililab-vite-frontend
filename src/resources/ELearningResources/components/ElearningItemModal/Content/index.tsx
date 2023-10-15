import React, { useState } from "react";
import {
    makeStyles,
    Box,
    Image,
    Icon,
    Scrollbar,
    Typography,
    Tabs,
    Tab,
    Button,
    ToggleButton,
    Tooltip,
    styled,
    useAuth,
    Accordion,
    AccordionSummary,
    AccordionDetails, Grid, Chip, fRenderedHTML, IconButton
} from "my-lib";
import {partnerProgramsBackend} from "@config";
import {capitalCase} from "change-case";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    cover: {
        width: "100%",
        height: "256px",
        position: "relative"
    }
}));

const ActionButtonsContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2)
}));

const LogoCircle = styled(Box)(({theme}) => ({
    display: "flex",
    borderRadius: 100,
    background: "rgb(255, 255, 255)",
    color: theme.palette.grey[800],
    justifyContent: "center",
    alignItems: "center",
    width: "128px",
    height: "128px",
    marginBottom: "-64px",
    padding: theme.spacing(2)
}));

export const Content = ({
                            item,
                            handleClose,
                            addToCampaign,
                            actionItems = [
                                (item, isAuthenticated) => (isAuthenticated && addToCampaign) && <IconButton aria-label="close" onClick={() => addToCampaign(item)}>
    <Icon width={32} height={32} sx={(theme) => ({
        color: theme.palette.primary.dark
    })} icon={"codicon:add"}/>
</IconButton>
                            ]
}) => {

    const classes = useStyles();

    const { isAuthenticated } = useAuth();

    const {
        title,
        description
    } = item;

    const [currentTab, setCurrentTab] = useState('General');

    const INFORMATION_TABS = [
        {
            value: "General",
            icon: <Icon icon={'charm:credit-card'} width={20} height={20}/>,
            component: <Box sx={(theme) => ({
                width: "100%",
                minHeight: "124px",
                maxHeight: "124px",
                borderRadius: "2px"
            })}>
                <Scrollbar
                    sx={(theme) => ({
                        // maxHeight: "256px",
                        minHeight: "124px",
                        height: "124px",
                        "ul": {
                            marginLeft: "2rem"
                        }
                    })}
                    forceVisible="y" autoHide={true}>
                    <Box
                        py={2}
                        px={6}
                        sx={(theme) => ({
                            minHeight: "124px",
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
            value: "What you will learn",
            icon: <Icon icon={'dashicons:welcome-learn-more'} width={20} height={20}/>,
            component: <>
                { item?.learnAssets?.map((featureItem, index) => <Accordion key={index}>
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
        <Box className={classes.cover}>
            { item.cover && <Image sx={{ position: "absolute", inset: 0 }} src={item.cover?.includes("http") ? item.cover : partnerProgramsBackend.filesEndpoint + item.cover} />}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "absolute", height: "auto", top: 0, right: 0, left: 0, background: "rgba(0,0,0,.66)", p: 2  }}>
                <Button color="info" href={item.link}  variant="contained" target="_blank" size="medium">Go to E-Learning Resource</Button>
                <ActionButtonsContainer>
                    {actionItems.map((actionItem, key) => <Box key={"index"}>{actionItem(item, isAuthenticated)}</Box>)}
                    <IconButton aria-label="close" onClick={handleClose}>
                        <Icon width={42}
                              height={42}
                              icon={'ei:close'}/>
                    </IconButton>
                </ActionButtonsContainer>
            </Box>
            {/* TODO: Logo */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 0, right: 0, left: 0 }}>
                <LogoCircle>
                    <Typography sx={(theme) => ({ color: theme.palette.grey[800] })} variant="subtitle1">{title}</Typography>
                </LogoCircle>
            </Box>
        </Box>
        {/* TODO: categories */}
        <Box p={4}>
            <Grid sx={{ maxWidth: "284px" }} spacing={1} container>
                {item.categories.map((valueItem, index) => <Grid key={index} item><Chip
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