import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MainGameScreen from './MainGame/MainGameScreen';
import ThirdGameScreen from './ThirdGame/ThirdGameScreen';
import SecondGameScreen from './SecondGame/SecondGameScreen';
import FirstGameScreen from './FirstGame/FirstGameScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            
            headerShown: false,
          }}
        />
       <Stack.Screen
          name="MainGameScreen"
          component={MainGameScreen}
          options={{
            
            headerShown: false,
          }}
        />
<Stack.Screen
          name="FirstGameScreen"
          component={FirstGameScreen}
          options={{
            
            headerShown: false,
          }}
        />
<Stack.Screen
          name="SecondGameScreen"
          component={SecondGameScreen}
          options={{
            
            headerShown: false,
          }}
        />
<Stack.Screen
          name="ThirdGameScreen"
          component={ThirdGameScreen}
          options={{
            
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

