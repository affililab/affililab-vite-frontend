import React, {FC} from "react";
import {Container} from "my-lib";
import {Overview} from "@resources/Source/components/Overview";

export const Networks: FC<any> = () => {
    return <Container maxWidth={"xl"} sx={{height: "100%"}}>
        <Overview />
    </Container>
};
