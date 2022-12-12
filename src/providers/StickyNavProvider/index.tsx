import React, {createContext, createRef, FC, PropsWithChildren} from "react";
import {Box, useScrollSticky} from "my-lib";

interface StickySubNavContextInterface {
    stuck: boolean
}


export const StickySubNavContext = createContext<StickySubNavContextInterface>({
    stuck: false
});

export const StickySubNavProvider: FC<PropsWithChildren<any>> = ({children, sx}) => {
    const stickyRef = createRef();
    const [stuck] = useScrollSticky(stickyRef);

    return <StickySubNavContext.Provider value={{stuck: stuck}}>
        <Box sx={(theme: any) => ({
            position: "sticky",
            boxShadow: stuck ? theme.customShadows.z24 : "none",
            top: -1,
            left: -1,
            width: '100%',
            background: stuck ? theme.palette.background.paper : "",
            marginTop: theme.spacing(4), // height of header
            // marginBottom: theme.spacing(4), // height of header
            paddingBottom: stuck ? theme.spacing(2) : 0,
            paddingTop: stuck ? theme.spacing(2) : 0,
            transition: "padding 500ms ease, background 500ms ease",
            zIndex: stuck ? 999 : 0,
            ...sx
        })} ref={stickyRef}>
            {children}
        </Box>
    </StickySubNavContext.Provider>
};