import {Box, Grid, styled, Typography} from "my-lib"
import {FC} from "react";

const TitleContainer = styled(Box)(({theme}) => ({
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(33, 146, 255)",
    borderRadius: theme.shape.borderRadius,
    // background: theme.palette.mode === "dark" ? "rgba(24, 144, 255, 0.2)" : theme.palette.info.lighter,
    // borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(24, 144, 255, 0.41)" : "1px solid " + theme.palette.info.light,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

const ItemContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    alignItems: "center"
}));

export const InformationContent: FC<any> = ({ informationItems }) => {
    return <Grid spacing={1} container>
        {informationItems.map(informationItem => <Grid xs={6} item>
            <ItemContainer>
                <TitleContainer>
                    <Typography color="white" variant="subtitle1" align={"left"}>
                        {informationItem.title}
                    </Typography>
                </TitleContainer>
                <Box sx={{ flex: 3 }}>
                    {informationItem.component}
                </Box>
            </ItemContainer>
        </Grid>)}
    </Grid>
};