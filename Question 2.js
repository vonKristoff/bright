const DATA = require('./data.json')

/** 
* TEST QUESTION 2 
* Performance is an issue because of forEach not breaking once matching
* Quite AN imparitve solution
**/

// recurrsive funciton to nest any depth
function searchChildTree(child, target) {
	if(child.hasOwnProperty("dval") && child.dval.value === target) return child
	else if (child.hasOwnProperty("children" && child.children.length > 0)) {
		return searchChildTree(child, target)
	}
}

function extractValueFromTree(searchStrings, num) {
	const metric = num.toString()
	let TreeBrand = [] // string 1 item store
	let TreeValue = [] // string 2 item store
	// Find Search String 1
	DATA.children.forEach(child => {
		const match = searchChildTree(child, searchStrings[0])
		if(match != undefined) TreeBrand.push(match)
	})
	// Find Search String 2
	TreeBrand.forEach(child => {
		child.children.forEach(child => {
			const match = searchChildTree(child, searchStrings[1])
			if(match != undefined) TreeValue.push(match)
		})
	})

	return (TreeValue.length === 1) ? TreeValue.pop().metrics[metric].value : "No viable match has been found in the Tree"
}
const metricValue = extractValueFromTree(["PPC - Brand", "2016-10-10 (Mon)"], 141)
console.log("Q2 | extractValueFromTree =>", metricValue)

