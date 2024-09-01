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

declare const useToolTip: (target: React.RefObject<HTMLElement> | null, body: ReactElement | string | number, options?: Options) => void;

export { type Options, type TooltipProps, useToolTip };
