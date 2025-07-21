import React, { useEffect, useState, useCallback  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { initialiseDB, loadData, storeDataInDB } from '../utils/database';
import debounce from 'lodash.debounce';

import CustomHeader from '../components/CustomHeader';
import CategoryList from '../components/CategoryList';
import { filterMenuItemsByCategory, fetchFilteredMenuItems } from '../utils/filter';
import Banner from '../components/Banner';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';

// const URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const URL = "https://raw.githubusercontent.com/Stephmdavis1/Working-With-Data-API/main/capstone.json";

const db = openDatabase('little_lemon');

const Home = () => {

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        initialiseDB(() => loadData(handleDataLoaded));
    }, []);




    const handleDataLoaded = (data) => {
        if (data.length === 0) {
            fetchMenuData();
        } else {
            setMenuItems(data);
            setLoading(false);
            setCategories([...new Set(data.map(item => item.category))]);
        }
    };

    const fetchMenuData = async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            storeDataInDB(data.menu, () => loadData(handleDataLoaded));
        } catch (error) {
            console.error('Error fetching menu data:', error);
            setLoading(false);
        }
    };

    // CATEGORY
    const onCategorySelect = (category) => {
        const newSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newSelectedCategories);
    };

    const filteredMenuItems = filterMenuItemsByCategory(menuItems, selectedCategories);

    // SEARCH
    const handleSearch = useCallback(debounce((text) => {
        fetchFilteredMenuItems(text, [], (error, items) => {
            if (error) {
                console.error("Error during search: ", error);
            } else {
                setMenuItems(items);
            }
        });
    }, 500), []);

    const onChangeSearchText = (text) => {
        setSearchText(text);
        handleSearch(text);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const renderItem = ({ item }) => (

        <View style={styles.menuItem}>
            <View style={styles.textSection}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <Image 
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${encodeURIComponent(item.image)}?raw=true` }} 
                style={styles.image} 
            />
        </View>
    );


    return (
        <View style={styles.container}>
            <CustomHeader />
            
            <Banner 
                title="Little Lemon"
                subtitle="Miami"
                description="Explore our wide range of dishes, from traditional classics to modern twists, all crafted with love and the finest ingredients."
                searchText={searchText}
                onChangeSearchText={onChangeSearchText}
            />

            <View style={styles.category}>
                <Text style={styles.title}>ORDER FOR DELIVERY !</Text>
                <CategoryList
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategorySelect={onCategorySelect}                    
            />
            </View>

            <FlatList
                data={filteredMenuItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    category: {
        paddingLeft: 15,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    title: {
        fontSize: 20,
        marginBottom: 2,
        marginTop: 2,
        fontFamily: fonts.karla.extraBold,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: 10,
    },

    textSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    image: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        marginLeft: 10,
        borderRadius: 10,
    },

    name: {
        fontSize: 20,
        fontFamily: fonts.karla.semiBold,
        marginBottom: 0,
    },

    description: {
        fontSize: 16,
        fontFamily: fonts.karla.regular,
        color: '#666',
        marginTop: 5,
        height: 40,
        overflow: 'hidden',
    },

    price: {
        fontSize: 24,
        fontFamily: fonts.markaziText.semiBold,
        color: colors.primaryGreen,
        marginTop: 5,
        marginBottom: 15,
    },

    list: {
        paddingLeft: 20,
        paddingRight: 20,
    }
})

export default Home;
