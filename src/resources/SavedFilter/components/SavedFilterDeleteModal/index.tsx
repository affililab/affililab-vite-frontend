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

export const SavedFilterDeleteModal: FC<any> = ({ isModalOpen, handleCloseModal, agree }) => {

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Delete saved Filter</DialogTitle>
        <DialogContent>
            <Typography variant={"body"}>
                Are you sure you want to delete saved Filter
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
