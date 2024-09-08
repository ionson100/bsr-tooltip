import { CSSProperties, ReactElement } from "react";
export type Options = {
    isWindows?: boolean;
    isWindowsClick?: boolean;
    style?: CSSProperties | undefined;
    className?: string;
    position?: "left" | "leftTop" | "leftBottom" | "top" | "bottom" | "right" | "custom" | "rightBottom" | "rightTop" | "bottomRight" | "bottomLeft" | "topLeft" | "topRight";
    marginVertical?: number;
    marginHorizontal?: number;
    isSelfClose?: boolean;
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
    private ActivateTooltip;
    private getOffsetPosition;
    private getOffsetAttribute;
    private mouseEnter;
    ContextMenuWillUnmount(): void;
}
