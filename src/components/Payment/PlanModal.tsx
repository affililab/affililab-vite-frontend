import React, {FC, useEffect} from "react";

import {
    DialogAnimate,
    Box,
    IconButton,
    Icon,
    Container,
    useTheme, styled,
    useMediaQuery
} from "my-lib";
import {closeModal} from "@slices/payment";
import {useSelector} from "@store";
import {PricingList} from "@resources/Payments/components/PricingList";

const RootStyle : any = styled<any>('div')(({ theme }: any) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
}));

export const Content : FC<any> = ({
                            handleCloseModal = () => {}
                        }) => {

    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
    >
        <IconButton sx={{position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2}} aria-label="close" onClick={handleCloseModal}>
            <Icon width={42}
                     height={42}
                     icon={'ei:close'}/>
        </IconButton>
        <RootStyle>
            <Container>
                <PricingList />
            </Container>
        </RootStyle>
    </Box>
};

export const PlanModal = () => {

    const {isModalOpen} = useSelector((state: any) => state.payment);

    return <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={() => {
        closeModal()
    }}>
        <Content handleCloseModal={() => {
            closeModal()
        }}/>
    </DialogAnimate>
};


