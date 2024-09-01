import React, {ReactElement, useEffect} from "react";
import {Options, ToolTip} from "./innerClass";

export const useToolTip = function (target: React.RefObject<HTMLElement> | null,
                                    body: ReactElement|string|number,
                                    options?:Options) {
    useEffect(() => {
        let toolTip:ToolTip|undefined
        if (target?.current) {
            toolTip= new ToolTip({target: target.current, body: body,options:options})
        }
        return()=>{
            toolTip?.ContextMenuWillUnmount()
        }

    }, [target?.current])
}
