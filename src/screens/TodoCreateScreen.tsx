import {View} from "react-native";
import {StackScreenProps} from "../navigation/navigation.tsx";
import {Screens} from "../navigation/Screens.ts";
import TodoForm from "../components/TodoForm.tsx";
import {FormType} from "../enums/enums.ts";
import {Todo} from "../model/Todo.ts";
import {useRealm} from "@realm/react";
import {BSON} from "realm";
import ObjectId = BSON.ObjectId;
import useTodoDatabase from "../hooks/useTodoDatabase.ts";

const TodoCreateScreen = (props: StackScreenProps<Screens.TODO_CREATE>) => {
    const {navigation} = props
    const realm = useRealm()
    const {createTodo, pending} = useTodoDatabase()

    const onSubmit = (title: string, detail: string) => {
        createTodo(title, detail)
        navigation.pop()
    }

    const onCancel = () => {
        navigation.pop()
    }

    return(
        <View>
            <TodoForm
                formType={FormType.CREATE}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </View>
    )
}

export default TodoCreateScreen
