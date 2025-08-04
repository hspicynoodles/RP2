import { StatusBar } from 'expo-status-bar'; // import StatusBar which controls the phonoes status bar (battery,time_etc)
import { StyleSheet, Text, View } from 'react-native'; // import Stylesheet like CSS but in JS, Text to display text and View like a div in HTML 
import { FontAwesome } from '@expo/vector-icons'; // import FontAwesome icons for use in the app
import { Fontisto } from '@expo/vector-icons';
import StackNavigator from './navigation/StackNavigator';
import { ModalPortal } from 'react-native-modals'; // import ModalPortal for displaying modals in the app
import { AuthProvider } from './AuthContext';
//define the main App component
// returns JSX (HTML-like code)

export default function App() {
  return (
    <>
      <AuthProvider>
        <>
          <StackNavigator />
          <ModalPortal />
        </>
      </AuthProvider>
    </>
  );
}


//CSS Stylesheet 
const styles = StyleSheet.create({
  container: {
    flex: 1, // fiFRll the entire screen 
    backgroundColor: '#fff', // background color of app 
    alignItems: 'center', // center children horizontally
    justifyContent: 'center', // center children vertically
  },
});
