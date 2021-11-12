// * DESCRIPTION:

import React from "react"
import { Flex, FlexProps } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import { MyText, MyTextProps } from "."
interface NavBarLinkProps extends FlexProps {
    onClick?: () => void
    active?: boolean
    text: string
    href: string
    size?: MyTextProps["size"]
}
// hehe
export const NavBarLink = ({ onClick, size, text, active, href, ...rest }: NavBarLinkProps) => {
    const router = useRouter()
    return (
        <Flex onClick={onClick} color="white" pos="relative" cursor="pointer" px={2} justify="center" {...rest}>
            <MyText
                fontWeight="bold"
                size="small"
                textAlign="center"
                isTruncated
                onClick={() => router.push(href)}
                textTransform="uppercase"
                letterSpacing="3px"
                color={active ? "#FF710B" : "white"}
                // size={size}
                px={2}
                py={1}
                bgGradient={active ? "linear(to-t, whiteAlpha.100, transparent)" : ""}
                borderBottom="2px"
                borderColor={active ? "main.orange" : "transparent"}
            >
                {text}
            </MyText>
        </Flex>
    )
}
