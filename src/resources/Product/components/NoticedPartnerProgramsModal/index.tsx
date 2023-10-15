import React, {FC, useEffect, useState} from "react";
import {Box, Button, DialogAnimate, DialogTitle, Icon, IconButton, useTheme} from "my-lib";
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

    const [selected, setSelected] = useState<string[]>([]);

    const theme = useTheme();
    const [items, setItems] = useState(noticedPartnerPrograms);
    const [compareViewTrigger, setCompareViewTrigger] = useTriggerHook();
    // tabs

    useEffect(() => {
        setItems(noticedPartnerPrograms);
    }, [handleCloseModal, isModalOpen]);

    return <Box sx={{overflow: "hidden"}}>
            <Comparison
            selected={selected}
            setSelected={setSelected}
            addToCampaigns={addToCampaign}
            items={items}
            toggleDetailedModal={toggleDetailedModal}
            noticedPartnerPrograms={noticedPartnerPrograms}
            compareViewTrigger={compareViewTrigger}
            toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} />
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
            boxShadow: theme.customShadows.z12,
        }}>
            <Box sx={{justifySelf: "flex-end",  width: "100%", justifyContent: "space-between", display: "flex", gap: (theme) => theme.spacing(2)}}>
                {/*<Button size={'large'} onClick={() => {*/}
                {/*    setCurrentTab("Graphen")*/}
                {/*}} variant="text">*/}
                {/*    Vergleichen*/}
                {/*</Button>*/}
                <Box></Box>
                <Button size={'large'} onClick={() => {
                    addToCampaign(selected)
                }} variant="contained">
                    Zu Kampagne hinzufügen
                    <Icon sx={{ml: 2}} width={24}
                          height={24}
                          icon={'codicon:add'}/>
                </Button>
            </Box>
        </Box></Box>
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
            <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                <DialogTitle variant={'subtitle1'}>Gemerkte Partnerprogramme ansehen</DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseModal}>
                    <Icon width={42}
                          height={42}
                          icon={'ei:close'}/>
                </IconButton>
            </Box>
            <ModalContent
                addToCampaign={addToCampaign}
                toggleDetailedModal={toggleDetailedModal}
                noticedPartnerPrograms={noticedPartnerPrograms}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
            />
        </DialogAnimate>
    )
};

