import React, {FC, useEffect, useState} from "react";
import {Box, Icon, Tab, TabList, TabContext, TabPanel, Tabs, useTheme} from "my-lib";
import {capitalCase} from "change-case";
import {ListView, ListViewMemo} from "../ListView"
import {TableView, TableViewMemo} from "../TableView"

export const Comparison: FC<any> = ({
                                        isModalOpen,
                                        handleCloseModal,
                                        selected,
                                        setSelected,
                                        addToCampaign,
                                        toggleDetailedModal,
                                        items,
                                        compareViewTrigger,
                                        noticedPartnerPrograms,
                                        toggleNoticedPartnerProgram
                                    }) => {

    const [currentTab, setCurrentTab] = useState('Liste');

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
                active={currentTab === 'Liste'}
                items={items}
                selectedItems={selected}
                toggleSelected={toggleSelected}
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            />
            // component: <TableView
            //     selectedItems={selected}
            //     handleSelected={setSelected}
            //     items={items}
            //     addToCampaign={addToCampaign}
            //     toggleDetailedModal={toggleDetailedModal}
            //     noticedPartnerPrograms={noticedPartnerPrograms}
            //     toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            // />
        },
        {
            value: 'Tabelle',
            full: true,
            icon: <Icon icon={'bi:table'} width={20} height={20}/>,
            component: <TableViewMemo
                selectedItems={selected}
                handleSelected={setSelected}
                items={items}
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            />
            // component: <ListView
            //     items={items}
            //     selectedItems={selected}
            //     toggleSelected={toggleSelected}
            //     addToCampaign={addToCampaign}
            //     toggleDetailedModal={toggleDetailedModal}
            //     noticedPartnerPrograms={noticedPartnerPrograms}
            //     toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
            // />
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
    }, [compareViewTrigger]);

    useEffect(() => {
        setInitial(true);
    }, []);

    const currentTabObject = COMPARISON_TABS.find((tab) => tab.value === currentTab);

    return <Box sx={{width: "100%"}}>
        <TabContext value={currentTab}>
            <TabList
                sx={{px: 2, boxShadow: theme.customShadows.z12}}
                value={currentTab}
                allowScrollButtonsMobile
                onChange={(e, value) => setCurrentTab(value)}>
                {COMPARISON_TABS.map((tab, index) => (
                    <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
                ))}
            </TabList>


            {COMPARISON_TABS.map((tab, index) => <Box key={index} sx={{display: currentTab === tab.value ? "block" : "none" , height: "70vh", background: (theme: any) => theme.palette.background.neutral}}>
                {tab.component}
            </Box>)}
        </TabContext>
    </Box>
};