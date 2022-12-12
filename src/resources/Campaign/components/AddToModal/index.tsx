import React, {FC} from "react";
import {DialogAnimate, DialogTitle} from "my-lib";
import {AddToList} from "@resources/Campaign/components/AddToList";

export const AddToModal : FC<any> = ({isModalOpen, handleCloseModal, addToObjects, resource = "Resource"}) => {
    return (
        <DialogAnimate maxWidth={"sm"} open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle sx={{py: 2}}>Add {resource} to Campaign</DialogTitle>
            <AddToList height={"512px"} addToObjects={addToObjects}/>
        </DialogAnimate>
    )
};