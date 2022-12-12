import React, {FC, useState} from "react"
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    // DialogContentText,
    DialogActions,
    Button
} from "my-lib"

export const DeleteModal: FC<any> = ({ isModalOpen, handleCloseModal, agree }) => {

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Delete E Learning Resource</DialogTitle>
        <DialogContent>
            <Typography variant={"body"}>
                Are you sure you want to delete item
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
