//Feed the function an array of objects as the first paramter, and a property to look for and validate as the second parameter
//The functions returns true if all child objects of the given array contain a truthy value for the given property paramater.
//Change the == in the return line to != to reverse the effect.

function truthCheck(collection, pre) {

  let results = collection.map((item) => item.hasOwnProperty(pre) ? Boolean(item[pre]) ? true : false : false)

  return results.indexOf(false) == -1;
}

// vv Example vv

truthCheck( [{"animal-type" : "dog", "legs": 4}, {"animal-type" : "bird", "legs": 2}, {"animal-type":"shark", "legs": 0}], "legs" );

// ^^ Returns false. Despite the third object having the property "legs", 
// it is set to 0, a false value, and thus the returned output is false
