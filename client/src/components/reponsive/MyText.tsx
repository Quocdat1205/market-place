import { Text, TextProps } from "@chakra-ui/layout"
import React from "react"

export interface MyTextProps extends TextProps {
    size?: "small" | "medium" | "large"
}

export const MyText = ({ size = "medium", ...rest }: MyTextProps) => {
    const fontSize =
        size === "small"
            ? ["xs", "sm", "sm", "md"]
            : size === "medium"
            ? ["sm", "md", "md", "xl"]
            : ["md", "lg", "lg", "xl", "2xl"]
    return <Text fontSize={fontSize} {...rest} />
}
export default MyText
