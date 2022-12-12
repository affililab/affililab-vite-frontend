import React, {FC, useState} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate,
} from "my-lib"
import { CampaignNewForm } from "../CampaignForm"

export const Modal: FC<any> = ({ update, item, isModalOpen, handleCloseModal }) => {

    return <DialogAnimate open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{ update ? "Update" : "Create"}  Campaign</DialogTitle>
        <Box my={4}>
            <CampaignNewForm isEdit={update} currentCampaign={item} onFinish={() => { handleCloseModal(); }} />
        </Box>
    </DialogAnimate>
};
