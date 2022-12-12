import React, {FC} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "my-lib"

export const DeleteFromCampaignModal: FC<any> = ({ isModalOpen, handleCloseModal, agree }) => {
    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Delete from Campaign</DialogTitle>
        <DialogContent>
            <Typography variant={"body"}>
                Are you sure you want to delete from Campaign
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseModal}>Disagree</Button>
            <Button onClick={agree}>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
};
