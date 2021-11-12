import React, { useCallback } from "react"
import { useToast, ToastOptions } from "@chakra-ui/react"
import { Toast } from "../reponsive"

type UseChakraToastOptions = {
    defaultDuration: number
}

type ChakraToastOptions = {
    status?: ToastOptions["status"]
    title: string
    message?: string
    duration?: number
}
// hehe
export const useChakraToast = ({ defaultDuration }: UseChakraToastOptions = { defaultDuration: 2500 }) => {
    const toast = useToast()

    return useCallback((options: ChakraToastOptions) => {
        const { status = "default", title, message, duration = defaultDuration } = options
        setTimeout(
            () =>
                toast({
                    duration,
                    render: () => <Toast status={status} title={title} message={message} />,
                }),
            250
        )
    }, [])
}

export default useChakraToast
