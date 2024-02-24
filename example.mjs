import {
	hasItem,
	setItem,
	getItem,
	deleteItem,
	getItems,

	hasSharedItem,
	setSharedItem,
	getSharedItem,
	deleteSharedItem,
	getSharedItems
} from "./index.mjs"

console.log(setItem("a", 1)) // null
console.log(setItem("a", 2)) // 1
console.log(setItem("a", 3)) // 2

console.log(getItem("a")) // 3
console.log(getItems())
console.log(hasItem("a"), hasItem("b"))

console.log(setSharedItem("a", 100)) // null
console.log(setSharedItem("a", 200)) // 100
console.log(getSharedItem("a")) // 200
console.log(getSharedItems())
console.log(hasSharedItem("a"), hasSharedItem("b"))
