import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import {Screens} from "./Screens.ts";
import TodoList from "../screens/TodoList.tsx";
import TodoEditScreen, {TodoEditParams} from "../screens/TodoEditScreen.tsx";
import TodoCreateScreen from "../screens/TodoCreateScreen.tsx";

const Stack = createNativeStackNavigator()

export type RootStackParams = {
    TODO_LIST: undefined;
    TODO_EDIT: TodoEditParams;
    TODO_CREATE: undefined;
};

export interface StackScreenProps<T = undefined> extends NativeStackScreenProps<RootStackParams, T> {
}

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName={Screens.TODO_LIST}>
            <Stack.Screen
                name={Screens.TODO_LIST}
                component={TodoList}
                options={{
                    title: "Todo List"
                }}
            />
            <Stack.Screen
                name={Screens.TODO_EDIT}
                component={TodoEditScreen}
                options={{title: "Edit Todo"}}
            />
            <Stack.Screen
                name={Screens.TODO_CREATE}
                component={TodoCreateScreen}
                options={{title: "Create Todo"}}
            />
        </Stack.Navigator>
    )
}

export default Navigation
