import {Button, Text, TextInput, View} from "react-native";
import {FormType} from "../enums/enums.ts";
import {Todo} from "../model/Todo.ts";
import {useEffect, useState} from "react";

interface TodoFormProps {
    formType: FormType;
    todo?: Todo;
    onSubmit: (title: string) => void;
    onCancel: () => void;
}

interface FormState {
    todoTitle?: string;
}

const TodoForm = (props: TodoFormProps) => {
    const {formType, todo, onCancel, onSubmit} = props
    const [formState, setFormState] = useState<FormState>({})

    useEffect(() => {
        if (formType === FormType.EDIT){
            setFormState(prev => ({
                ...prev,
                todoTitle: todo!.title
            }))
        }
    }, []);

    const handleInputChange = (text: string, name: string) => {
        setFormState(prev => ({
            ...prev,
            [name] : text
        }))
    }

    const handleSubmit = () => {
        onSubmit(formState.todoTitle!)
    }

    return(
        <View style={{display: 'flex', flexGrow:1, height: "100%"}}>
            <Text style={{fontSize: 16}}>Title</Text>
            <TextInput
                placeholder={"Enter title"}
                value={formState.todoTitle}
                onChangeText={(text) => handleInputChange(text, "todoTitle")}
                style={{fontSize: 19}}
            />
            <Button title={"Submit"} onPress={handleSubmit}/>

        </View>
    )
}

export default TodoForm
