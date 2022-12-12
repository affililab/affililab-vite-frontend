import React, {FC} from "react";
import {styled, Card, Typography, Box, fShortenNumber, CircularProgress} from 'my-lib';

const RootStyle = styled(Card)(({ theme }: any) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2, 2, 3),
    flexBasis: "356px"
}));

export const DashboardTotalCard: FC<any> = ({ loading, title, total, icon }) => {
    return (
        <RootStyle>
            <div>
                {loading ? <CircularProgress /> : <Typography variant="h3">{fShortenNumber(total)}</Typography>}
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {title}
                </Typography>
            </div>
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    lineHeight: 0,
                    borderRadius: '50%',
                    bgcolor: 'background.neutral',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {icon}
            </Box>
        </RootStyle>
    );
};
