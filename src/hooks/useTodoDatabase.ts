import useDatabase from "./useDatabase.ts";
import {Todo} from "../model/Todo.ts";
import {BSON} from "realm";
import ObjectId = BSON.ObjectId;

const useTodoDatabase = () => {
    const {create, update, remove, pending} = useDatabase()

    const createTodo = (title: string, detail: string) => {
        create(Todo, {
            _id: new ObjectId(),
            title: title,
            detail: detail
        })
    }

    const updateTodo = (todo: Todo, title: string, detail: string) => {
        update(() => {
            todo.title = title
            todo.detail = detail
        })
    }

    const removeTodo = (todo: Todo) => {
        remove(todo)
    }

    return {createTodo, updateTodo, removeTodo, pending}
}
export default useTodoDatabase
