import React from "react"
import { Box, useOutsideClick, Collapse, Text, VStack } from "@chakra-ui/react"
import { GradientButton } from "."
import { useRef, useState } from "react"

interface SubLinkProps {
    text: string
    href: string
}
export const SubLink = ({ text, href }: SubLinkProps) => {
    return (
        <Text
            fontWeight={"700"}
            bgGradient="linear(to-b, bgGradient.orange)"
            bgClip="text"
            as="a"
            href={href}
            rel="nonreferrer"
            target="_blank"
            borderBottom="1px"
        >
            {text}
        </Text>
    )
}

export interface ViewCollectionButtonProps {
    size?: "large" | "medium"
    text?: string
}
export const ViewCollectionButton = ({
    size = "medium",
    text = "VIEW COLLECTION ON OPENSEA",
}: ViewCollectionButtonProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useOutsideClick({
        ref,
        handler: () => setIsExpanded(false),
    })
    return (
        <Box pos="relative" ref={ref}>
            <GradientButton
                text={text}
                rounded="full"
                onClick={() => setIsExpanded(!isExpanded)}
                zIndex={2}
                size={size}
            />
            <Box pos="absolute" top={"50%"} left={0} w="full">
                <Collapse in={isExpanded}>
                    <Box bgGradient="linear(to-b, bgGradient.orange)" p={1} sx={{ borderRadius: "0 0 1rem 1rem" }}>
                        <VStack
                            direction="column"
                            w="full"
                            spacing={3}
                            align="flex-start"
                            px={size === "medium" ? 6 : 8}
                            bg="rgb(17, 17, 17)"
                            pt={7}
                            pb={3}
                            sx={{ borderRadius: "0 0 1rem 1rem" }}
                            shadow="base"
                        >
                            <SubLink
                                text="NEKO - SIPHERIAN FLASH"
                                href="https://opensea.io/collection/sipherianflash"
                            />
                            <SubLink text="INU - SIPHERIAN SURGE" href="https://opensea.io/collection/sipheriansurge" />
                        </VStack>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}

export default ViewCollectionButton
