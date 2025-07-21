import { openDatabase } from 'expo-sqlite';

const db = openDatabase('little_lemon');

export const initialiseDB = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists menu (id integer primary key not null, name text, description text, price real, image text, category text);",
            [],
            () => { callback(); },
            (t, error) => { console.log("Error creating table: ", error); }
        );
    });
};

export const loadData = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "select * from menu",
            [],
            (_, { rows: { _array } }) => { callback(_array); },
            (t, error) => { console.log("Error fetching menu items: ", error); }
        );
    });
};

export const storeDataInDB = (menu, callback) => {
    db.transaction(tx => {
        menu.forEach(item => {
            tx.executeSql(
                "insert into menu (name, description, price, image, category) values (?, ?, ?, ?, ?);",
                [item.name, item.description, item.price, item.image, item.category]
            );
        });
    }, (error) => {
        console.log("Transaction error: ", error);
    }, () => {
        callback();
    });
};