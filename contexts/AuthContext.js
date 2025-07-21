import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

// Action types
const authActionTypes = {
  ONBOARD: 'ONBOARD',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  isLoading: true,
  isOnboardingCompleted: false,
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case authActionTypes.ONBOARD:
      return {
        ...state,
        isOnboardingCompleted: action.isOnboardingCompleted,
        isLoading: false,
      };
    case authActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authActions = useMemo(() => ({
    onboard: async (data) => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("profile", jsonValue);
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted: true });
      } catch (e) {
        console.error('Error at authContext onboard:', e);
      }
    },
    checkOnboard: async () => {
      try {
        const getUserProfile = await AsyncStorage.getItem("profile");
        const isOnboardingCompleted = getUserProfile !== null;
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted });
      } catch (e) {
        console.error('Error retrieving onboarding status:', e);
      } finally {
        dispatch({ type: authActionTypes.SET_LOADING, isLoading: false });
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem("profile");
        await AsyncStorage.removeItem("imageUri");
        dispatch({ type: authActionTypes.ONBOARD, isOnboardingCompleted: false });
      } catch (e) {
        console.error('Error at authContext logout:', e);
      }
    },
    setLoading: (isLoading) => {
      dispatch({ type: authActionTypes.SET_LOADING, isLoading });
    }
  }), []);

  return (
    <AuthContext.Provider value={{ state, authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};