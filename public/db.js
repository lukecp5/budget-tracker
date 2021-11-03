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
console.log(`\nREQUEST ERROR: \n${event.target}\n`);
}



function saveRecord(record) {
	const transaction = db.transaction(["pending"], "readwrite");
	const pendingStore = transaction.objectStore("pending");

	pendingStore.add(record);
}

function investigateDatabase() {
      // + Initialize the transaction 
      const transaction = db.transaction(["pending"], "readwrite");
      const pendingStore = transaction.objectStore("pending");

      // + Create the cursor to iterate over the records
      const allPending = pendingStore.getAll();
}


window.addEventListener("online", investigateDatabase);