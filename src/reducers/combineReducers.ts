export function combineReducers<S, A>
(reducers: { [K in keyof S]: (state: S[K], action: A) => S[K] }) {
        return (state: S, action: A): S => {
            const nextState: Partial<S> = {};

            for (const key in reducers) {
                const reducer = reducers[key];
                const currentState = state[key];
                nextState[key] = reducer(currentState, action);
            }
            return nextState as S;
        }
}