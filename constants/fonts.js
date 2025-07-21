import * as Font from 'expo-font';

// Define the font files
const fontAssets = {
    'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
    'Karla-BoldItalic': require('../assets/fonts/Karla-BoldItalic.ttf'),
    'Karla-ExtraBold': require('../assets/fonts/Karla-ExtraBold.ttf'),
    'Karla-ExtraBoldItalic': require('../assets/fonts/Karla-ExtraBoldItalic.ttf'),
    'Karla-ExtraLight': require('../assets/fonts/Karla-ExtraLight.ttf'),
    'Karla-ExtraLightItalic': require('../assets/fonts/Karla-ExtraLightItalic.ttf'),
    'Karla-Italic': require('../assets/fonts/Karla-Italic.ttf'),
    'Karla-Light': require('../assets/fonts/Karla-Light.ttf'),
    'Karla-LightItalic': require('../assets/fonts/Karla-LightItalic.ttf'),
    'Karla-Medium': require('../assets/fonts/Karla-Medium.ttf'),
    'Karla-MediumItalic': require('../assets/fonts/Karla-MediumItalic.ttf'),
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
    'Karla-SemiBold': require('../assets/fonts/Karla-SemiBold.ttf'),
    'Karla-SemiBoldItalic': require('../assets/fonts/Karla-SemiBoldItalic.ttf'),
    'MarkaziText-Bold': require('../assets/fonts/MarkaziText-Bold.ttf'),
    'MarkaziText-Medium': require('../assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
    'MarkaziText-SemiBold': require('../assets/fonts/MarkaziText-SemiBold.ttf'),
};

// Load fonts
export async function loadFonts() {
    await Font.loadAsync(fontAssets);
}

// Export font styles
export const fonts = {
    karla: {
        bold: 'Karla-Bold',
        boldItalic: 'Karla-BoldItalic',
        extraBold: 'Karla-ExtraBold',
        extraBoldItalic: 'Karla-ExtraBoldItalic',
        extraLight: 'Karla-ExtraLight',
        extraLightItalic: 'Karla-ExtraLightItalic',
        italic: 'Karla-Italic',
        light: 'Karla-Light',
        lightItalic: 'Karla-LightItalic',
        medium: 'Karla-Medium',
        mediumItalic: 'Karla-MediumItalic',
        regular: 'Karla-Regular',
        semiBold: 'Karla-SemiBold',
        semiBoldItalic: 'Karla-SemiBoldItalic',
    },
    markaziText: {
        bold: 'MarkaziText-Bold',
        medium: 'MarkaziText-Medium',
        regular: 'MarkaziText-Regular',
        semiBold: 'MarkaziText-SemiBold',
    }
};