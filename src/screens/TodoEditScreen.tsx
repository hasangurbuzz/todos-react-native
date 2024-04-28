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

export interface TodoEditParams {
    id: ObjectId
}

const TodoEditScreen = (props: StackScreenProps<Screens.TODO_EDIT>) => {
    const {route, navigation} = props
    const realm = useRealm();
    const id = route.params.id
    const [todo, setTodo] = useState<Todo | null>(null)

    useEffect(() => {
        const foundTodo = realm.objectForPrimaryKey(Todo, id)
        setTodo(foundTodo)
    }, []);

    const handleSubmit = (title: string) => {
        realm.write(() => {
            todo!.title = title
        })
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
