import {Todo} from "../model/Todo.ts";
import {Alert, Button, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useEffect} from "react";

interface TodoListItemProps {
    todo: Todo;
    onClick: (todo: Todo) => void;
    onDelete: (todo: Todo) => void;
}

const TodoListItem = (props: TodoListItemProps) => {
    const {todo, onClick, onDelete} = props

    const handleClick = () => {
        onClick(todo)
    }

    const handleDelete = () => {
        onDelete(todo)
    }

    return (
        <View style={{display: 'flex', flexDirection:'row', paddingLeft: 5,paddingRight: 5, padding: 10}}>
            <TouchableOpacity
                style={{display: "flex", flexGrow: 1, justifyContent: "center"}}
                onPress={handleClick}
            >
                <Text style={{fontSize: 19}}>{todo.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
                <Icon color={"red"} name={"delete"} size={30}/>
            </TouchableOpacity>
        </View>
    )
}

export default TodoListItem
