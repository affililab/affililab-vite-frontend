import React from "react";
import { Container } from "my-lib";
import {Content} from "@resources/ELearningResources/components/OverviewItems/content";
export const ELearning = () => {
    return <Container maxWidth={"xl"} sx={{height: "100%"}}>
        <Content />
    </Container>
};
