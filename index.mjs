const global_uuid = `FACD900A-9868-4CCB-B660-9DDF52D1BE12`

const symbol = Symbol.for(
	`@anio-js-core-foundation/anio-global-store-${global_uuid}`
)

//
// return the global store
// create it if it doesn't exist yet
//
function getGlobalStore() {
	if (symbol in globalThis) {
		return globalThis[symbol]
	}

	globalThis[symbol] = {
		//
		// private_items will never be
		// passed down to a worker created 
		// by @anio-js-foundation/node-create-worker
		//
		private_items: new Map(),
		//
		// shared_items will be passed
		// down to a worker created
		// by @anio-js-foundation/node-create-worker
		//
		shared_items: new Map()
	}

	return globalThis[symbol]
}

function genericSetItem(map, key, value) {
	const previous_item_value = map.has(key) ? map.get(key) : null

	map.set(key, value)

	return previous_item_value
}

function genericGetItem(map, key) {
	if (!map.has(key)) {
		throw new Error(`No such key '${key}' in anio-global-store. (operation: get)`)
	}

	return map.get(key)
}

function genericDeleteItem(map, key) {
	if (!map.has(key)) {
		throw new Error(`No such key '${key}' in anio-global-store. (operation: delete)`)
	}

	map.delete(key)
}



//
// private globals
//
export function setItem(key, value) {
	const {private_items} = getGlobalStore()

	return genericSetItem(private_items, key, value)
}

export function getItem(key) {
	const {private_items} = getGlobalStore()

	return genericGetItem(private_items, key)
}

export function deleteItem(key) {
	const {private_items} = getGlobalStore()

	genericDeleteItem(private_items, key)
}

export function getItems() {
	const {private_items} = getGlobalStore()

	// only return a copy
	return new Map(private_items)
}

//
// "shared" globals
//
export function setSharedItem(key, value) {
	const {shared_items} = getGlobalStore()

	return genericSetItem(shared_items, key, value)
}

export function getSharedItem(key) {
	const {shared_items} = getGlobalStore()

	return genericGetItem(shared_items, key)
}

export function deleteSharedItem(key) {
	const {shared_items} = getGlobalStore()

	genericDeleteItem(shared_items, key)
}

export function getSharedItems() {
	const {shared_items} = getGlobalStore()

	return new Map(shared_items)
}

//
export default {
	setItem,
	getItem,
	deleteItem,
	getItems,

	setSharedItem,
	getSharedItem,
	deleteSharedItem,
	getSharedItems
}
