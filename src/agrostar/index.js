import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAgroInfo, toggleLeaf, expandLeaf } from './action';
import { getAgroInfo } from './reducer';

import Tree from './components/tree';

const AgroTree = ({ fetchAgroInfo, expandLeaf, toggleLeaf, agroInfo: { isLoaded, data } }) => {

    useEffect(() => {
        fetchAgroInfo();
    }, []);
    // debugger;
    return isLoaded ? <Tree source={data.source} expanded={data.expanded} onExpand={expandLeaf} onToggle={toggleLeaf} checked={data.checked} leaves={data.children} ></Tree> : <div> Loading </div>;
};

export default connect(
    state => {
        return {
            agroInfo: getAgroInfo(state)
        };
    },
    { fetchAgroInfo, toggleLeaf, expandLeaf }
)(AgroTree);
