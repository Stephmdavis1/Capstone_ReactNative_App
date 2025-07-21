import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';

const CategoryList = ({ categories, selectedCategories, onCategorySelect }) => {
    const isCategorySelected = (category) => selectedCategories.includes(category);

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    return (
        <ScrollView style={styles.container} horizontal={true}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.categoryItem,
                        isCategorySelected(category) ? styles.categoryItemSelected : {}
                    ]}
                    onPress={() => onCategorySelect(category)}
                >
                    <Text style={[
                        styles.categoryText,
                        isCategorySelected(category) ? styles.categoryTextSelected : {}
                    ]}>
                        {toTitleCase(category)}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    categoryItem: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: colors.backgroundOnboarding,
        borderWidth: 1,
        borderColor: colors.backgroundOnboarding,
        marginBottom: 5,
    },
    categoryItemSelected: {
        backgroundColor: colors.primaryYellow,
        borderColor: colors.primaryYellow,
    },
    categoryText: {
        color: colors.textLight,
        fontSize: 16,
        fontFamily: fonts.karla.extraBold,
    },
    categoryTextSelected: {
        color: colors.textDark,
    },
});

export default CategoryList;