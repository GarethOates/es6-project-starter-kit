export const pingEpic = action$ =>
    action$.filter(action => action.type === 'PING')
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' })

export default ping = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'PING':
            return { isPinging: true }

        case 'PONG':
            return { isPinging: false }

        default:
            return state
    }
}
