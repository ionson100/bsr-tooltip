import React, { ReactElement } from "react";
import { Options, ToolTip } from "./innerClass";
type ResultUse = {
    tooltip?: ToolTip;
    options?: Options;
    target: React.RefObject<Element> | null;
};
export declare const useToolTip: (target: React.RefObject<Element> | null, body: ReactElement | string | number, options?: Options) => ResultUse;
export {};
