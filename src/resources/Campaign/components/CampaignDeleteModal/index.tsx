import React, {FC, useState} from "react"
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    // DialogContentText,
    DialogActions,
    Button, Icon, IconButton
} from "my-lib"

export const CampaignDeleteModal: FC<any> = ({ isModalOpen, handleCloseModal, agree }) => {

    return  <Dialog open={isModalOpen} onClose={handleCloseModal}>
        {/*<DialogTitle></DialogTitle>*/}
        <IconButton sx={(theme) => ({position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2})}
                    aria-label="close" onClick={handleCloseModal}>
            <Icon width={42}
                  height={42}
                  icon={'ei:close'}/>
        </IconButton>
        <DialogContent sx={(theme) => ({display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: theme.spacing(4)})}>
            <Icon icon={'lucide:trash-2'} width={126} height={126} />
            <Typography variant={"subtitle1"}>
                Delete Campaign
            </Typography>
            <Typography variant={"body2"}>
                Are you sure you want to delete Campaign
            </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={'contained'} color={'secondary'} onClick={handleCloseModal}>Disagree</Button>
            <Button variant={'contained'} onClick={agree}>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
}
