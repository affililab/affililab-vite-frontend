import React, {useState, useEffect, FC} from "react";
import {useTheme, Box, Icon, Tab, Tabs, Scrollbar, Grid} from "my-lib";
import {capitalCase} from "change-case";
import {ListView} from "../ListView"
import {ChartView} from "../ChartView"
import {TableView} from "../TableView"

export const Comparison: FC<any> = ({
                               isModalOpen,
                               handleCloseModal,
                               addToCampaign,
                               currentTab,
                               setCurrentTab,
                               toggleDetailedModal,
                               items,
                               compareViewTrigger,
                               noticedPartnerPrograms,
                               toggleNoticedPartnerProgram
                           }) => {

    const [initial, setInitial] = useState(false);

    // tabs
    const COMPARISON_TABS = [
        {
            value: 'Liste',
            icon: <Icon icon={'bi:view-list'} width={20} height={20}/>,
            component: <ListView addToCampaign={addToCampaign} toggleDetailedModal={toggleDetailedModal} items={items} noticedPartnerPrograms={noticedPartnerPrograms}
                                 toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}/>
        },
        {
            value: 'Tabelle',
            icon: <Icon icon={'bi:table'} width={20} height={20}/>,
            component: <TableView items={items} addToCampaign={addToCampaign} toggleDetailedModal={toggleDetailedModal}  noticedPartnerPrograms={noticedPartnerPrograms}
                                  toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} />
        },
        // {
        //     value: 'Graphen',
        //     icon: <Icon icon={'bi:bar-chart'} width={20} height={20}/>,
        //     component: <ChartView items={items} noticedPartnerPrograms={noticedPartnerPrograms}/>
        // }
        // TODO: activate when we have enough information to display that in a nice way
    ];

    const theme = useTheme();

    useEffect(() => {
        if (compareViewTrigger > 0) setCurrentTab("Graphen")
    }, [compareViewTrigger])

    return <Box sx={{width: "100%"}}>
        <Tabs
            sx={{px: 2, boxShadow: theme.customShadows.z12,}}
            value={currentTab}
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            onChange={(e, value) => setCurrentTab(value)}>
            {COMPARISON_TABS.map((tab, index) => (
                <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
            ))}
        </Tabs>
        <Box sx={{height: "724px", background: theme.palette.background.neutral}}>
            <Scrollbar>
                <Box sx={{p: 4}}>
                    <Grid sx={{ height: "100%" }} container direction="column">
                        {COMPARISON_TABS.find((tab) => tab.value === currentTab)?.component}
                    </Grid>
                </Box>
            </Scrollbar>
        </Box>
    </Box>
};