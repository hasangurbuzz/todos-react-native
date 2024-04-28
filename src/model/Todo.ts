import Realm, {ObjectSchema} from "realm";
import BSON = Realm.BSON;
import ObjectId = BSON.ObjectId;

export class Todo extends Realm.Object<Todo> {
    _id!: ObjectId;
    title!: string;
    detail!: string;

    static schema: ObjectSchema = {
        name: "Todo",
        properties: {
            _id: {type: "objectId"},
            title: {type: "string"},
            detail: {type: "string"}
        },
        primaryKey: "_id"
    }

}
