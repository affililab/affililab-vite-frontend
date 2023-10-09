import React, {FC} from "react";
import {Box, Grid, Icon, IconButton, Scrollbar, Tooltip} from "my-lib";
import {Item} from '@resources/Product/components/Item';

export const ListView: FC<any> = ({
                                      items,
                                      noticedPartnerPrograms,
                                      selectedItems = [],
                                      toggleSelected = (item: string) => {},
                                      toggleNoticedPartnerProgram,
                                      toggleDetailedModal,
                                      addToCampaign
                                  }) => {
    return <Scrollbar sx={{pt: 2}}>
        <Grid rowSpacing={3} container alignItems="center" justifyContent="center" spacing={4}>
            {items.map((partnerprogram: any, index: number) => (<Grid key={index} item xs={12}><Item
                selectable
                selected={selectedItems.find(item => item === partnerprogram.id)}
                toggleSelected={() => toggleSelected(partnerprogram.id)}
                actionItems={[
                    (item: any) => <Box>
                        <Tooltip
                            title={"merken"}
                            arrow>
                            <IconButton
                                sx={(theme: any) => ({
                                    color: theme.palette.text.secondary,
                                    height: "42px",
                                    width: "42px"
                                })}
                                value={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? 'checked' : 'unchecked'}
                                onClick={() => toggleNoticedPartnerProgram(item)}
                                color="info"
                                aria-label="toggle noticed partnerprogram"
                            >
                                <Icon
                                    width={24}
                                    height={24}
                                    sx={(theme) => ({
                                        color: theme.palette.primary.dark
                                    })}
                                    icon={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>,
                    (item: any) => <Box>
                        <Tooltip
                            title={"öffnen"}
                            arrow>
                            <IconButton
                                sx={(theme: any) => ({
                                    color: theme.palette.text.secondary,
                                    height: "42px",
                                    width: "42px"
                                })}
                                onClick={() => toggleDetailedModal(item)}
                                aria-label="open partnerprogram"
                                component="label">
                                <Icon
                                    width={24}
                                    height={24}
                                    sx={(theme) => ({
                                        color: theme.palette.primary.dark
                                    })}
                                    icon={"akar-icons:eye-open"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                ]}
                toggleModal={toggleDetailedModal}
                item={partnerprogram}
                isNoticed={noticedPartnerPrograms.find(item => item.id === partnerprogram.id)}
                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}/></Grid>))}
        </Grid>
    </Scrollbar>
};
