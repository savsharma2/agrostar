import createNextState from 'immer';

export const createReducer = (initialState, actionsMap) => {
    return function (state, action) {
        if (state === void 0) {
            state = initialState;
        }
        return createNextState(state, function (draft) {
            const caseReducer = actionsMap[action.type];
            return caseReducer ? caseReducer(draft, action) : undefined;
        });
    };
};

export const createAsyncReducer = (initialState, caseReducer) => {
    return function (state, action) {
        if (state === void 0) {
            state = initialState;
        }
        return createNextState(state, function (draft) {
            return caseReducer ? caseReducer(draft, action) : undefined;
        });
    };
};
