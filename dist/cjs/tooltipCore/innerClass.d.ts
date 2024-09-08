import { CSSProperties, ReactElement } from "react";
export type Options = {
    isWindows?: boolean;
    isWindowsClick?: boolean;
    style?: CSSProperties | undefined;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
    marginVertical?: number;
    marginHorizontal?: number;
};
export type TooltipProps = {
    target?: Element;
    body: ReactElement | string | number | undefined;
    options?: Options;
};
export declare class ToolTip {
    private readonly innerRoot;
    private props;
    private readonly div;
    private isShow;
    private position;
    private readonly marginVertical;
    private readonly marginHorizontal;
    private readonly id;
    private isWindows;
    constructor(props: TooltipProps);
    Close(): void;
    private ActivateWindows;
    private maxZIndex;
    private ActivateTooltip;
    private getOffsetPosition;
    private getOffsetAttribute;
    private mouseEnter;
    ContextMenuWillUnmount(): void;
}
