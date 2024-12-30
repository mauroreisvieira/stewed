export const REVIEWS = [
  {
    name: "Alice Johnson",
    reviewRate: 5,
    review:
      "Absolutely loved the product! The craftsmanship is outstanding, and it arrived well-packaged. Highly recommend it to anyone looking for quality and reliability."
  },
  {
    name: "Michael Smith",
    reviewRate: 4,
    review:
      "Very good overall. The product met my expectations, but shipping took a bit longer than expected. Customer service was helpful in tracking my order, which made the delay more bearable."
  },
  {
    name: "Samantha Brown",
    reviewRate: 3,
    review:
      "The product is decent but not exactly as described. Some features were missing, but it still works fine for basic needs. For the price, I expected a little more attention to detail."
  },
  {
    name: "David Wilson",
    reviewRate: 2,
    review:
      "Not very satisfied. The item arrived damaged, and while the company did offer a replacement, the process was slow and frustrating. I expected better quality control."
  },
  {
    name: "Jessica Lee",
    reviewRate: 1,
    review:
      "Terrible experience. The product broke within days of using it, and customer service was unhelpful. I wouldn't recommend this to anyone."
  },
  {
    name: "Olivia Martinez",
    reviewRate: 5,
    review:
      "This product exceeded my expectations! The design is sleek, and it works perfectly. I've already recommended it to my friends and family. Great job!"
  },
  {
    name: "John Evans",
    reviewRate: 4,
    review:
      "Good value for the money. The product does what it says, but the instructions were a bit unclear. Once I figured it out, everything worked as advertised."
  },
  {
    name: "Emily Clark",
    reviewRate: 3,
    review:
      "Average experience. While the product works, it's not as user-friendly as I hoped. I had to contact support multiple times to understand how to use it effectively."
  },
  {
    name: "Daniel Turner",
    reviewRate: 5,
    review:
      "Fantastic product! I've been using it for weeks now, and it still performs like it's brand new. The attention to detail and durability is impressive."
  },
  {
    name: "Sophia Harris",
    reviewRate: 2,
    review:
      "Disappointed with this purchase. The product feels cheap and doesn't perform as advertised. I might try another brand next time."
  },
  {
    name: "Liam Baker",
    reviewRate: 4,
    review:
      "Happy with the purchase overall. The product is well-built and functional, but it could use a few improvements in terms of design and usability."
  },
  {
    name: "Isabella Wright",
    reviewRate: 1,
    review:
      "Worst purchase I've ever made. The product stopped working within a week, and I couldn't get a refund. Save your money and buy something else."
  },
  {
    name: "Matthew Green",
    reviewRate: 5,
    review:
      "I’m so impressed with this product! It’s exactly what I needed, and the performance is top-notch. I couldn’t be happier with my purchase. Definitely worth the investment!"
  },
  {
    name: "Charlotte King",
    reviewRate: 5,
    review:
      "This product has completely transformed the way I do things! It’s easy to use, reliable, and works exactly as described. I highly recommend it to anyone looking for a high-quality product."
  },
  {
    name: "Ethan Taylor",
    reviewRate: 5,
    review:
      "Incredible! The product exceeded my expectations in every way. It’s built to last, and the functionality is unmatched. Definitely a 5-star product. I’m recommending it to everyone I know."
  },
  {
    name: "Ava Morgan",
    reviewRate: 5,
    review:
      "I’ve been using this for a few weeks now, and it’s still performing perfectly. The attention to detail is remarkable, and the design is modern and sleek. I would buy it again in a heartbeat!"
  },
  {
    name: "Lucas Scott",
    reviewRate: 5,
    review:
      "I’m honestly amazed by this product! It’s worth every penny and more. The quality is exceptional, and it has made my life so much easier. If you're considering buying it, don't hesitate!"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Chic Midi Dress",
    category: "Dresses",
    rate: REVIEWS.reduce((total, review) => total + review.reviewRate, 0) / REVIEWS.length,
    color: ["Black", "Red"],
    description:
      "A timeless midi dress with a flattering silhouette, perfect for any occasion, from casual outings to evening events. The soft fabric feels luxurious and drapes beautifully, making it a versatile wardrobe staple.\n\nThe dress can be dressed up or down depending on the occasion, providing an effortless yet elegant look. Ideal for cocktail parties, dinners, or a day out with friends.\n\nIts versatility and comfort make it a must-have piece for your wardrobe.",
    tag: "Evening Wear",
    price: {
      value: 325.0,
      currency: "€"
    },
    sales: 500,
    stock: 120,
    sizes: ["S", "M", "L"],
    discount: 15,
    reviews: REVIEWS.length
  },
  {
    id: 2,
    name: "Casual Maxi Skirt",
    category: "Bottoms",
    rate: 3.9,
    color: ["Blue", "White"],
    description:
      "Comfortable and breezy, this maxi skirt is perfect for a casual day out or a beach vacation. Its lightweight fabric and relaxed fit make it ideal for sunny days, while the high-waisted design adds a touch of elegance.\n\nThe skirt’s flowing fabric moves beautifully with every step, and the elastic waistband ensures a comfortable fit. Whether you're going for a relaxed daytime look or something more polished for evening outings, this skirt will serve you well.\n\nPair it with a fitted top or even a tucked-in blouse for an effortlessly chic look.",
    tag: "Casual",
    price: {
      value: 120.0,
      currency: "€"
    },
    sales: 300,
    stock: 80,
    sizes: ["M", "L", "XL"],
    reviews: 19
  },
  {
    id: 3,
    name: "Tailored Blazer",
    category: "Outerwear",
    rate: 4.8,
    color: ["Gray", "Black"],
    description:
      "A sharp, tailored blazer that gives a sophisticated touch to both professional and casual looks. Crafted from high-quality fabric, it features a sleek, structured fit and can be paired with jeans or dress pants for versatility.\n\nThis blazer is ideal for business meetings, dinners, and any formal gathering where you want to look sharp. The structured design enhances the silhouette, and the choice of neutral colors makes it easy to match with various outfits.\n\nIt’s a wardrobe staple that can elevate your outfit from average to standout in no time.",
    tag: "Workwear",
    price: {
      value: 250.0,
      currency: "€"
    },
    sales: 450,
    stock: 100,
    sizes: ["S", "M", "L"],
    discount: 10, // 10% off
    reviews: 47
  },
  {
    id: 4,
    name: "Silk Wrap Dress",
    category: "Dresses",
    rate: 4.5,
    color: ["Pink", "Navy"],
    description:
      "A luxurious silk wrap dress with an elegant neckline and a flowy skirt. Ideal for an evening out or formal events, the dress hugs your body in all the right places and flows effortlessly with your movements.\n\nMade from premium silk, the fabric feels ultra-soft against the skin and adds a level of sophistication to any look. The wrap design cinches the waist to give you a flattering silhouette, while the soft skirt adds movement and grace.\n\nPerfect for formal events, cocktail parties, or a romantic dinner date, this dress is a timeless addition to any wardrobe.",
    tag: "Formal Wear",
    price: {
      value: 300.0,
      currency: "€"
    },
    sales: 600,
    stock: 75,
    sizes: ["S", "M", "L"],
    reviews: 111
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    rate: 4.1,
    color: ["Brown", "Beige"],
    description:
      "A sleek leather crossbody bag that adds a touch of sophistication to any outfit, perfect for day-to-night wear. The adjustable strap ensures comfort, while the spacious interior keeps your essentials organized.\n\nThis bag is stylish yet functional, with enough room to carry your phone, wallet, and makeup essentials. The rich leather finish adds a luxe touch, and the neutral colors ensure it pairs well with most outfits.\n\nWhether you’re running errands or attending a dinner party, this bag will complement your look effortlessly.",
    tag: "Accessories",
    price: {
      value: 75.0,
      currency: "€"
    },
    sales: 150,
    stock: 200,
    sizes: ["XS", "S"],
    discount: 5, // 5% off
    reviews: 70
  },
  {
    id: 6,
    name: "Boho Chic Fringe Vest",
    category: "Outerwear",
    rate: 4.7,
    color: ["Brown", "Beige"],
    description:
      "This boho-inspired fringe vest is the perfect layering piece for a laid-back yet stylish look. With its relaxed fit and unique fringed edges, this vest can be paired with anything from a simple top to a flowing dress.\n\nThe fringes add a playful and whimsical touch, and the soft fabric ensures comfort. It’s the perfect piece to transition from season to season, adding style without overwhelming the rest of your outfit.\n\nWhether you’re at a music festival or a casual day out, this vest adds a carefree vibe to your wardrobe.",
    tag: "Casual",
    price: {
      value: 210.0,
      currency: "€"
    },
    sales: 200,
    stock: 90,
    sizes: ["S", "M", "L"],
    reviews: 880
  },
  {
    id: 7,
    name: "Soft Wool Cardigan",
    category: "Outerwear",
    rate: 4.4,
    color: ["Light Gray", "Navy"],
    description:
      "Stay warm and stylish with this cozy wool cardigan. Perfect for layering over your favorite tops or dresses, it offers both comfort and style.\n\nMade from soft wool, this cardigan provides warmth while remaining breathable. Its button-down design and ribbed cuffs add a touch of classic sophistication, while the relaxed fit makes it ideal for all-day wear.\n\nWhether you're lounging at home or out running errands, this cardigan is your perfect companion.",
    tag: "Casual",
    price: {
      value: 150.0,
      currency: "€"
    },
    sales: 350,
    stock: 110,
    sizes: ["M", "L", "XL"],
    reviews: 320
  },
  {
    id: 8,
    name: "Chunky Knit Sweater",
    category: "Outerwear",
    rate: 4.6,
    color: ["Beige", "Pink"],
    description:
      "A warm and stylish chunky knit sweater designed to keep you cozy throughout the colder months. Its relaxed fit and thick knit pattern make it both comfortable and fashionable.\n\nPair it with jeans or a skirt for a relaxed yet stylish look. The oversized design ensures a comfortable fit, while the high neckline keeps you warm on chilly days.\n\nPerfect for fall and winter, this sweater will keep you cozy and stylish all season long.",
    tag: "Casual",
    price: {
      value: 180.0,
      currency: "€"
    },
    sales: 250,
    stock: 120,
    sizes: ["S", "M", "L"],
    reviews: 51
  },
  {
    id: 9,
    name: "Floral Midi Skirt",
    category: "Bottoms",
    rate: 4.2,
    color: ["Red", "Yellow"],
    description:
      "Add a touch of femininity to your wardrobe with this elegant floral midi skirt. The flattering A-line silhouette and vibrant floral pattern create a chic and timeless look.\n\nThe lightweight fabric drapes beautifully, and the elastic waistband ensures a comfortable fit. Perfect for both casual and semi-formal occasions, this skirt pairs well with a variety of tops and shoes.\n\nWhether you're heading to a brunch or a day at the office, this skirt will keep you looking stylish and fresh.",
    tag: "Casual",
    price: {
      value: 110.0,
      currency: "€"
    },
    sales: 400,
    stock: 150,
    sizes: ["S", "M", "L"],
    reviews: 12
  },
  {
    id: 10,
    name: "Puff Sleeve Top",
    category: "Tops",
    rate: 4.3,
    color: ["White", "Black"],
    description:
      "A cute and feminine puff sleeve top, designed to add a touch of elegance to your casual outfits. The voluminous sleeves give the top a playful yet sophisticated look.\n\nMade from a soft cotton blend, it offers both comfort and style. The fitted waistline accentuates your figure while the puff sleeves add a statement-making touch.\n\nThis top can be paired with skirts, jeans, or trousers for a chic, casual style.",
    tag: "Casual",
    price: {
      value: 80.0,
      currency: "€"
    },
    sales: 220,
    stock: 200,
    sizes: ["S", "M", "L"],
    reviews: 921
  },
  {
    id: 11,
    name: "High-Waisted Shorts",
    category: "Bottoms",
    rate: 4.0,
    color: ["Black", "White"],
    description:
      "These high-waisted shorts are a summer essential, perfect for pairing with tank tops or blouses. The flattering cut elongates the legs, while the soft fabric ensures comfort all day long.\n\nThe elastic waistband offers a comfortable fit, and the minimalistic design makes these shorts easy to pair with any top. Ideal for casual outings, picnics, or beach days, these shorts are both stylish and practical.\n\nAvailable in a range of sizes, these shorts will be your go-to for a chic, laid-back summer look.",
    tag: "Casual",
    price: {
      value: 70.0,
      currency: "€"
    },
    sales: 300,
    stock: 180,
    sizes: ["S", "M", "L"],
    reviews: 1200
  },
  {
    id: 12,
    name: "Satin Cami Dress",
    category: "Dresses",
    rate: 4.6,
    color: ["Black", "Red"],
    description:
      "This satin cami dress is the epitome of elegance. Its soft satin fabric and delicate spaghetti straps make it perfect for evening events and formal gatherings.\n\nThe dress has a simple yet flattering silhouette that hugs your curves in all the right places. Its versatile design allows you to dress it up with heels for a night out or dress it down with sandals for a more casual look.\n\nIdeal for weddings, cocktail parties, or romantic dinners, this dress exudes sophistication.",
    tag: "Formal Wear",
    price: {
      value: 200.0,
      currency: "€"
    },
    sales: 250,
    stock: 100,
    sizes: ["S", "M", "L"],
    reviews: 540
  },
  {
    id: 13,
    name: "Suede Ankle Boots",
    category: "Footwear",
    rate: 4.4,
    color: ["Tan", "Black"],
    description:
      "These suede ankle boots are the perfect blend of style and comfort. With a classic design and block heel, these boots can be dressed up or down for various occasions.\n\nThe soft suede material ensures a comfortable fit, while the sturdy block heel provides support and stability. Whether you're wearing them with jeans, skirts, or dresses, these boots will elevate your look.",
    tag: "Footwear",
    price: {
      value: 140.0,
      currency: "€"
    },
    sales: 300,
    stock: 150,
    sizes: ["36", "37", "38", "39"],
    reviews: 69
  },
  {
    id: 14,
    name: "Oversized Denim Jacket",
    category: "Outerwear",
    rate: 4.3,
    color: ["Blue", "Black"],
    description:
      "This oversized denim jacket is a wardrobe essential for every season. Its relaxed fit and classic design make it a versatile piece that can be layered over just about anything.\n\nThe sturdy denim fabric provides warmth, while the oversized cut gives it a cool, casual vibe. Whether paired with dresses, skirts, or pants, this jacket is an easy way to add a touch of style to any outfit.",
    tag: "Casual",
    price: {
      value: 150.0,
      currency: "€"
    },
    sales: 500,
    stock: 200,
    sizes: ["S", "M", "L"],
    reviews: 25
  },
  {
    id: 15,
    name: "V-Neck T-Shirt",
    category: "Tops",
    rate: 4.5,
    color: ["White", "Black"],
    description:
      "A classic V-neck t-shirt made from soft cotton fabric. This simple yet stylish top is perfect for everyday wear and can be dressed up or down.\n\nIts breathable material and relaxed fit make it perfect for warm weather, while the V-neckline adds a touch of femininity to the design. Pair it with jeans, skirts, or shorts for an effortlessly chic look.",
    tag: "Casual",
    price: {
      value: 40.0,
      currency: "€"
    },
    sales: 400,
    stock: 250,
    sizes: ["S", "M", "L"],
    reviews: 160
  },
  {
    id: 16,
    name: "Luxury Cashmere Sweater",
    category: "Tops",
    rate: 4.8,
    color: ["Black", "Gray"],
    description:
      "Made from 100% cashmere, this sweater offers unparalleled softness and warmth, perfect for any sophisticated wardrobe. Its classic cut and luxurious feel make it ideal for both formal and casual settings.\nPair it with trousers or a skirt for a chic, timeless look.",
    tag: "Workwear",
    price: {
      value: 350.0,
      currency: "€"
    },
    sales: 120,
    stock: 50,
    sizes: ["S", "M", "L"],
    reviews: 360
  }
];

export const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"] as const;

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

export interface Product {
  id: number;
  name: string;
  category: string;
  tag: string;
  description: string;
  sales: number;
  color: string[];
  price: {
    value: number;
    currency: string;
  };
  sizes: string[];
  discount?: number;
  stock: number;
  rate: number;
  reviews: number;
}
