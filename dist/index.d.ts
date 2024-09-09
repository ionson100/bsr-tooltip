import React, { CSSProperties, ReactElement } from 'react';

type Options = {
    style?: CSSProperties | undefined;
    className?: string;
    position?: "left" | "leftTop" | "leftBottom" | "top" | "bottom" | "right" | "custom" | "rightBottom" | "rightTop" | "bottomRight" | "bottomLeft" | "topLeft" | "topRight";
    isSelfClose?: boolean;
    mode?: "tooltip" | "popup" | "popupCloseSelf";
};
type TooltipProps = {
    target?: Element;
    body: ReactElement | string | number | undefined;
    options?: Options;
};
declare class ToolTip {
    private readonly innerRoot;
    private props;
    private readonly div;
    private isShow;
    private position;
    private readonly id;
    private isWindows;
    private mode;
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

type ResultUse = {
    tooltip?: ToolTip;
    options?: Options;
    target: React.RefObject<Element> | null;
};
declare const useToolTip: (target: React.RefObject<Element> | null, body: ReactElement | string | number, options?: Options) => ResultUse;

export { type Options, ToolTip, type TooltipProps, useToolTip };
