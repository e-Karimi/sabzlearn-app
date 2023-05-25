import { createContext,useState } from "react";

export const sidebarMenuContext = createContext()

const SidebarMenuProvider = ({ children }) => {
    const [isShowSidebarMenu, setIsShowSidebarMenu] = useState(false)
   

    const contextValue = {
        isShowSidebarMenu,
        setIsShowSidebarMenu, 
    }

    return (
        <sidebarMenuContext.Provider value={contextValue}>
            {children}
        </sidebarMenuContext.Provider>
    )
}

export default SidebarMenuProvider;