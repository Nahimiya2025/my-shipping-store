export const products = [
  {
    id: "sony-headphones",
    name: "Sony WH-1000XM5",
    price: 348.00,
    category: "Electronics",
    image: "/headphones.jpg", // Make sure this matches your file name in public/
    tag: "New Arrival",
    origin: "Japan",
    description: "Industry-leading noise cancellation with 30-hour battery life."
  },
  {
    id: "nike-air-max",
    name: "Nike Air Max 90",
    price: 120.00,
    category: "Fashion",
    image: "/shoe.jpg",
    tag: "Trending",
    origin: "USA",
    description: "Classic design with modern comfort. Direct from Nike US."
  },
  {
    id: "seiko-watch",
    name: "Seiko Prospex",
    price: 450.00,
    originalPrice: 550.00, // Added this to show the discount logic
    category: "Accessories",
    image: "/watch.jpg",
    tag: "-20% OFF",
    origin: "Japan",
    description: "Professional diver's watch. Automatic movement."
  },
  {
    id: "leather-bag",
    name: "Italian Leather Bag",
    price: 299.00,
    category: "Luxury",
    image: "/bag.jpg",
    tag: "Premium",
    origin: "Italy",
    description: "Hand-stitched genuine leather weekender bag."
  }
];