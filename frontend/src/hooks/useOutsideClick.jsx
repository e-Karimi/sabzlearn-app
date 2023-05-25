import React, { useEffect } from 'react'

export default function useOutsideClick(containerRef, menuRef, callback) {

    const handleClickOutside = (event) => {
        if (containerRef?.current?.contains(event.target) && !menuRef?.current?.contains(event.target)) {
            callback()
        }
    }

    useEffect(() => {

        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('touchstart', handleClickOutside)
        }
    })
}
