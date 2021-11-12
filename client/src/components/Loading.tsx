import { Flex, FlexProps } from "@chakra-ui/layout"
import { motion } from "framer-motion"
import React from "react"
import { Typo } from "./Typo"

const MotionFlex = motion<Omit<FlexProps, "transition">>(Flex)

const Loading = () => {
    return (
        <MotionFlex bg="black" h="100vh" w="full" align="center" justify="center" exit={{ scaleY: 0 }}>
            <Typo.BoldText isGradient>PLEASE WAIT ...</Typo.BoldText>
        </MotionFlex>
    )
}

export default Loading
