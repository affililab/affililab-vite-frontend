import React, {FC} from "react"
import {Button, Dialog, DialogActions, DialogContent, Icon, Typography} from "my-lib"

export const DeleteModal: FC<any> = ({ resourceName = "item", isModalOpen, handleCloseModal, agree }) => {

    return <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogContent sx={(theme) => ({display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: theme.spacing(4)})}>

            <Icon icon={'lucide:trash-2'} width={126} height={126}/>

            <Typography variant={"body2"}>
                Are you sure you want to delete {resourceName}
            </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={'text'} color={'inherit'} onClick={handleCloseModal}>Disagree</Button>
            <Button variant={'contained'} onClick={agree}>
                Agree
            </Button>
        </DialogActions>
    </Dialog>;
}
