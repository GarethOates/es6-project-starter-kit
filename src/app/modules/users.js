// action creators
const
    FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED',
    FETCH_USER           = 'FETCH_USER',
    FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED',

    fetchUser = username => ({ type: FETCH_USER, payload: username }),
    fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload }),
    fetchUserCancelled = () => ({ type: FETCH_USER_CANCELLED })

// epic
export const fetchUserEpic = action$ =>
action$.ofType(FETCH_USER)
.mergeMap(action =>
    ajax.getJSON(`https://api.github.com/users/${action.payload}`)
    .map(fetchUserFulfilled)
    .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
)

export default users = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {
                [action.payload.login]: action.payload
            }

        default:
            return state
    }
}
