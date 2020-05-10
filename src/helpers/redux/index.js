import { createSelectorName, createSliceSelector } from './create-selector';
import { createAction } from './create-action';
import { createReducer } from './create-reducer';


//////////////////////********************/////////////////////////////
const getType = ({ slice, actionKey }) => {
  return slice ? `${slice}/${actionKey}` : actionKey;
};

export const createSlice = ({
  slice = '',
  initialState,
  reducers = {},
  extraReducers = {}
}) => {
  const actionKeys = Object.keys(reducers);

  ///////////////////////////////////////////////
  const reducerMap = actionKeys.reduce(
    (map, actionKey) => {
      map[getType({ slice, actionKey })] = reducers[actionKey];
      return map;
    },
    { ...extraReducers }
  );

  const reducer = createReducer(initialState, reducerMap);

  const actionMap = actionKeys.reduce((map, actionKey) => {
    const type = getType({ slice, actionKey });

    map[actionKey] = createAction(type);
    return map;
  }, {});

  const selectors = {
    [createSelectorName(slice)]: createSliceSelector(slice)
  };

  return {
    slice,
    reducer,
    actions: actionMap,
    selectors
  };
};