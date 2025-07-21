import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';

const Banner = ({ title, subtitle, description, searchText, onChangeSearchText }) => {
    return (
        <View style={styles.bannerContainer}>

            <Text style={styles.bannerTitle}>{title}</Text>
            
            <View style={styles.contentRow}>
                <View style={styles.textContainer}>
                    <Text style={styles.bannerSubtitle}>{subtitle}</Text>
                    <Text style={styles.bannerDescription}>{description}</Text>
                </View>
                <Image source={require('../assets/hero.png')} style={styles.bannerImage} />
            </View>
            
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={searchText}
                onChangeText={onChangeSearchText}
                placeholderTextColor={colors.text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: colors.backgroundOnboarding,
        marginBottom: 10,
    },

    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
    },

    bannerImage: {
        width: 120,
        height: 120,
        marginBottom: 15,
        marginLeft: 20,
        resizeMode: "cover",
        borderRadius: 10,
    },

    bannerTitle: {
        fontSize: 60,
        fontFamily: fonts.markaziText.bold,
        color: colors.primaryYellow,
        marginBottom: -20,
    },

    bannerSubtitle: {
        fontSize: 40,
        fontFamily: fonts.markaziText.semiBold,
        color: colors.background,
        marginBottom: 5,
    },

    bannerDescription: {
        fontSize: 16,
        fontFamily: fonts.karla.medium,
        color: colors.background,
        marginBottom: 20,
    },

    searchBar: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.background,
        color: colors.text,
        borderRadius: 5,
        width: '100%',
        backgroundColor: colors.background,
    },

});

export default Banner;