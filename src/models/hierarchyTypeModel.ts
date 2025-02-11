import mongoose, {Schema, Document} from "mongoose";

export interface IHierarchy extends Document {
    order: number;
    type: string;
}

const HierarchySchema: Schema = new Schema({
    order: {type: Number, required: true},
    type: {type: String, required: true},
})

const Hierarchy = mongoose.model<IHierarchy>("Hierarchy", HierarchySchema, "hierarchy");
export default Hierarchy;