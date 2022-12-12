import React, {FC, useEffect, useState} from "react";
import {Box, Button, DialogAnimate, DialogTitle, useTheme} from "my-lib";
import {Comparison} from "./Comparison"
import {useTriggerHook} from "./hook"

const ModalContent: FC<any> = ({
                          isModalOpen,
                          addToCampaign,
                          handleCloseModal,
                          noticedPartnerPrograms,
                          toggleDetailedModal,
                          toggleNoticedPartnerProgram
                      }) => {

    const theme = useTheme();
    const [items, setItems] = useState(noticedPartnerPrograms);
    const [compareViewTrigger, setCompareViewTrigger] = useTriggerHook();
    // tabs
    const [currentTab, setCurrentTab] = useState('Liste');

    useEffect(() => {
        setItems(noticedPartnerPrograms);
    }, [handleCloseModal, isModalOpen]);

    return <>
        <Comparison addToCampaign={addToCampaign} items={items} toggleDetailedModal={toggleDetailedModal} currentTab={currentTab}
                    setCurrentTab={setCurrentTab} noticedPartnerPrograms={noticedPartnerPrograms}
                    compareViewTrigger={compareViewTrigger} toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}/>
        {/*<Box sx={{ background: theme.palette.background.neutral, height: "512px" }} px={4}>*/}
        <Box sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            px: 4,
            boxShadow: theme.customShadows.z12,
        }}>
            <Box sx={{justifySelf: "flex-end"}}>
                <Button onClick={() => {
                    setCurrentTab("Graphen")
                }} variant="text">
                    Vergleichen
                </Button>
                <Button onClick={() => { addToCampaign() }} variant="contained">
                    Zu Kampagne hinzufügen
                </Button>
            </Box>
        </Box></>
}

export const NoticedPartnerProgramsModal: FC<any> = ({
                                                isModalOpen,
                                                addToCampaign,
                                                handleCloseModal,
                                                toggleDetailedModal,
                                                noticedPartnerPrograms,
                                                toggleNoticedPartnerProgram
                                            }) => {

    return (
        <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle sx={{py: 2}}>Gemerkte Partnerprogramme ansehen</DialogTitle>
            <ModalContent
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}/>
        </DialogAnimate>
    )
};

