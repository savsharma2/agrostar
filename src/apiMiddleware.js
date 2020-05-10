export const apiMiddleware = client => ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    const { promise, types } = action;

    if (!promise) {
        return next(action);
    }

    if (!types) {
        throw new Error('[ApiClient]: Required property `types` missing');
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ type: REQUEST });

    const actionPromise = promise(client, getState);

    actionPromise.then(
        (result) => {
            if (result.ok) {
                result.json().then(({responseData}) => {
                    next({ result: responseData, type: SUCCESS });
                })
            }
        },
        (error) => {
            next({ error, type: FAILURE });
        },
    ).catch((error) => {
        next({ error, type: FAILURE });
    });

    return actionPromise;
};