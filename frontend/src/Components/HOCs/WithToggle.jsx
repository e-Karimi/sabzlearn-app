import React, { useState } from 'react'

export default function WithToggle(OriginalComponent) {
    const EnhancedComponent = (props) => {
        const [isShowSubMenu, setIsShowSubMenu] = useState(false)
        const toggleShow = () => setIsShowSubMenu(prev => !prev)

        return <OriginalComponent isShowSubMenu={isShowSubMenu} toggleShow ={toggleShow} {...props}/>
    }
    return EnhancedComponent;
}
