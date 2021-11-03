const iDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db;
const request = iDB.open("budgetDB", 1);

request.onupgradeneeded = ({ target }) => {
      let db = target.result;
      db.createObjectStore("pending", { autoIncrement: true });
    };