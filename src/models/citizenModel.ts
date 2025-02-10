import mongoose, {Schema, Document} from "mongoose";

export interface ICitizen extends Document {
    id: number;
    name: string;
    city_id: mongoose.Schema.Types.ObjectId;
    groups: Array<{type: string; name: string}>;
}

const CitizenSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    city_id: {type: mongoose.Schema.Types.ObjectId, ref: "City", required: true},
    groups: [
        {
            type: {type: String, required: true},
            name: {type: String, required: true},
        }
    ]
})

const Citizen = mongoose.model<ICitizen>("Citizen", CitizenSchema, "citizen");
export default Citizen;