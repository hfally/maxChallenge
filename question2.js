// Get number of occurence of a value in an array
const occurence = (array, item) => {
	let number = 0;

	array.forEach(each => {
		if (each === item) {
			number++;
		}
	})

	return number;
}

// Get unique values of an array
const unique = array => {
	let newArray = [];

	array.forEach(each => {
		if (newArray.indexOf(each) === -1){
			newArray.push(each);
		}
	})

	return newArray;
}

// Filter incomplete pairs from clean pile
const incomplete = cleanPile => {
	let uniqueClean = unique(cleanPile);
	
	// Incomplete Clean
	let incompleteClean = [];

	uniqueClean.forEach(each => {
		let count = occurence(cleanPile, each);
		
		if (count % 2 !== 0) {
			incompleteClean.push(each);
		}
	});	

	return incompleteClean;
}

// Get pairs
const getPairs = array => {
    let pairs = [];
    let singles = unique(array);

    singles.forEach(each => {
        let count = occurence(array, each);

        if(count > 1) {
            let possiblePairs = (Math.floor(count/2)) * 2;
            let group = [];
            
            for (i = 1; i <= possiblePairs; i++) {
                pairs.push(each);
            }
        }
    });

    return pairs;
}

// Get the socks that will be reasonable to wash
const getToBeWashed = (noOfWashes, cleanPile, dirtyPile) => {
    let toBeWashed = [];
    noOfWashes = parseInt(noOfWashes);

	if (noOfWashes < 1) {
		return toBeWashed;
	}

	let incompleteClean = incomplete(cleanPile);

	// Attempt to find completing pair of incomplete clean in dirty pile
	let uniqueDirty = unique(dirtyPile);

	uniqueDirty.forEach(each => {
		if (noOfWashes === toBeWashed.length) {
            return;
        }

        if (incompleteClean.indexOf(each) > -1) {
            let firstIndex = dirtyPile.indexOf(each);

            toBeWashed.push(each);
            
            dirtyPile.splice(firstIndex, 1);
        }
    });
    
    // If possible number of washes has been reached or its not possible to go more
    if (noOfWashes === toBeWashed.length || (noOfWashes - toBeWashed.length) < 2) {
        return toBeWashed;
    }

    // Check for other possible pairs remaining in dirtyPile
    let possiblePairs = (noOfWashes - toBeWashed.length) / 2;
    let singles = (Math.floor(possiblePairs)) * 2;

    let dirtyPairs = getPairs(dirtyPile);
    
    if (dirtyPairs.length < 2) {
        return toBeWashed;
    }

    let readyPairs = dirtyPairs.splice(0, singles);

    return toBeWashed.concat(readyPairs);
}

// Get possible pairs to travel with
const getPossiblePairs = (noOfWashes, cleanPile, dirtyPile) => {
    let toBeWashed = getToBeWashed(noOfWashes, cleanPile, dirtyPile);
    let allWashed = cleanPile.concat(toBeWashed);
    let singles = unique(allWashed);
    let pairs = getPairs(allWashed);

    return pairs.length/2;
}

const noOfWashes = 0;
const cleanPile = [1, 2, 1, 1];
const dirtyPile = [1, 4, 3, 2, 4];

let pairs = getPossiblePairs(noOfWashes, cleanPile, dirtyPile);

console.log(pairs);