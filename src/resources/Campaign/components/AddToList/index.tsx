import {
    Scrollbar,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton, Icon, makeStyles, fShortenNumber,
    useTheme
} from "my-lib"
import React, {FC, useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_CAMPAIGNS, UPDATE_CAMPAIGN} from "@schemas/campaigns";
import { useProductInteraction } from "@resources/User/hooks/useProductInteraction";

const useStyles = makeStyles((theme: any) => ({
    tableRow: {
        '&:hover': {
            background: theme.palette.background.neutral,
        },
        m: 2
    },
    stickyColumn: {
        position: "sticky",
        background: theme.palette.background.neutral,
        borderLeft: `solid 1px ${theme.palette.divider}`,
        right: 0
    },
    tableCell: {
        boxShadow: "none !important"
    }
}));

export const AddToList: FC<any> = ({ addToObjects, height='512px' }) => {

    const {registerInteraction} = useProductInteraction();


    const classes = useStyles();
    const theme = useTheme();

    const [campaigns, setCampaigns] = useState([]);

    const {loading: isLoading, error, data: campaignData, status, refetch} : any = useQuery(GET_CAMPAIGNS, {
        variables: {meta : { page: 0, direction: 1, sortBy: "title", limit: 10, filters: []}}}
    );

    const [editCampaignMutation, { error: updateCampaignError }] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries: [
            { query: GET_CAMPAIGNS,
                variables: {
                    meta: {page: 0, direction: 1, sortBy: "title", limit: 10, filters: []}
                } }
        ]
    });

    useEffect(() => {
        if (campaignData) {
            setCampaigns(campaignData.getCampaigns?.items);
        }
    }, [campaignData]);

    const hasAlreadyElements = (row: any) => {
        let hasAddToAlready = false
        Object.keys(addToObjects).forEach(resourceKey => {
            hasAddToAlready = false;
            addToObjects[resourceKey].forEach((resourceItemId: any) => {
                if (!row[resourceKey].find((rowResourceItem: any) => rowResourceItem.id === resourceItemId)) hasAddToAlready = true
            })
        })
        return hasAddToAlready;
    }

    const getGraphqlUpdateObjects = () => {
        let updateRelationshipObject : any = {}
        Object.keys(addToObjects).forEach(key => {
            updateRelationshipObject[key] = { add: addToObjects[key] }
        });
        return updateRelationshipObject;
    }

    const addTo = (item: any) => {
        editCampaignMutation({ variables: { id: item.id, ...getGraphqlUpdateObjects() } });
        if (addToObjects?.partnerPrograms) {
            addToObjects.partnerPrograms.forEach((partnerProgramId: any) => {
                registerInteraction(partnerProgramId, 'campaign_added');
            });
        }
    }

    return <TableContainer sx={{ mt: 3, flex: 1 }}>
            <Scrollbar sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                ".simplebar-content-wrapper": {
                    // height: "100%",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",

                    overflow: "auto"
                },
                ".simplebar-content": {
                    // height: "100%",
                    flex: 1,
                }
            }} forceVisible="y" style={{height: "100%"}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell align={"center"} className={classes.tableCell}>Title</TableCell>
                        <TableCell align={"center"} className={classes.tableCell}>Tools</TableCell>
                        <TableCell align={"center"} className={classes.tableCell}>Products</TableCell>
                        <TableCell align={"center"} className={classes.tableCell}>Elearning Resources</TableCell>
                        <TableCell align={"center"} className={classes.tableCell}> actions </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {campaigns.map((row: any, index) => (
                        <TableRow className={classes.tableRow} key={index + row?.title}>
                            <TableCell align={"center"} className={classes.tableCell} component="th" scope="row">{row?.title}</TableCell>
                            <TableCell align={"center"} className={classes.tableCell}>{fShortenNumber(row?.tools?.length)}</TableCell>
                            <TableCell align={"center"} className={classes.tableCell}>{fShortenNumber(row?.partnerPrograms.length)}</TableCell>
                            <TableCell align={"center"} className={classes.tableCell}>{fShortenNumber(row?.eLearningResources.length)}</TableCell>
                            <TableCell align={"center"} className={classes.tableCell}>
                                {hasAlreadyElements(row) ? <IconButton onClick={() => addTo(row)}>
                                    <Icon icon={'carbon:add-alt'} />
                                </IconButton> : <Icon color={theme.palette.success.light} icon={'akar-icons:check'} />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Scrollbar>
    </TableContainer>
}