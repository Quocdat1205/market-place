import { FC } from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../utils/theme"
import { ContextProvider } from "./hooks/useProviderContext"

interface ProviderProps {
    children: React.ReactNode
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})
const Provider: FC<ProviderProps> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ContextProvider>{children}</ContextProvider>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default Provider
