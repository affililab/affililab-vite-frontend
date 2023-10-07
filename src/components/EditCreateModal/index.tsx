import React, {FC} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate, IconButton, Icon
} from "my-lib"
import { EditCreateForm } from "@components/EditCreateForm";

export const EditCreateModal: FC<any> = ({ resourceName = "item", resourceSchema = [], refetchingOptions, isModalOpen, item, handleCloseModal, isEdit = false, createMutation, editMutation }) => {
    return <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
            <DialogTitle variant={'subtitle2'}>{(isEdit ? "Edit" : "Create") + " " + resourceName}</DialogTitle>
            <IconButton aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <EditCreateForm abort={handleCloseModal} resourceSchema={resourceSchema} refetchingOptions={refetchingOptions} item={item} isEdit={isEdit} finishCallBack={() => { handleCloseModal() }} createMutation={createMutation} editMutation={editMutation} />
    </DialogAnimate>
};
