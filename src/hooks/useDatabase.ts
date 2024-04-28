import {useRealm} from "@realm/react";
import {Constructor} from "react-native";
import {useState} from "react";

const useDatabase = () => {
    const realm = useRealm()
    const [pending, setPending] = useState<boolean>(false)

    const create = <T>(type: Constructor<T>, values: Partial<T>) => {
        setPending(true)
        realm.write(() => {
            realm.create(type, values)
        })
        setPending(false)
    }

    const update = (callback: () => void) => {
        setPending(true)
        realm.write(callback)
        setPending(false)
    }

    const remove = <T>(value: T) => {
        setPending(true)
        realm.write(() => {
            realm.delete(value)
        })
        setPending(false)
    }

    return {create, update, remove, pending}
}

export default useDatabase
