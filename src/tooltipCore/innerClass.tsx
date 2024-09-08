import React, {CSSProperties, ReactElement} from "react";
import {createRoot, Root} from "react-dom/client";
import {v4 as uuidv4} from 'uuid';

export type Options = {
    isWindows?: boolean
    isWindowsClick?: boolean
    style?: CSSProperties | undefined;
    className?: string,
    position?: "top" | "bottom" | "left" | "right"|"custom"
    marginVertical?: number
    marginHorizontal?: number
}
export type TooltipProps = {
    target?: Element
    body: ReactElement | string | number | undefined
    options?: Options
}
const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
}
const MapToolTip = new Map<string, ToolTip>();

export class ToolTip {
    private readonly innerRoot: Root
    private props: TooltipProps;
    private readonly div: HTMLDivElement;
    private isShow = false;
    private position = 'left'
    private readonly marginVertical: number
    private readonly marginHorizontal: number
    private readonly id: string
    private isWindows: boolean

    constructor(props: TooltipProps) {
        this.props = props
        this.id = uuidv4()
        MapToolTip.set(this.id, this)
        this.Close = this.Close.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this)

        this.div = document.createElement("div");
        this.div.className = "bsr-left-tooltip"
        if (this.props.options?.className) {
            this.div.className = this.props.options.className
        }
        if (this.props.options?.style) {
            Object.assign(this.div.style, this.props.options.style);
        }
        this.innerRoot = createRoot(this.div);
        if (React.isValidElement(this.props.body)) {
            this.innerRoot.render(this.props.body)
        } else {
            this.innerRoot.render(<div style={style}>{this.props.body}</div>)
        }
        this.isWindows = false
        if (this.props.options?.isWindowsClick === true || this.props.options?.isWindows === true) {
            this.ActivateWindows()
            this.isWindows = true
            this.div.style.cursor = "pointer"

        } else {
            this.ActivateTooltip()
        }
        this.position = 'left'
        if (this.props.options?.position) {
            this.position = this.props.options.position
        }
        this.marginVertical = 0
        if (this.props.options?.marginVertical) {
            this.marginVertical = this.props.options.marginVertical
        }
        this.marginHorizontal = 0
        if (this.props.options?.marginHorizontal) {
            this.marginHorizontal = this.props.options.marginHorizontal
        }


    }

    Close() {
        if (this.isShow) {
            document.body.removeChild<HTMLDivElement>(this.div)
            this.isShow = false;
        }
    }

    private ActivateWindows() {

        if (this.props.options?.isWindowsClick) {
            this.props.target?.addEventListener('mouseup', this.mouseEnter)
        } else {
            this.props.target?.addEventListener('mouseenter', this.mouseEnter)
        }

        this.div.addEventListener("click", this.Close)

    }

    private maxZIndex() {

        return Array.from(document.querySelectorAll('body *'))
            .map(a => parseFloat(window.getComputedStyle(a).zIndex))
            .filter(a => !isNaN(a))
            .sort()
            .pop();
    }


    private ActivateTooltip() {

        this.props.target?.addEventListener('mouseenter', this.mouseEnter)
        this.props.target?.addEventListener('mouseleave', this.Close)
    }

    private getOffsetPosition(el: Element) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    private getOffsetAttribute(el: Element) {
        const rect = el.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    }


    private mouseEnter() {
        if (this.props.target !== undefined) {

            MapToolTip.forEach((value) => {
                value.Close()
            })
            if (!this.isShow) {
                const element = this.props.target
                const position = this.getOffsetPosition(element!)
                const attributes = this.getOffsetAttribute(element!)
                const zIndex = this.maxZIndex()
                this.div.style.zIndex = zIndex ? zIndex + 1 + "" : "100000000000000000000000"
                document.body.appendChild(this.div)
                if(this.position==='custom'){
                    this.div.style.top = ""
                    this.div.style.left = ""
                    this.isShow = true;
                }
                if (this.position === 'left') {
                    let h = position.top + attributes.height / 2 - this.div.offsetHeight / 2 + this.marginVertical;
                    if (this.isWindows) {
                        h = position.top + attributes.height / 2
                    }
                    let w = attributes.width + position.left + this.marginHorizontal;
                    this.div.style.top = h + "px"
                    this.div.style.left = w + "px"

                }
                if (this.position === 'right') {
                    let h = position.top + attributes.height / 2 - this.div.offsetHeight / 2 + this.marginVertical;
                    if (this.isWindows) {
                        h = position.top + attributes.height / 2
                    }
                    let w = position.left - this.div.offsetWidth - 10 + this.marginHorizontal
                    this.div.style.top = h + "px"
                    this.div.style.left = w + "px"
                    this.isShow = true;
                }
                if (this.position === 'bottom') {
                    let h = position.top + attributes.height + this.marginVertical;
                    let w = position.left + attributes.width / 2 - this.div.offsetWidth / 2 + this.marginHorizontal
                    if (this.isWindows) {
                        w = position.left + attributes.width / 2
                    }
                    this.div.style.top = h + "px"
                    this.div.style.left = w + "px"
                    this.isShow = true;
                }
                if (this.position === 'top') {
                    let h = position.top - this.div.offsetHeight - 5 + this.marginVertical - 5;
                    let w = position.left + attributes.width / 2 - this.div.offsetWidth / 2 + this.marginHorizontal
                    if (this.isWindows) {
                        w = position.left + attributes.width / 2
                    }
                    this.div.style.top = h + "px"
                    this.div.style.left = w + "px"
                    this.isShow = true;
                }

            }

        }


    }


    public ContextMenuWillUnmount() {
        this.props.body = undefined
        this.props.target = undefined
        MapToolTip.delete(this.id)
        setTimeout(() => {
            this.innerRoot.unmount();
            if (this.isShow) {
                try {
                    document.body.removeChild<HTMLDivElement>(this.div)
                } catch (e) {

                }

            }
            this.props.target = undefined
        })
    }
}
