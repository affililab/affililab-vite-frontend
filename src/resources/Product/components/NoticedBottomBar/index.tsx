import React from "react";
import {
    AnimatePresence,
    getVariant,
    m,
    MotionContainer,
    Box,
    Badge,
    Chip,
    Container,
    useAuth,
    AccountPopover,
    Logo,
    makeStyles,
    useTheme, Icon, Button
} from "my-lib";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    nav: {
        padding: '.5rem 5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap-reverse',
        backgroundColor: theme.palette.background.default,
        boxShadow:  theme.customShadows.z24,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 999
    }
}));


export const NoticedBottomBar = ({noticedPartnerPrograms, openNoticedPartnerProgramsModal}) => {

    const theme = useTheme();
    const classes = useStyles();

    const {user} = useAuth();

    return <AnimatePresence mode={"wait"}>
        {!!noticedPartnerPrograms.length && <MotionContainer sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999
        }}>
            <Box className={clsx(classes.nav)}
                 variants={getVariant('slideInUp')}
                 component={m.div}>
                <Container maxWidth={"xl"}>
                    <Box>
                        <Badge badgeContent={noticedPartnerPrograms.length} color="primary">
                            {/*<Chip*/}
                            {/*    // avatar={*/}
                            {/*    //     <Avatar alt="Natacha" src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg" />*/}
                            {/*    // }*/}
                            {/*    label="gemerkte partnerprogramme"*/}
                            {/*    onDelete={() => {*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <Button color={'inherit'} variant={'outlined'} size={'large'} onClick={() => { openNoticedPartnerProgramsModal() }}><Icon height={24} width={24} icon={"bi:bookmark-star"} sx={{ mr: 2 }} />gemerkte Partnerprogramme ansehen</Button>
                        </Badge>
                    </Box>
                </Container>
            </Box>
        </MotionContainer>}
    </AnimatePresence>
}