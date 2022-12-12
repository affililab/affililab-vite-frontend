import {useState} from "react";

export const useTriggerHook = () => {
    const [compareViewTrigger, setCompareViewTrigger] = useState(0);

    return [compareViewTrigger, setCompareViewTrigger];
};