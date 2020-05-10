import { FETCH_AGRO_INFO, FETCH_AGRO_INFO_SUCCESS, FETCH_AGRO_INFO_FAIL, TOGGLE_LEAF, EXPAND_LEAF } from './action';

import produce from "immer"

const INITIAL_STATE = {
    isLoading: false,
    isLoaded: false
};

const findLeaf = (tree, id) => {
    const { source, children } = tree;
    let leaf = null
    if (source === id) {
        leaf = tree;
    } else if (children instanceof Array && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            let res = findLeaf(child, id);
            // debugger;
            if (res) {
                leaf = res;
                // debugger;
                break;
            }
        }
    }
    return leaf;
};

const markAll = (tree, checked) => {
    tree.checked = checked;
    if (tree.children instanceof Array) {
        tree.children.forEach(child => {
            markAll(child, checked);
        });
    }
};

const markDependecies = (tree) => {
    let markTree = true;
    if (tree.children instanceof Array && tree.children.length > 0) {
        markTree = true;
        for (let i = 0; i < tree.children.length; i++) {
            const child = markDependecies(tree.children[i]);
            if (!child.checked) {
                markTree = false;
            }
        }
        tree.checked = markTree;
    }

    return tree;
}

const agroInfo = (state = INITIAL_STATE, { type, result, id, expanded, error }) => {
    if (type === FETCH_AGRO_INFO) {
        state = { ...state, isLoading: true, isLoaded: false };
    } else if (type === FETCH_AGRO_INFO_SUCCESS) {
        state = { ...state, isLoading: false, isLoaded: true, data: result };
    } else if (type === FETCH_AGRO_INFO_FAIL) {
        state = { ...state, isLoading: false, isLoaded: false, data: undefined, error };
    } else if (type === TOGGLE_LEAF) {

        const nextState = produce(state, draftState => {
            const leaf = findLeaf(draftState.data, id);
            markAll(leaf, leaf.checked === true ? false : true);
            markDependecies(draftState.data);
        });
        return nextState;
    } else if (type === EXPAND_LEAF) {
        const nextState = produce(state, draftState => {
            const leaf = findLeaf(draftState.data, id);
            leaf.expanded = expanded;
        });
        return nextState;
    }
    // For now, don't handle any actions
    // and just return the state given to us.
    return state
};

export const getAgroInfo = (state) => state.agroInfo;



export default agroInfo;
