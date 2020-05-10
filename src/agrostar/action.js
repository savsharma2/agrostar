export const FETCH_AGRO_INFO = 'FETCH_AGRO_INFO';
export const FETCH_AGRO_INFO_SUCCESS = 'FETCH_AGRO_INFO_SUCCESS';
export const FETCH_AGRO_INFO_FAIL = 'FETCH_AGRO_INFO_FAIL';

export const TOGGLE_LEAF = 'TOGGLE_LEAF';
export const EXPAND_LEAF = 'EXPAND_LEAF';

export const fetchAgroInfo = () => ({
    types: [FETCH_AGRO_INFO, FETCH_AGRO_INFO_SUCCESS, FETCH_AGRO_INFO_FAIL],
    promise: client => {

        return client.get(`http://www.mocky.io/v2/5cff79fc3200007100eac68f`);
    }
});

export const toggleLeaf = (id) => {
    return {
        type: TOGGLE_LEAF,
        id
    }
};

export const expandLeaf = (id, expanded) => {
    // debugger;
    return {
        type: EXPAND_LEAF,
        id, expanded
    }
};