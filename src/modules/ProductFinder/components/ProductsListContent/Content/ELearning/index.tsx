import React from "react";
import { Container } from "my-lib";
import {OverviewItems} from "@resources/ELearningResources/components/OverviewItems";
export const ELearning = () => {
    return <Container maxWidth={"xl"} sx={{height: "100%"}}>
        <OverviewItems actionItems={[]} />
    </Container>
};
