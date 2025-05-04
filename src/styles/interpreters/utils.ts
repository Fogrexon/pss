import { RequiredStyle, Style } from "../StyleTypes";
import { defaultStyles, rootStyle } from "../utils";

export const getStyleValue = <T extends keyof RequiredStyle>(key: T, style: Style, isRoot: boolean): RequiredStyle[T] => {
    if (isRoot && (style[key] === "inherit" || style[key] === "default")) return rootStyle[key];
    if (!style[key] || style[key] === "default") return defaultStyles[key];
    return style[key];
}