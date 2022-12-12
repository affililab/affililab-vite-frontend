import React, {FC, useState} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate,
    Typography
} from "my-lib"
import {Content} from "./Content";

export const ElearningItemModal: FC<any> = ({ item, addToCampaign, isModalOpen, handleCloseModal }) => {

    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
            <Content item={item} addToCampaign={addToCampaign} handleClose={handleCloseModal} />
    </DialogAnimate>
}
