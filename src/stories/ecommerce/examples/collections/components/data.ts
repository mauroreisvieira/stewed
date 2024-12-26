export const PRODUCTS = [
  {
    id: 1,
    name: "Prospect Briefcase",
    category: "Bag",
    rate: 4.3,
    color: ["Orange", "Brown"],
    tag: "Briefcase",
    price: "325.00€",
    sales: 500 // Number of sales
  },
  {
    id: 2,
    name: "Bonnie Belt Bag",
    category: "Accessories",
    rate: 3.9,
    color: ["Red", "Black"],
    tag: "Backpack",
    price: "120.00€",
    sales: 300
  },
  {
    id: 3,
    name: "Traveler's Backpack",
    category: "Bag",
    rate: 4.8,
    color: ["Blue", "Gray"],
    tag: "Travel",
    price: "250.00€",
    sales: 450
  },
  {
    id: 4,
    name: "Executive Laptop Case",
    category: "Bag",
    rate: 4.5,
    color: ["Black", "Gray"],
    tag: "Laptop Case",
    price: "300.00€",
    sales: 600
  },
  {
    id: 5,
    name: "Compact Wallet",
    category: "Wallets",
    rate: 4.1,
    color: ["Brown", "Beige"],
    tag: "Accessories",
    price: "75.00€",
    sales: 150
  },
  {
    id: 6,
    name: "Voyager Duffel Bag",
    category: "Luggage",
    rate: 4.7,
    color: ["Green", "Black"],
    tag: "Travel",
    price: "210.00€",
    sales: 200
  },
  {
    id: 7,
    name: "Classic Tote Bag",
    category: "Bag",
    rate: 4.2,
    color: ["Pink", "Gray"],
    tag: "Accessories",
    price: "180.00€",
    sales: 350
  },
  {
    id: 8,
    name: "Luxury Clutch",
    category: "Clutches",
    rate: 4.6,
    color: ["Gold", "Silver"],
    tag: "Evening",
    price: "350.00€",
    sales: 250
  },
  {
    id: 9,
    name: "Heritage Messenger Bag",
    category: "Bag",
    rate: 4.4,
    color: ["Brown", "Beige"],
    tag: "Work",
    price: "275.00€",
    sales: 500
  },
  {
    id: 10,
    name: "Outdoor Utility Pack",
    category: "Bag",
    rate: 4.9,
    color: ["Yellow", "Gray"],
    tag: "Outdoor",
    price: "190.00€",
    sales: 700
  },
  {
    id: 11,
    name: "Urban Sling Bag",
    category: "Bag",
    rate: 4.0,
    color: ["Black", "Red"],
    tag: "Casual",
    price: "110.00€",
    sales: 180
  },
  {
    id: 12,
    name: "Elegant Shoulder Bag",
    category: "Clutches",
    rate: 4.5,
    color: ["Black", "Gold"],
    tag: "Evening",
    price: "220.00€",
    sales: 400
  },
  {
    id: 13,
    name: "Smart Crossbody Bag",
    category: "Bag",
    rate: 4.3,
    color: ["Blue", "Gray"],
    tag: "Casual",
    price: "130.00€",
    sales: 300
  },
  {
    id: 14,
    name: "Vintage Satchel",
    category: "Bag",
    rate: 4.2,
    color: ["Brown", "Black"],
    tag: "Work",
    price: "180.00€",
    sales: 220
  },
  {
    id: 15,
    name: "City Backpack",
    category: "Bag",
    rate: 4.7,
    color: ["Gray", "Pink"],
    tag: "Casual",
    price: "210.00€",
    sales: 650
  },
  {
    id: 16,
    name: "Luxe Weekend Bag",
    category: "Luggage",
    rate: 4.8,
    color: ["Black", "Silver"],
    tag: "Travel",
    price: "330.00€",
    sales: 350
  }
];

export const CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))];
export const TAGS = [...new Set(PRODUCTS.map((product) => product.tag))];
export const COLORS = [...new Set(PRODUCTS.flatMap((product) => product.color))];

export const FILTERS = [
  {
    name: "Tag",
    key: "tag",
    values: TAGS
  },
  {
    name: "Category",
    key: "category",
    values: CATEGORIES
  },
  {
    name: "Color",
    key: "color",
    values: COLORS
  }
];

export const PRICE = [
  {
    name: "Low to high",
    key: "low"
  },
  {
    name: "High to low",
    key: "high"
  }
];

export const SORT = [
  {
    name: "Most popular",
    key: "most"
  },
  {
    name: "Best rating",
    key: "best"
  },
  {
    name: "Newest",
    key: "newest"
  }
];
