import React, {FC} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate
} from "my-lib"
import { Form } from "../Form";

export const EditCreateModal: FC<any> = ({ refetchingOptions, isModalOpen, item, handleCloseModal, isEdit = false }) => {
    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{(isEdit ? "Edit" : "Create") + " E Learning Resource"}</DialogTitle>
        <Box my={4} p={2}>
            <Form refetchingOptions={refetchingOptions} item={item} isEdit={isEdit} finishCallBack={() => { handleCloseModal() }} />
        </Box>
    </DialogAnimate>
}
