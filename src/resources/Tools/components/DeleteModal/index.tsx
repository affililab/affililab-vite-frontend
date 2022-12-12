import React, {FC} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "my-lib"

export const DeleteModal: FC<any> = ({ isModalOpen, handleCloseModal, agree }) => {

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Delete Tools</DialogTitle>
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
