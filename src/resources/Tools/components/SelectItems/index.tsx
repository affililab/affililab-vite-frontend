import React, {FC, useRef} from "react";
import {Box, Scrollbar} from "my-lib";
import {Content} from "./content"

export const SelectItems: FC<any> = ({
                                           isSelection,
                                           actionItems = [],
                                           selected = [],
                                           implemented = [],
                                           setSelected = () => null
                                       }) => {

    const scrollableNodeRef = useRef();

    return <>
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
        }} forceVisible="y" autoHide={false} ref={scrollableNodeRef}>
            <Content
            scrollableNodeRef={scrollableNodeRef}
            isSelection={isSelection}
            actionItems={actionItems}
            selected={selected}
            implemented={implemented}
            setSelected={setSelected} />
        </Scrollbar>
    </>
};
