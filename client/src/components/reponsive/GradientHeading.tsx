// * DESCRIPTION:
import React from "react"
import MyHeading, { MyHeadingProps } from "./MyHeading"

interface GradientHeadingProps extends MyHeadingProps {}

export const GradientHeading = (props: GradientHeadingProps) => {
    return <MyHeading bgClip="text" bgGradient="linear(to-b,bgGradient.orange)" {...props} />
}

export default GradientHeading
