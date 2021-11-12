// * DESCRIPTION:

import { MyText, MyTextProps } from "../reponsive"

interface BoldTextProps extends MyTextProps {
    isGradient?: boolean
}

const BoldText = ({ isGradient, ...rest }: BoldTextProps) => {
    return (
        <MyText
            size="large"
            fontWeight="semibold"
            letterSpacing={["2px", "2px", "3px", "4px"]}
            bgClip={isGradient ? "text" : "border-box"}
            bgGradient={isGradient ? "linear(to-b,bgGradient.orange)" : ""}
            {...rest}
        />
    )
}

export default BoldText
