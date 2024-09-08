import React, { CSSProperties, ReactElement } from 'react';

type Options = {
    isWindows?: boolean;
    isWindowsClick?: boolean;
    style?: CSSProperties | undefined;
    className?: string;
    position?: "top" | "bottom" | "left" | "right" | "custom";
    marginVertical?: number;
    marginHorizontal?: number;
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
    private readonly marginVertical;
    private readonly marginHorizontal;
    private readonly id;
    private isWindows;
    constructor(props: TooltipProps);
    Close(): void;
    private ActivateWindows;
    private ActivateTooltip;
    getOffsetPosition(el: Element): {
        left: number;
        top: number;
    };
    getOffsetAttrubute(el: Element): {
        width: number;
        height: number;
    };
    private mouseEnter;
    ContextMenuWillUnmount(): void;
}

declare const useToolTip: (target: React.RefObject<Element> | null, body: ReactElement | string | number, options?: Options) => void;

export { type Options, ToolTip, type TooltipProps, useToolTip };
