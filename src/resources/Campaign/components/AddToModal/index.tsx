import React, {FC} from "react";
import {DialogAnimate, DialogTitle, Icon, IconButton} from "my-lib";
import {AddToList} from "@resources/Campaign/components/AddToList";

export const AddToModal : FC<any> = ({isModalOpen, handleCloseModal, addToObjects, resource = "Resource"}) => {
    return (
        <DialogAnimate sx={{ display: "flex", flexDirection: "column" }} maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle variant={'subtitle1'} sx={{py: 4}}>Add {resource} to Campaign</DialogTitle>
            <IconButton sx={(theme) => ({position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2})} aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
            <AddToList addToObjects={addToObjects} />
        </DialogAnimate>
    )
};