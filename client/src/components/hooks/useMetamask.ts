import { useState } from "react"
import router from "next/router"
import useChakraToast from "./useChakraToast"
import useFormCore from "./useFormCore"
import { useQuery } from "react-query"

declare global {
    interface Window {
        ethereum: any
    }
}

export interface AppState {
    accountLogin: string
    chain: {
        id: string | null
        name: string
    } | null
    isScAvailable: boolean
    accessToken: string
}

const initialState: AppState = {
    accountLogin: "",
    chain: null,
    isScAvailable: false,
    accessToken: "",
}

export const useMetamask = () => {
    const [isConnecting, setIsConnecting] = useState(false)
    const { values: states, setValue: setState, initForm } = useFormCore<AppState>(initialState)
    const toast = useChakraToast()

    return {
        setState,
        states,
        isConnecting,
        toast,
    }
}
