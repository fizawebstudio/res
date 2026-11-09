import { IMG } from '@/data/images';

export const BRAND = {
  name: 'FLAME & FORK',
  shortName: 'F&F',
  tagline: 'Good Food. Great Mood.',
  kicker: 'American Kitchen',
  description:
    'A modern American kitchen built around live fire — smash burgers pressed to order, stone-baked pizza, properly crispy chicken and grilled plates, made fresh every service.',
  phone: '+1 (310) 555-0128',
  phoneHref: 'tel:+13105550128',
  whatsapp: '13105550128',
  email: 'hello@flamefork.example',
  address: '1200 Harbor View Avenue, Santa Monica, CA 90401',
  addressShort: 'Santa Monica, CA',
  mapQuery: '1200 Harbor View Avenue, Santa Monica, CA 90401',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=1200+Harbor+View+Avenue+Santa+Monica+CA+90401',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    x: 'https://x.com',
  },
  hours: [
    { day: 'Monday – Thursday', time: '11:30 AM – 10:00 PM' },
    { day: 'Friday – Saturday', time: '11:30 AM – 11:30 PM' },
    { day: 'Sunday', time: '12:00 PM – 9:30 PM' },
  ],
  deliveryNote: 'Delivery in 30–40 minutes · Free over Rs. 2,500',
  demoNote: 'Demonstration address and contact details for this sample website.',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Special Offers', to: '/offers' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
];

export const CATEGORIES = [
  { id: 'burgers', label: 'Burgers', blurb: 'Smashed to order', image: IMG.doubleCheese, count: 5 },
  { id: 'pizza', label: 'Pizza', blurb: '72-hour dough', image: IMG.pepperoni, count: 5 },
  { id: 'chicken', label: 'Fried Chicken', blurb: 'Double-dredged', image: IMG.chickenBucket, count: 5 },
  { id: 'grilled', label: 'Grilled Food', blurb: 'Over live fire', image: IMG.chickenSteak, count: 5 },
  { id: 'sandwiches', label: 'Sandwiches', blurb: 'Stacked high', image: IMG.clubSandwich, count: 5 },
  { id: 'sides', label: 'Sides & Fries', blurb: 'Hand-cut daily', image: IMG.loadedFries, count: 5 },
  { id: 'desserts', label: 'Desserts', blurb: 'Made in-house', image: IMG.lavaCake, count: 5 },
  { id: 'drinks', label: 'Beverages', blurb: 'Shaken & iced', image: IMG.lemonade, count: 5 },
];

export const MENU_FILTERS = [
  { id: 'all', label: 'All Items' },
  ...CATEGORIES.map(({ id, label }) => ({ id, label })),
];

const item = (id, name, description, price, category, image, badge) => ({
  id,
  name,
  description,
  price,
  category,
  image,
  ...(badge ? { badge } : {}),
});

export const MENU_ITEMS = [
  // Burgers
  item('classic-smash-burger', 'Classic Smash Burger', 'Two thin smashed beef patties, aged cheddar, pickles, onion and fork sauce.', 850, 'burgers', IMG.smashBurger, 'bestseller'),
  item('double-cheese-burger', 'Double Cheese Burger', 'Double beef, double cheddar, caramelised onion and burger sauce in a toasted bun.', 1150, 'burgers', IMG.doubleCheese, 'bestseller'),
  item('crispy-chicken-burger', 'Crispy Chicken Burger', 'Buttermilk chicken fillet, crunchy slaw and chilli mayo in a soft sesame bun.', 950, 'burgers', IMG.crispyChickenBurger, 'new'),
  item('bbq-bacon-burger', 'BBQ Bacon-Style Burger', 'Smoky barbecue glaze, crisp turkey bacon, melted cheddar and onion rings.', 1250, 'burgers', IMG.bbqBacon),
  item('spicy-jalapeno-burger', 'Spicy Jalapeño Burger', 'Pepper jack, fresh jalapeños and chipotle mayo with a slow, warm heat.', 1050, 'burgers', IMG.spicyJalapeno, 'new'),

  // Pizza
  item('classic-pepperoni-pizza', 'Classic Pepperoni Pizza', '72-hour cold-fermented dough, tomato base, mozzarella and curled pepperoni.', 1650, 'pizza', IMG.pepperoni, 'bestseller'),
  item('bbq-chicken-pizza', 'BBQ Chicken Pizza', 'Grilled chicken, smoky barbecue sauce, red onion and fresh coriander.', 1750, 'pizza', IMG.bbqChickenPizza),
  item('margherita-pizza', 'Margherita Pizza', 'San Marzano tomato, fresh mozzarella, torn basil and olive oil.', 1350, 'pizza', IMG.margherita),
  item('four-cheese-pizza', 'Four Cheese Pizza', 'Mozzarella, fontina, gorgonzola and parmesan with a honey finish.', 1850, 'pizza', IMG.fourCheese, 'new'),
  item('supreme-loaded-pizza', 'Supreme Loaded Pizza', 'Chicken, peppers, olives, mushroom and extra mozzarella on a thick crust.', 1950, 'pizza', IMG.supremePizza),

  // Fried chicken
  item('original-crispy-chicken', 'Original Crispy Chicken', 'Two pieces, double-dredged and fried to a deep golden crunch.', 450, 'chicken', IMG.crispyChicken, 'bestseller'),
  item('spicy-chicken-strips', 'Spicy Chicken Strips', 'Five strips in a chilli-spiced crust with a cooling house dip.', 650, 'chicken', IMG.chickenStrips),
  item('crispy-chicken-wings', 'Crispy Chicken Wings', 'Eight wings tossed in a sticky house glaze with chopped chives.', 750, 'chicken', IMG.chickenWings, 'bestseller'),
  item('chicken-tenders', 'Chicken Tenders', 'Four hand-breaded tenders with garlic mayo and tomato ketchup.', 700, 'chicken', IMG.chickenTenders),
  item('hot-crispy-bucket', 'Hot & Crispy Chicken Bucket', 'Eight pieces of hot, crunchy chicken, boxed for sharing.', 1450, 'chicken', IMG.chickenBucket, 'new'),

  // Grilled
  item('grilled-chicken-steak', 'Grilled Chicken Steak', 'Charcoal-grilled breast, herb butter, charred lemon and roasted vegetables.', 1450, 'grilled', IMG.chickenSteak, 'bestseller'),
  item('bbq-chicken-platter', 'BBQ Chicken Platter', 'Glazed grilled chicken with corn, slaw and a smoky dipping sauce.', 1350, 'grilled', IMG.bbqChickenPlatter),
  item('grilled-beef-steak', 'Grilled Beef Steak', 'Sirloin grilled medium, rested and finished with herb butter.', 1850, 'grilled', IMG.beefSteak),
  item('peri-peri-chicken', 'Peri Peri Chicken', 'Flame-grilled chicken in a fiery peri peri glaze with lemon.', 1250, 'grilled', IMG.periPeri),
  item('grilled-chicken-rice-bowl', 'Grilled Chicken Rice Bowl', 'Grilled chicken over basmati with peppers, herbs and yoghurt drizzle.', 950, 'grilled', IMG.riceBowl),

  // Sandwiches
  item('classic-club-sandwich', 'Classic Club Sandwich', 'Triple-stacked toast with chicken, bacon, tomato and garlic mayo.', 750, 'sandwiches', IMG.clubSandwich, 'bestseller'),
  item('grilled-chicken-sandwich', 'Grilled Chicken Sandwich', 'Grilled chicken, melted cheese and rocket on toasted sourdough.', 900, 'sandwiches', IMG.grilledChickenSandwich),
  item('philly-cheesesteak', 'Philly Cheesesteak Sandwich', 'Shaved beef, melted provolone, onions and peppers in a soft roll.', 1150, 'sandwiches', IMG.phillyCheesesteak),
  item('crispy-chicken-sub', 'Crispy Chicken Sub', 'Crunchy chicken strips, shredded lettuce and creamy sauce in a footlong.', 850, 'sandwiches', IMG.chickenSub),
  item('bbq-beef-sandwich', 'BBQ Beef Sandwich', 'Slow-cooked shredded beef in smoky sauce with slaw and pickles.', 1050, 'sandwiches', IMG.bbqBeefSandwich),

  // Sides
  item('classic-french-fries', 'Classic French Fries', 'Hand-cut, twice-fried and finished with flaked sea salt.', 350, 'sides', IMG.frenchFries, 'bestseller'),
  item('loaded-cheese-fries', 'Loaded Cheese Fries', 'Fries under molten cheese sauce, crispy bacon and jalapeño.', 550, 'sides', IMG.loadedFries, 'bestseller'),
  item('onion-rings', 'Onion Rings', 'Golden battered rings with a smoky dipping sauce.', 450, 'sides', IMG.onionRings),
  item('mozzarella-sticks', 'Mozzarella Sticks', 'Six breaded sticks with a proper cheese pull and marinara.', 650, 'sides', IMG.mozzarellaSticks),
  item('garlic-bread', 'Garlic Bread', 'Toasted baguette with garlic butter, parsley and parmesan.', 400, 'sides', IMG.garlicBread),

  // Desserts
  item('chocolate-fudge-brownie', 'Chocolate Fudge Brownie', 'Warm fudgy brownie with a scoop of vanilla bean ice cream.', 450, 'desserts', IMG.brownie, 'bestseller'),
  item('classic-cheesecake', 'Classic Cheesecake', 'Baked vanilla cheesecake with a berry compote and biscuit base.', 650, 'desserts', IMG.cheesecake),
  item('chocolate-lava-cake', 'Chocolate Lava Cake', 'Molten-centre chocolate cake with a scoop of vanilla ice cream.', 550, 'desserts', IMG.lavaCake),
  item('vanilla-sundae', 'Vanilla Ice Cream Sundae', 'Vanilla ice cream, chocolate sauce, whipped cream and a wafer.', 400, 'desserts', IMG.sundae),
  item('strawberry-shake-dessert', 'Strawberry Milkshake Dessert', 'Thick strawberry shake topped with cream and a slice of cake.', 500, 'desserts', IMG.berryShake),

  // Beverages
  item('fresh-lemonade', 'Fresh Lemonade', 'Hand-pressed lemons, mint and cane sugar over crushed ice.', 300, 'drinks', IMG.lemonade),
  item('chocolate-milkshake', 'Classic Chocolate Milkshake', 'Thick chocolate shake with whipped cream and chocolate shavings.', 450, 'drinks', IMG.chocShake),
  item('strawberry-milkshake', 'Strawberry Milkshake', 'Fresh strawberries blended thick and served ice cold.', 450, 'drinks', IMG.strawberryShake, 'new'),
  item('iced-coffee', 'Iced Coffee', 'Slow-steeped coffee poured over ice with a swirl of cream.', 400, 'drinks', IMG.icedCoffee),
  item('soft-drinks', 'Soft Drinks', 'Chilled cola, lemon-lime or orange, served over ice.', 200, 'drinks', IMG.softDrinks),
];

export const OFFERS = [
  {
    id: 'family-feast',
    title: 'The Family Feast',
    kicker: 'Feeds 4 – 5',
    price: 4999,
    compareAt: 6100,
    tag: 'Save 18%',
    includes: [
      '2 signature smash burgers',
      '1 large stone-baked pizza',
      '8 pieces crispy fried chicken',
      '2 baskets of loaded fries',
      '4 fresh lemonades',
    ],
    image: IMG.comboFeast,
  },
  {
    id: 'duo-date',
    title: 'The Duo Date',
    kicker: 'Feeds 2',
    price: 2250,
    compareAt: 2600,
    tag: 'Most loved',
    includes: ['2 burgers of your choice', '1 shared loaded fries', '2 fresh lemonades'],
    image: IMG.comboDuo,
  },
  {
    id: 'late-night-box',
    title: 'Late Night Box',
    kicker: 'After 9 PM only',
    price: 1350,
    compareAt: 1600,
    tag: 'Late night',
    includes: ['1 crispy chicken burger', '1 regular fries', '1 soft drink'],
    image: IMG.comboLate,
  },
];

export const STORY_POINTS = [
  'Quality ingredients sourced fresh every morning',
  'Everything prepared to order, never held under a lamp',
  'A kitchen team trained on live fire and flat tops',
  'A dining room built for long tables and second helpings',
];

export const STATS = [
  { value: '12', label: 'Years of service' },
  { value: '40', label: 'Dishes on the menu' },
  { value: '4.9', label: 'Average rating' },
  { value: '30', label: 'Minute delivery' },
];

export const WHY_US = [
  {
    title: 'Fresh Ingredients',
    text: 'Produce delivered each morning, dough fermented for 72 hours and beef ground in-house daily.',
    icon: 'leaf',
  },
  {
    title: 'Expert Chefs',
    text: 'A kitchen led by chefs who have spent a decade working live fire, charcoal and flat tops.',
    icon: 'chef',
  },
  {
    title: 'Quality & Hygiene',
    text: 'Separate raw and ready-to-eat stations, temperature checks every service, an open kitchen you can watch.',
    icon: 'shield',
  },
  {
    title: 'Fast Delivery',
    text: 'Insulated packaging and our own riders keep the food hot across a 30-minute radius.',
    icon: 'bike',
  },
  {
    title: 'Great Taste',
    text: 'Sauces built in-house, seasoned in layers and tasted by the team before every service.',
    icon: 'flame',
  },
  {
    title: 'Friendly Service',
    text: 'A team that remembers your table, your order and exactly how you like your burger cooked.',
    icon: 'heart',
  },
];

export const GALLERY = [
  { src: IMG.smashBurger, alt: 'A smash burger with melted cheese on a light plate', className: 'md:col-span-2 md:row-span-2' },
  { src: IMG.margherita, alt: 'A margherita pizza fresh from the oven', className: '' },
  { src: IMG.chickenWings, alt: 'Glazed crispy chicken wings in a ceramic bowl', className: '' },
  { src: IMG.interior, alt: 'The FLAME & FORK dining room in daylight', className: 'md:col-span-2' },
  { src: IMG.beefSteak, alt: 'A grilled steak sliced to show a pink centre', className: '' },
  { src: IMG.lavaCake, alt: 'A chocolate lava cake with molten centre', className: '' },
  { src: IMG.chef, alt: 'A chef plating a dish in the open kitchen', className: 'md:col-span-2' },
];

export const TESTIMONIALS = [
  {
    name: 'Megan Carter',
    meta: 'Regular since 2021',
    rating: 5,
    quote:
      'The smash burger is the best I have had in the city — proper crispy edges and a bun that actually holds together. We drive across town for it.',
  },
  {
    name: 'Daniel Reyes',
    meta: 'Family dinner',
    rating: 5,
    quote:
      'Ordered the Family Feast for four people and there was still food left over. It arrived hot, the chicken was still crunchy and the team called to confirm.',
  },
  {
    name: 'Priya Nair',
    meta: 'Friday night regular',
    rating: 4,
    quote:
      'Beautiful room, genuinely warm service and a pizza crust that tastes like someone cares. The lemonade is dangerously good.',
  },
];

export const GALLERY_STRIP = [
  'Flame grilled daily',
  'Stone-baked pizza',
  '72-hour dough',
  'Hand-cut fries',
  'Made fresh, never reheated',
];