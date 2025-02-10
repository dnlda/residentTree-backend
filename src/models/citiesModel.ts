import mongoose, {Schema, Document} from "mongoose";

export interface ICities extends Document {
    id: number;
    name: string;
    data: string;
}

const CitiesSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    data: {type: String, required: true},
})

const Cities = mongoose.model<ICities>("City", CitiesSchema, "cities");
export default Cities;