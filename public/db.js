const iDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db;
const request = iDB.open("budgetDB", 1);

request.onupgradeneeded = ({target}) => {
	let db = target.result;
	db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = ({target}) => {
	db = target.result;
	if (navigator.onLine) {
		investigateDatabase();
	}
};

// + Handle the error in the case of the retrieval of the records from the indexed DB
request.onerror = (event) => {
console.log(event.target);
}



function saveRecord(record) {
	const transaction = db.transaction(["pending"], "readwrite");
	const pendingStore = transaction.objectStore("pending");

	pendingStore.add(record);
}

function investigateDatabase() {
      const transaction = db.transaction(["pending"], "readwrite");
      const pendingStore = transaction.objectStore("pending");

      const allPending = pendingStore.getAll();
}


window.addEventListener("online", investigateDatabase);