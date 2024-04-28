import React from 'react';
import {RealmProvider} from "@realm/react";
import {Todo} from "./src/model/Todo.ts";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Navigation from "./src/navigation/navigation.tsx";


function App(): React.JSX.Element {

    return (
        <RealmProvider schema={[Todo]} schemaVersion={4}>
            <NavigationContainer>
                <Navigation/>
            </NavigationContainer>
        </RealmProvider>
    );
}

export default App;
