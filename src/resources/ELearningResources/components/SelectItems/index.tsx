import React, {FC, useRef} from "react";
import {Box, Scrollbar} from "my-lib";
import {Content} from "./content";

function Item(props: any) {
    const {sx, ...other} = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                ...sx,
            }}
            {...other}
        />
    );
}

export const SelectItems: FC<any> = ({ isSelection, actionItems, selected = [], implemented = [], setSelected = () => null }) => {

    const scrollableNodeRef = useRef();

    return  <>
        <Scrollbar sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100%",
            ".simplebar-content-wrapper": {
                // height: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            },
            ".simplebar-content": {
                // height: "100%",
                flex: 1
            }
        }} forceVisible="y" autoHide={false} ref={scrollableNodeRef} style={{height: "100%"}}>
            <Content isSelection={isSelection}
                     actionItems={actionItems}
                     selected={selected}
                     implemented={implemented}
                     setSelected={setSelected} />
        </Scrollbar></>
}