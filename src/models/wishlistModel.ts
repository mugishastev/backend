import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const WishlistSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // each user has only one wishlist
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

// ✅ Correct way
const Wishlist = model('Wishlist', WishlistSchema);
export default Wishlist;
