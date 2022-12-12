import React from "react";
import { Container } from "my-lib";
import {OverviewItems} from "@resources/Tools/components/OverviewItems";
export const Tools = () => {
    return <Container maxWidth={"xl"} sx={{height: "100%"}}>
        <OverviewItems actionItems={[]} />
    </Container>
};
