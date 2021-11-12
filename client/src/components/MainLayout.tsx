import { Flex, Box } from "@chakra-ui/layout"
import Loading from "./Loading"
import { useProviderContext } from "./hooks/useProviderContext"
import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { useQuery } from "react-query"

interface Props {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    const { states } = useProviderContext()

    useEffect(() => {
        if (states.accessToken === "") {
            window.location.href = "/"
        }
    }, [states.accessToken])

    return (
        <Box color="whiteAlpha.900" w="full" h="100vh">
            {states.accessToken === "" && <Loading />}
            <Flex color="whiteAlpha.900" w="full" minH="100vh" flexDir="column" pos="relative">
                <Flex flex={1} overflow="visible" pt={20} bg="rgba(0, 0, 0, 0.3)" pos="relative">
                    <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
                </Flex>
                <Box
                    pos="fixed"
                    w="full"
                    zIndex="-1"
                    h="100vh"
                    bg="url(/images/bgMintingNew.png) no-repeat"
                    bgSize="100% 100%"
                ></Box>
            </Flex>
        </Box>
    )
}
export default MainLayout
