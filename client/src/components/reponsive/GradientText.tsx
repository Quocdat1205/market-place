// * DESCRIPTION:
import React from "react"
import MyText, { MyTextProps } from "./MyText"

interface GradientTextProps extends MyTextProps {}

export const GradientText = (props: GradientTextProps) => {
    return <MyText bgClip="text" bgGradient="linear(to-b,bgGradient.orange)" {...props} />
}

export default GradientText
