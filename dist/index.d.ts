import React, { CSSProperties, ReactElement } from 'react';

type Options = {
    isWindows?: boolean;
    isWindowsClick?: boolean;
    style?: CSSProperties | undefined;
    className?: string;
    position?: "top" | "bottom" | "left" | "right";
    marginVertical?: number;
    marginHorizontal?: number;
};
type TooltipProps = {
    target?: HTMLElement;
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
    private mouseEnter;
    private mouseOut;
    ContextMenuWillUnmount(): void;
}

declare const useToolTip: (target: React.RefObject<HTMLElement> | null, body: ReactElement | string | number, options?: Options) => void;

export { type Options, ToolTip, type TooltipProps, useToolTip };
