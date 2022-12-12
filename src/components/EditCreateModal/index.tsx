import React, {FC} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate
} from "my-lib"
import { EditCreateForm } from "@components/EditCreateForm";

export const EditCreateModal: FC<any> = ({ resourceName = "item", resourceSchema = [], refetchingOptions, isModalOpen, item, handleCloseModal, isEdit = false, createMutation, editMutation }) => {
    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{(isEdit ? "Edit" : "Create") + " " + resourceName}</DialogTitle>
        <Box my={4} p={2}>
            <EditCreateForm resourceSchema={resourceSchema} refetchingOptions={refetchingOptions} item={item} isEdit={isEdit} finishCallBack={() => { handleCloseModal() }} createMutation={createMutation} editMutation={editMutation} />
        </Box>
    </DialogAnimate>
}
