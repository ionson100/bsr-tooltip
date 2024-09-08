import React, { ReactElement } from "react";
import { Options, ToolTip } from "./innerClass";
type res = {
    tooltip?: ToolTip;
};
export declare const useToolTip: (target: React.RefObject<Element> | null, body: ReactElement | string | number, options?: Options) => res;
export {};
