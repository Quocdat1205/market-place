import { Heading, HeadingProps } from "@chakra-ui/layout"
import React from "react"

export interface MyHeadingProps extends HeadingProps {
    size?: "small" | "medium" | "large"
}

export const MyHeading = ({ size = "medium", ...rest }: MyHeadingProps) => {
    const fontSize = size === "small" ? ["md", "lg"] : size === "medium" ? ["lg", "xl"] : ["xl", "2xl"]
    return <Heading fontSize={fontSize} {...rest} />
}
export default MyHeading
