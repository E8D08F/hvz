import {
    PropsWithChildren, Children,
    ReactElement, isValidElement, cloneElement
} from "react"
import classNames from "classnames"


type Alignment = "center" | "start" | "end"
const Stack = ({
    children, className,
    direction, alignment, spacing,
}: PropsWithChildren<{
    className?: string
    direction: "column" | "row",
    alignment?: Alignment,
    spacing?: number,
}>): JSX.Element => <div
    className={ className }
    style={{
        display: "flex",
        flexDirection: direction,
        gap: spacing,
        alignItems: alignment ?? "center",
    }}
>{ children }</div>

/**
 * Stack elements in x axis.
 * @param alignment `align-items` of the flex box.
 * @param spacing `gap` or spacing bewteen children elements.
 */
export const HStack = ({
    children, className,
    alignment, spacing,
}: PropsWithChildren<{
    className?: string,
    alignment?: Alignment,
    spacing?: number,
}>) => <Stack
    className={ classNames('h-stack', className) }
    direction="row"
    alignment={ alignment }
    spacing={ spacing }
    children={ children }
/>

/**
 * Stack elements in y axis.
 * @param alignment `align-items` of the flex box.
 * @param spacing `gap` or spacing bewteen children elements.
 */
export const VStack = ({
    children, className,
    alignment, spacing,
}: PropsWithChildren<{
    className?: string,
    alignment?: Alignment,
    spacing?: number,
}>) => <Stack
    className={ classNames('v-stack', className) }
    direction="column"
    alignment={ alignment }
    spacing={ spacing }
    children={ children }
/>

/**
 * Stack elements in z axis.
 */
export const ZStack = ({
    children, className,
}: PropsWithChildren<{
    className?: string,
}>) => {
    const extraStyle = { gridArea: '1 / 1' }

    return <div
        className={ classNames('z-stack', className) }
        style={{
            display: 'grid',
            placeItems: 'center',
        }}
        children={ Children.map(children, child =>
            (isValidElement(child)) ?
                cloneElement(child as ReactElement<any>, { style: {
                    ...child.props.style,
                    ...extraStyle,
                }}) :
                <div style={extraStyle}>{ child }</div>
        )}
    />
}
