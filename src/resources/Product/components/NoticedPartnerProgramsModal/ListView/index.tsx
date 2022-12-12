import React, {FC} from "react";
import {Grid, Scrollbar} from "my-lib";
import {Item} from '@resources/Product/components/Item';

export const ListView : FC<any> = ({ items, noticedPartnerPrograms,
                      toggleNoticedPartnerProgram, toggleDetailedModal, addToCampaign }) => {
    return <Scrollbar sx={{pt: 2}}>
        <Grid rowSpacing={3} container alignItems="center" justifyContent="center" spacing={4}>
            {items.map((partnerprogram: any, index: number) => (<Grid item xs={12}><Item key={index}
                                                                           addToCampaign={() => addToCampaign(partnerprogram.id)}
                                                                           toggleModal={toggleDetailedModal}
                                                                           item={partnerprogram}
                                                                           isNoticed={noticedPartnerPrograms.find(item => item.id === partnerprogram.id)}
                                                                           toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} />
                </Grid>)
            )
            }
        </Grid>
    </Scrollbar>
};
