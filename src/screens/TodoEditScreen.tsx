import {SafeAreaView, View} from "react-native";
import {StackScreenProps} from "../navigation/navigation.tsx";
import {Screens} from "../navigation/Screens.ts";
import {useRealm} from "@realm/react";
import {Todo} from "../model/Todo.ts";
import TodoForm from "../components/TodoForm.tsx";
import {FormType} from "../enums/enums.ts";
import {useEffect, useState} from "react";
import {BSON} from "realm";
import ObjectId = BSON.ObjectId;
import useTodoDatabase from "../hooks/useTodoDatabase.ts";

export interface TodoEditParams {
    id: ObjectId
}

const TodoEditScreen = (props: StackScreenProps<Screens.TODO_EDIT>) => {
    const {route, navigation} = props
    const realm = useRealm();
    const id = route.params.id
    const [todo, setTodo] = useState<Todo | null>(null)
    const {updateTodo} = useTodoDatabase()

    useEffect(() => {
        const foundTodo = realm.objectForPrimaryKey(Todo, id)
        setTodo(foundTodo)
    }, []);

    const handleSubmit = (title: string, detail: string) => {
        updateTodo(todo!, title, detail)
        navigation.pop()
    }

    const handleCancel = () => {
        navigation.pop()
    }

    return (
        <SafeAreaView>
            {todo &&
                <TodoForm
                    formType={FormType.EDIT}
                    todo={todo}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />}

        </SafeAreaView>)
}

export default TodoEditScreen
