export const createAction = type => {
    const actionCreator = payload => {
        return { type, payload };
    };
    actionCreator.toString = function () {
        return '' + type;
    };
    actionCreator.type = type;
    return actionCreator;
};

export const getType = actionCreator => {
    return '' + actionCreator;
};