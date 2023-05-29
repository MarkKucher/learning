export const container = {
    peace: {
        background: '#32CD32FF'
    },
    warn: {
        background: '#FFFF00FF'
    },
    angry: {
        background: '#FF0000FF'
    },
    dead: {
        background: '#0000FFFF'
    }
}

export const smile = (multiplier: number) => ({
    peace: {
        d: `M${75 * multiplier} ${200 * multiplier} C${105 * multiplier} ${240 * multiplier}, ${195 * multiplier} ${240 * multiplier}, ${225 * multiplier} ${200 * multiplier}`
    },
    warn: {
        d: `M${75 * multiplier} ${200 * multiplier} C${105 * multiplier} ${200 * multiplier}, ${195 * multiplier} ${200 * multiplier}, ${225 * multiplier} ${200 * multiplier}`
    },
    angry: {
        d: `M${75 * multiplier} ${200 * multiplier} C${105 * multiplier} ${160 * multiplier}, ${195 * multiplier} ${160 * multiplier}, ${225 * multiplier} ${200 * multiplier}`
    },
    dead: {
        d: `M${75 * multiplier} ${200 * multiplier} C${105 * multiplier} ${200 * multiplier}, ${195 * multiplier} ${200 * multiplier}, ${225 * multiplier} ${200 * multiplier}`
    }
})

export const rightEye = (multiplier: number) => ({
    peace: {
        d: `M${225 * multiplier} ${100 * multiplier} C${210 * multiplier} ${85 * multiplier}, ${195 * multiplier} ${85 * multiplier}, ${180 * multiplier} ${100 * multiplier}`
    },
    warn: {
        d: `M${225 * multiplier} ${100 * multiplier} C${210 * multiplier} ${100 * multiplier}, ${195 * multiplier} ${100 * multiplier}, ${180 * multiplier} ${100 * multiplier}`
    },
    angry: {
        d: `M${225 * multiplier} ${100 * multiplier} C${210 * multiplier} ${110 * multiplier}, ${195 * multiplier} ${120 * multiplier}, ${180 * multiplier} ${130 * multiplier}`
    },
    dead: {
        d: `M${225 * multiplier} ${100 * multiplier} C${215 * multiplier} ${90 * multiplier}, ${205 * multiplier} ${80 * multiplier}, ${195 * multiplier} ${70 * multiplier}`
    }
})

export const rightCross = (multiplier: number) => ({
    peace: {
        opacity: 0,
        d: `M${195 * multiplier} ${100 * multiplier} L ${195 * multiplier} ${100 * multiplier}`
    },
    warn: {
        opacity: 0,
        d: `M${195 * multiplier} ${100 * multiplier} L ${195 * multiplier} ${100 * multiplier}`
    },
    angry: {
        opacity: 0,
        d: `M${195 * multiplier} ${100 * multiplier} L ${195 * multiplier} ${100 * multiplier}`
    },
    dead: {
        opacity: 1,
        d: `M${195 * multiplier} ${100 * multiplier} L${225 * multiplier} ${70 * multiplier}`
    }
})

export const leftEye = (multiplier: number) => ({
    peace: {
        d: `M${75 * multiplier} ${100 * multiplier} C${90 * multiplier} ${85 * multiplier}, ${105 * multiplier} ${85 * multiplier}, ${120 * multiplier} ${100 * multiplier}`
    },
    warn: {
        d: `M${75 * multiplier} ${100 * multiplier} C${90 * multiplier} ${100 * multiplier}, ${105 * multiplier} ${100 * multiplier}, ${120 * multiplier} ${100 * multiplier}`
    },
    angry: {
        d: `M${75 * multiplier} ${100 * multiplier} C${90 * multiplier} ${110 * multiplier}, ${105 * multiplier} ${120 * multiplier}, ${120 * multiplier} ${130 * multiplier}`
    },
    dead: {
        d: `M${75 * multiplier} ${100 * multiplier} C${85 * multiplier} ${90 * multiplier}, ${95 * multiplier} ${80 * multiplier}, ${105 * multiplier} ${70 * multiplier}`
    }
})

export const leftCross = (multiplier: number) => ({
    peace: {
        opacity: 0,
        d: `M${105 * multiplier} ${100 * multiplier} L${105 * multiplier} ${100 * multiplier}`
    },
    warn: {
        opacity: 0,
        d: `M${105 * multiplier} ${100 * multiplier} L${105 * multiplier} ${100 * multiplier}`
    },
    angry: {
        opacity: 0,
        d: `M${105 * multiplier} ${100 * multiplier} L${105 * multiplier} ${100 * multiplier}`
    },
    dead: {
        opacity: 1,
        d: `M${105 * multiplier} ${100 * multiplier} L${75 * multiplier} ${70 * multiplier}`
    }
})