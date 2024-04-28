import {Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Screens} from "../navigation/Screens.ts";
import {StackScreenProps} from "../navigation/navigation.tsx";
import {useEffect, useState} from "react";
import {Todo} from "../model/Todo.ts";
import {useRealm} from "@realm/react";
import {useIsFocused} from "@react-navigation/native";
import TodoListItem from "../components/TodoListItem.tsx";
import Entypo from "react-native-vector-icons/Entypo"
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";


const TodoList = (props: StackScreenProps) => {
    const {navigation, route} = props
    const realm = useRealm()
    const isFocused = useIsFocused()
    const [queryState, setQueryState] = useState<boolean>(false)

    const [todos, setTodos] = useState<Todo[]>([])
    const loadLocal = () => {
        const data = realm.objects(Todo).map(item => item)
        setTodos(data)
    }

    const headerOptions: Partial<NativeStackNavigationOptions> = {
        headerRight: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate(Screens.TODO_CREATE)}>
                    <Entypo name={"plus"} size={30}/>
                </TouchableOpacity>
            )
        }
    }

    useEffect(() => {
        loadLocal()
        navigation.setOptions(headerOptions)
    }, [isFocused]);

    const handleDelete = (todo: Todo) => {
        Alert.alert(`Delete ${todo.title}`, 'Do you want to delete todo?', [
            {
                text: 'Cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    setQueryState(true)
                    realm.write(() => {
                        realm.delete(todo)
                        loadLocal()
                    })
                    setQueryState(false)
                }
            },
        ]);

    }

    const handleItemClick = (todo: Todo) => {
        navigation.navigate(Screens.TODO_EDIT, {id: todo._id})
    }

    return (
        <SafeAreaView>
            {todos.length ?
                <FlatList
                    style={{width: "100%", height: "90%"}}
                    data={todos}
                    renderItem={(item) =>
                        <TodoListItem
                            todo={item.item}
                            onClick={handleItemClick}
                            onDelete={handleDelete}
                        />
                    }
                />
                : <Text
                    style={{width: "100%", textAlign:"center", paddingTop:20}}
                >Not created any todos</Text>
            }
        </SafeAreaView>
    )
}

export default TodoList
