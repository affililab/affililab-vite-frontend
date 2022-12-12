import React, {FC, useState} from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button
} from "my-lib"

export const DeleteModal: FC<any> = ({ resourceName = "item", isModalOpen, handleCloseModal, agree }) => {

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Delete {resourceName}</DialogTitle>
        <DialogContent>
            <Typography variant={"body"}>
                Are you sure you want to delete {resourceName}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseModal}>Disagree</Button>
            <Button onClick={agree}>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
}
