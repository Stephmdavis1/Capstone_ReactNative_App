import React, {useEffect, useState} from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const CustomHeader = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');

    const loadProfile = async () => {
        const storedProfile = await AsyncStorage.getItem('profile');
        const storedImage = await AsyncStorage.getItem('imageUri');

        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            setName(profile.name);
        }

        if (storedImage) {
            setImageUri(storedImage);
        } 
    };

    useEffect(() => {
        if (isFocused) {
            loadProfile();
        }

    }, [isFocused]);

    const getInitials = (name) => {
        return name ? name.substring(0, 2).toUpperCase() : '';
      };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.avatar} />
                ) : (
                    <View style={styles.initialsContainer}>
                        <Text style={styles.initialsText}>
                            {getInitials(name)}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
)};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },

    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    logo: {
        width: 200,
        height: 80, 
        resizeMode: "contain",
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },

    initialsContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    initialsText: {
        color: '#fff', 
        fontSize: 18,
    }
})

export default CustomHeader;