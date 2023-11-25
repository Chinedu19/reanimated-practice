const data = [
  { id: 1, name: "Shula" },
  { id: 2, name: "justice" },
];

/*
-- Here are the steps to achieve this

1. convert received data to a tuple with the ID as the identifier
2.  Simply convert the tuple to a Map with: new Map(tuple)


-- when saving to a serializable state (eg. redux state), convert the data back to a tuple with: Array.from(mapObject.entries())
-- You can then string this data if you want

-- when pulling the data from a redux state, simply convert the tuple to a map

*/

const serialize = data.reduce((acc, current) => {
  return acc.concat([[current.id, current]]);
}, []);

const userMap = new Map(serialize);
console.log(userMap.set(3, {}));

const newS = Array.from(userMap.entries());
console.log(newS);
// Output: [[1, {id: 1, name: "Shula"}], [2, {id: 2, name: "justice"}], [3, {}]]

const serializedMap = JSON.stringify(newS);
console.log(serializedMap);
// Output: '[["1",{"id":1,"name":"Shula"}],["2",{"id":2,"name":"justice"}],["3",{}]]'
