import React, {FC, useEffect, useState} from "react";
import {Box, Grid, Icon, Scrollbar, Tab, Tabs, useTheme} from "my-lib";
import {capitalCase} from "change-case";
import {ListView} from "../ListView"
import {TableView} from "../TableView"

export const Comparison: FC<any> = ({
                                        isModalOpen,
                                        handleCloseModal,
                                        selected,
                                        setSelected,
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
    const toggleSelected = (item: string) => {
        setSelected(selected.includes(item) ? selected.filter((i) => i !== item) : [...selected, item]);
    };


    // tabs
    const COMPARISON_TABS = [
        {
            value: 'Liste',
            icon: <Icon icon={'bi:view-list'} width={20} height={20}/>,
            component: <ListView
                items={items}
                selectedItems={selected}
                toggleSelected={toggleSelected}
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            />
        },
        {
            value: 'Tabelle',
            full: true,
            icon: <Icon icon={'bi:table'} width={20} height={20}/>,
            component: <TableView
                selectedItems={selected}
                handleSelected={setSelected}
                items={items}
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            />
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

    const currentTabObject = COMPARISON_TABS.find((tab) => tab.value === currentTab);

    return <Box sx={{width: "100%"}}>
        <Tabs
            sx={{px: 2, boxShadow: theme.customShadows.z12}}
            value={currentTab}
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            onChange={(e, value) => setCurrentTab(value)}>
            {COMPARISON_TABS.map((tab, index) => (
                <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
            ))}
        </Tabs>
        {currentTabObject?.full && <Box sx={{background: theme.palette.background.neutral}}>
            {currentTabObject.component}
        </Box>}

        {!currentTabObject?.full && <Box sx={{height: "70vh", background: theme.palette.background.neutral}}>
            <Scrollbar>
                <Box sx={{p: 4}}>
                    <Grid sx={{height: "100%"}} container direction="column">
                        {currentTabObject?.component}
                    </Grid>
                </Box>
            </Scrollbar>
        </Box>}
    </Box>
};