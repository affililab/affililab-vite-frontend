import React, {FC, useState} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate, IconButton, Icon,
} from "my-lib"
import { CampaignNewForm } from "../CampaignForm"

export const Modal: FC<any> = ({ update, item, isModalOpen, handleCloseModal }) => {

    return <DialogAnimate sx={{ height: "50vh" }} open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
            <DialogTitle>{ update ? "Update" : "Create"}  Campaign</DialogTitle>
            <IconButton aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <Box my={4}>
            <CampaignNewForm isEdit={update} currentCampaign={item} onFinish={() => { handleCloseModal(); }} />
        </Box>
    </DialogAnimate>
};
