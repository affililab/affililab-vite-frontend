import React from "react";
import { Container } from "my-lib";
import {Content} from "@resources/Tools/components/OverviewItems/content";
export const Tools = ({ scrollableNodeRef }) => {
    return <Container maxWidth={"xl"} sx={{height: "100%"}}>
        <Content actionItems={[]} scrollableNodeRef={scrollableNodeRef} />
    </Container>
};
