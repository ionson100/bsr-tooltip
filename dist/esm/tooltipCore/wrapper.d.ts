import React, { ReactElement } from "react";
import { Options, ToolTip } from "./innerClass";
export declare const useToolTip: (target: React.RefObject<Element> | null, body: ReactElement | string | number, options?: Options) => ToolTip | undefined;
