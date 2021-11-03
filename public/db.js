const iDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db;
const request = iDB.open("budgetDB", 1);

request.onupgradeneeded = ({target}) => {
	let db = target.result;
	db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = ({target}) => {
	db = target.result;

	// check if app is online before reading from db
	if (navigator.onLine) {
		checkDatabase();
	}
};

function saveRecord(record) {
	const transaction = db.transaction(["pending"], "readwrite");
	const pendingStore = transaction.objectStore("pending");

	pendingStore.add(record);
}
