import React, {FC} from "react"
import {Button, Dialog, DialogActions, DialogAnimate, DialogContent, Icon, IconButton, Typography} from "my-lib"

export const DeleteModal: FC<any> = ({ resourceName = "item", isModalOpen, handleCloseModal, agree }) => {

    return <DialogAnimate fullWidth={false} open={isModalOpen} onClose={handleCloseModal}>
        <IconButton sx={(theme) => ({position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2})}
                    aria-label="close" onClick={handleCloseModal}>
            <Icon width={42}
                  height={42}
                  icon={'ei:close'} />
        </IconButton>
        <DialogContent sx={(theme) => ({display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: theme.spacing(4)})}>

            <Icon icon={'heroicons:trash'} mt={8} width={126} height={126} />

            <Typography variant={"body2"}>
                Are you sure you want to delete {resourceName}
            </Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={'text'} color={'inherit'} onClick={handleCloseModal}>Cancel</Button>
            <Button variant={'contained'} onClick={agree}>
                Agree
            </Button>
        </DialogActions>
    </DialogAnimate>;
}
