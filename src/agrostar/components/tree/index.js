import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';


const Expand = () => {
    return <img src='./expand.png' alt='Expand'></img>;
};

const Collapse = () => {
    return <img src='./collapse.png' alt='Collapse'></img>;
};

const Tree = ({ source, leaves, onToggle, expanded, checked, onExpand }) => {
    return <div>

        {leaves && leaves.length > 0 && <span onClick={() => { onExpand(source, !expanded) }}> {expanded ? <Collapse /> : <Expand />}  </span>}
        <input type='checkbox' checked={checked} onChange={onToggle.bind(null, source)}></input>
        <span>{source} </span>
        {leaves && <div className={expanded ? `${styles.children} ${styles.expanded}` : `${styles.children} ${styles.collapsed}`}>
            {leaves.map((leaf) => {
                return <Tree key={leaf.source} source={leaf.source} onExpand={onExpand} expanded={leaf.expanded} checked={leaf.checked} leaves={leaf.children} onToggle={onToggle}>
                </Tree>
            })}
        </div>}
    </div>;
};

Tree.propTypes = {
    source: PropTypes.string.isRequired,
    leaves: PropTypes.arrayOf(PropTypes.shape(PropTypes.object)),
    checked: PropTypes.bool,
    onToggle: PropTypes.func,
    expandLeaf: PropTypes.func
};

Tree.defaultProps = {
    expandLeaf: () => { },
    onToggle: () => { },
    checked: false,
    expanded: true
}

export default Tree;
