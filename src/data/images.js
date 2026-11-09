const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

const base = 'https://media.db.com/images/public/6aed857cb5002fbffca98aec/';
const img = (id) => `${base}${id}_generated_image.png`;

export const IMG = {
  hero: img('f51e19259'),

  // Burgers
  smashBurger: img('1a44c3e83'),
  doubleCheese: img('2ebdbb60b'),
  crispyChickenBurger: img('24794ac49'),
  bbqBacon: img('32172a5e7'),
  spicyJalapeno: img('8fa6eadec'),

  // Pizza
  pepperoni: img('ded0a4072'),
  bbqChickenPizza: img('38f4cc739'),
  margherita: img('2c736511d'),
  fourCheese: img('374d8e043'),
  supremePizza: img('be4ba549f'),

  // Fried chicken
  crispyChicken: img('8c8c1aac6'),
  chickenStrips: img('6c470bd1f'),
  chickenWings: img('6835e17ee'),
  chickenTenders: img('45e3fc8f1'),
  chickenBucket: img('d7b6e7b1f'),

  // Grilled
  chickenSteak: img('051fe4890'),
  bbqChickenPlatter: img('0123bdb3a'),
  beefSteak: img('e1b44ff97'),
  periPeri: img('4527b3224'),
  riceBowl: img('ca3ba33a7'),

  // Sandwiches
  clubSandwich: img('8779bf013'),
  grilledChickenSandwich: img('6f0a50a9e'),
  phillyCheesesteak: img('fb1ef43b0'),
  chickenSub: img('32b63e44b'),
  bbqBeefSandwich: img('da95e2d2d'),

  // Sides
  frenchFries: img('7a12ab194'),
  loadedFries: img('6afda605c'),
  onionRings: img('a8bb4f8fb'),
  mozzarellaSticks: img('6c720550c'),
  garlicBread: img('f6ac1e80e'),

  // Desserts
  brownie: img('37b67dbaf'),
  cheesecake: img('c167b0203'),
  lavaCake: img('bba95861f'),
  sundae: img('5026e4ccc'),
  berryShake: img('6903b2e05'),

  // Beverages
  lemonade: img('82b98f4db'),
  chocShake: img('3c225deb9'),
  strawberryShake: img('67595017f'),
  icedCoffee: img('d5bfeac55'),
  softDrinks: img('fe2960ff3'),

  // Combos & atmosphere
  comboFeast: img('d7576bc1e'),
  comboDuo: img('2e52986d0'),
  comboLate: img('a0cb941c9'),
  interior: img('c2f199d88'),
  kitchen: img('cf91922a2'),
  chef: img('a47106317'),
};