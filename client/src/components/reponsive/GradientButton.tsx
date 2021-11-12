// * DESCRIPTION:

import React from "react"
import { Box, BoxProps, Spinner, Flex, TextProps } from "@chakra-ui/react"
import { MyText } from "."

interface GradientButtonProps extends BoxProps {
    text: React.ReactNode
    as?: BoxProps["as"]
    href?: string
    isLoading?: boolean
    loadingText?: string
    rel?: string
    fontSize?: TextProps["fontSize"]
    disabled?: boolean
    size?: "large" | "medium"
}

export const GradientButton = ({
    text,
    as = "button",
    href,
    isLoading,
    loadingText = "Submitting",
    rel,
    fontSize,
    disabled,
    size = "medium",
    ...rest
}: GradientButtonProps) => {
    const [px, py] = size === "large" ? [3, 8] : [2, 6]
    return (
        <Box
            as={as}
            href={href}
            target="_blank"
            rel={rel}
            textTransform="uppercase"
            rounded="md"
            py={px}
            px={py}
            bgColor="white"
            bgGradient="linear(to-b, #FF6795, #FF710B 84.37%)"
            fontSize="xs"
            color="white"
            shadow="base"
            letterSpacing="1px"
            pos="relative"
            textAlign="center"
            pointerEvents={disabled ? "none" : "all"}
            {...rest}
        >
            {isLoading ? (
                <Flex align="center" justify="center">
                    <Spinner size="sm" thickness="3px" />
                    <MyText fontSize={fontSize} ml={4} fontWeight="bold">
                        {loadingText}
                    </MyText>
                </Flex>
            ) : (
                <MyText fontSize={fontSize} letterSpacing="2px" fontWeight="bold">
                    {text}
                </MyText>
            )}
        </Box>
    )
}
