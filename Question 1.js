const DATA = require('./data.json')
/** TEST QUESTION 1 **/

function tableMap(list) {
	const rows = list.map(item => { 
		return { label: item.dval.value, columns: item.children.map(getColumns) }
	})
	function getColumns(child) {
		let metrics = Object.values(child.metrics)
		return {
			label: child.dval.value,
			value: metrics[metrics.length - 1].value
		}
	}
	const head = ["", ...rows.map(item => item.label), "Total"]	// => ["", "2016-10-09 (Sun)", "2016-10-09 (Mon)" ... "Total"]
	return { head, rows }
}
const table = tableMap(DATA.children)
console.log("Q1 | table output:", table)

/**
* Question 1 JSX use case example
* too much code going on in this JSX => needs refactoring
* head ["", col1, ..., total]
* rows [label, date1, ..., total]
**/

/** JSX
	<div class="table-component">
		<div class="table-head">{ table.head.map(label => <table-column label={label}/>) }</div>
		<div class="table-rows">
		{ 
			table.rows.map(cell => {
				<table-row name="label" label={cell.label}/>
				cell.columns.map(cell => <table-row name="field" label={label} />)
				<table-row name="average" value={cell.columns.reduce(rowAsTotal, 0) / cell.columns.length} />
			})
		}
		</div>
	</div>
**/

function rowAsTotal(curr, accum) {
	// helper reduce fn to total values 
	return accum + curr.value
}