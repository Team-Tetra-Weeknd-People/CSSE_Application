import mongoose from "mongoose";

const DeliveryNoteSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    supplierId: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    deliveryNote: {
      type: String,
      required: true,
    },
    deliveryDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const DeliveryNote = mongoose.model("DeliveryNote", DeliveryNoteSchema);
export default DeliveryNote;
