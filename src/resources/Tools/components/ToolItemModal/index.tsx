import React, {FC} from "react"
import {DialogAnimate} from "my-lib"
import {Content} from "./Content"

export const ToolItemModal: FC<any> = ({item, addToCampaign, isModalOpen, handleCloseModal }) => {

    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
        <Content item={item} addToCampaign={addToCampaign} handleClose={handleCloseModal} />
    </DialogAnimate>
};
