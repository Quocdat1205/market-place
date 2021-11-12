import { createContext, useContext, FC } from "react"
import { useMetamask } from "./useMetamask"

type IProviderContext = ReturnType<typeof useMetamask>

const ProviderContext = createContext<IProviderContext | null>(null)

interface Props {
    children: any
}

export const ContextProvider: FC<Props> = ({ children }) => {
    const hook = useMetamask()
    return <ProviderContext.Provider value={hook}>{children}</ProviderContext.Provider>
}

export const useProviderContext = () => useContext(ProviderContext) as IProviderContext

export default useProviderContext
