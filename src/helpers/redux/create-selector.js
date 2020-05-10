const camelize = str => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '')
      .replace(/[-_]/g, '');
  };
  
  export const createSliceSelector = slice => {
    if (!slice) {
      return state => state;
    }
    return state => {
      return state[slice];
    };
  };
  
  export const createSelectorName = slice => {
    if (!slice) {
      return 'getState';
    }
    return camelize('get ' + slice);
  };