import React, {ReactElement, useEffect} from "react";
import {Options, ToolTip} from "./innerClass";
type res={
    tooltip?: ToolTip
}
export const useToolTip = function (target: React.RefObject<Element> | null,
                                    body: ReactElement|string|number,
                                    options?:Options) {


    const res:res={
        tooltip: undefined,
    }

    //let toolTip:ToolTip|undefined
    useEffect(() => {

        if (target?.current) {
            res.tooltip= new ToolTip({target: target.current, body: body,options:options})
        }
        return()=>{
            res.tooltip?.ContextMenuWillUnmount()
        }

    }, [target?.current])
    return res
}
