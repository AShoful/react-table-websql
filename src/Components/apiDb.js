/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
export function openDb(name) {
  return openDatabase(`${name}`, '0.1', 'A Database my contact', 1024 * 1024);
}

export function createTable(db) {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS t1 (id integer primary key autoincrement, fullName, phone, email)'
    );
  });
}

export function insertIntoTable(db, { name, lastName, phone, email }) {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO t1 (fullName, phone, email) VALUES (?,?,?)', [
      `${name} ${lastName}`,
      phone,
      email
    ]);
  });
}

export function deleteTable(db) {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE t1');
  });
  alert('Таблица удалена');
}

export function deleteRowInTable(db) {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM t1');
  });
  alert('Таблица удалена');
}

export function updateTable(db, field, fieldName, fullName) {
  db.transaction((tx) => {
    tx.executeSql(`UPDATE t1 SET ${fieldName}=? WHERE fullName=?;`, [
      field,
      fullName
    ]);
  });
}

export function deleteRow(db, id) {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM t1 WHERE id=?;', [id]);
  });
}

export function readTable(db) {
  return new Promise((res) => {
    const table = [];
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM t1;`, [], (tx, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          table.push(item);
        }
        res(table);
      });
    });
  });
}
