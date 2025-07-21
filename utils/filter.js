import { openDatabase } from 'expo-sqlite';

const db = openDatabase('little_lemon');

// Category
export const filterMenuItemsByCategory = (items, selectedCategories) => {
    if (selectedCategories.length === 0) {
        return items;
    }
    return items.filter(item => selectedCategories.includes(item.category));
};

// Search bar
export const fetchFilteredMenuItems = (searchText, selectedCategories, callback) => {
    const query = "SELECT * FROM menu WHERE name LIKE ?" + 
        (selectedCategories.length > 0 ? " AND category IN (" + selectedCategories.map(() => '?').join(',') + ")" : "");
    const params = [`%${searchText}%`, ...selectedCategories];

    db.transaction(tx => {
        tx.executeSql(
            query,
            params,
            (_, { rows: { _array } }) => callback(null, _array),
            (_, error) => callback(error)
        );
    });
};