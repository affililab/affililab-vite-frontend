import {Box, DialogAnimate} from "my-lib";
import React, {FC} from "react";
import {Content} from "./Content";

export const PartnerProgramModal: FC<any> = ({ toggleModal, actionItems, isModalOpen, handleCloseModal, toggleNoticedPartnerProgram, isNoticed, partnerprogram }) => {

    return   <DialogAnimate  maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
        {/*{!!partnerprogram && <PartnerProgramsItem*/}
        {/*    toggleModal={toggleModal}*/}
        {/*    toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}*/}
        {/*    isNoticed={isNoticed}*/}
        {/*    partnerprogram={partnerprogram}*/}
        {/*    detailed*/}
        {/*/>}*/}
        <Box sx={{ width: "100%", height: "100%" }} p={2}>
            {!!partnerprogram && <Content
                item={partnerprogram}
                toggleModal={toggleModal}
                toggleNoticed={toggleNoticedPartnerProgram}
                isNoticed={isNoticed}
                active={isModalOpen}
                actionItems={actionItems}
            />}
        </Box>
    </DialogAnimate>
}