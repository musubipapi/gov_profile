// helper fn to remove duplicates based on a specific object property's value
export const removeDuplicatesBy = (keyFn: any, array: any) => {
  const mySet = new Set();
  return array.filter(function (x: any) {
    const key = keyFn(x),
      isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
};
