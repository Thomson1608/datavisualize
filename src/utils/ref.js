import React from 'react';

export const useCombinedRefs = (...refs) => {
    const target_ref = React.useRef()

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(target_ref.current)
            } else {
                ref.current = target_ref.current
            }
        })
    }, [refs])

    return target_ref
}