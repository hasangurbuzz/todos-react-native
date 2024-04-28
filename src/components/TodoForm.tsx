import {Button, View} from "react-native";
import {FormType} from "../enums/enums.ts";
import {Todo} from "../model/Todo.ts";
import {useEffect, useState} from "react";
import Input from "./Input.tsx";
import Spacer from "./Spacer.tsx";

interface TodoFormProps {
    formType: FormType;
    todo?: Todo;
    onSubmit: (title: string, detail: string) => void;
    onCancel: () => void;
}

interface FormState {
    todoTitle?: string;
    todoDetail?: string;
}

const TodoForm = (props: TodoFormProps) => {
    const {formType, todo, onCancel, onSubmit} = props
    const [formState, setFormState] = useState<FormState>({})
    const [submitAvailable, setSubmitAvailable] = useState<boolean>(false)

    useEffect(() => {
        if (formType === FormType.EDIT) {
            setFormState(prev => ({
                ...prev,
                todoTitle: todo!.title,
                todoDetail: todo!.detail
            }))
        }
    }, []);

    useEffect(() => {
        const isValid = !!(formState.todoTitle && formState.todoDetail)
        setSubmitAvailable(isValid)

    }, [formState]);

    const handleInputChange = (text: string, name: string) => {
        setFormState(prev => ({
            ...prev,
            [name]: text
        }))
    }

    const handleSubmit = () => {
        onSubmit(formState.todoTitle!, formState.todoDetail!)
    }

    return (
        <View style={{display: 'flex', height: "100%", padding: 10}}>
            <View style={{flexGrow: 1}}>
                <Input
                    label={"Title"}
                    value={formState.todoTitle}
                    onChangeText={(text) => handleInputChange(text, "todoTitle")}
                />
                <Spacer size={15}/>
                <Input
                    label={"Detail"}
                    value={formState.todoDetail}
                    onChangeText={(text) => handleInputChange(text, "todoDetail")}
                />
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    title={"Cancel"}
                    onPress={onCancel}
                    color={"red"}
                />
                <Button
                    title={"Submit"}
                    onPress={handleSubmit}
                    disabled={!submitAvailable}
                />
            </View>

        </View>
    )
}

export default TodoForm
