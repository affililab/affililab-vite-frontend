import React, {FC} from "react";
import {getVariant, MotionViewport, makeStyles, Box, Skeleton, Grid} from 'my-lib';
import clsx from 'clsx';
import {Item} from '@resources/Product/components/Item';

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%"
    }
}));

const SkeletonLoad = (
    <Grid container spacing={3}>
        {[...Array(12)].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton
                    component={Box}
                    variant="rectangular"
                    sx={{width: '100%', paddingTop: '115%', borderRadius: 2}}
                />
            </Grid>
        ))}
    </Grid>
);

export const PartnerProgramsList : FC<any> = ({
                                        addToCampaign,
                                        noticedPartnerPrograms,
                                        openDetailedModal,
                                        toggleModal,
                                        toggleNoticedPartnerProgram,
                                        toggleExternalLink,
                                        scrollableNodeRef,
                                        partnerprograms,
                                        isLoad,
                                        className,
                                        ...rest
                                    }) => {
    const classes = useStyles();


    return <Grid rowSpacing={3} container alignItems="center" justifyContent="center"
                 className={clsx(classes.root, className)}  {...rest}>
        {partnerprograms.map((partnerprogram: any, index: number) => (
            // <Grid container direction={"column"} key={partnerprogram.id} item style={{width: "100%"}}>
            <Grid key={index + "-" + partnerprogram.id} item xs={12}>
                <Box
                    component={MotionViewport}
                    variants={getVariant('slideInUp')}
                    viewport={{root: scrollableNodeRef.current.getScrollElement(), once: true, amount: 0}}>
                    <Item
                        addToCampaign={addToCampaign}
                        toggleModal={toggleModal}
                        item={partnerprogram}
                        isNoticed={noticedPartnerPrograms.find((item: any) => item.id === partnerprogram.id)}
                        toggleExternalLink={toggleExternalLink}
                        toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} />
                    {/* render dummy */}
                </Box>
            </Grid>
        ))}
        {/*<Grid item xs={12}>*/}
        {/*    <Box*/}
        {/*    component={MotionViewport}*/}
        {/*    variants={getVariant('slideInUp')}*/}
        {/*    viewport={{root: scrollableNodeRef.current.getScrollElement(), once: true, amount: 0}}>*/}
        {/*        <SkeletonItem />*/}
        {/*    </Box>*/}
        {/*</Grid>*/}
    </Grid>
};