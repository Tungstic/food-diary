import { Sql } from 'postgres';

const predefinedIngredients = [
  'Eggs',
  'Milk',
  'Peanuts',
  'Almonds',
  'Walnuts',
  'Pecans',
  'Soybeans',
  'Rice',
  'Mayo',
  'Ketchup',
  'Vinegar',
  'Soy sauce',
  'Wheat',
  'Fish',
  'Shrimps',
  'Crab',
  'Sesame seeds',
  'Mustard',
  'Celery',
  'Gluten',
  'Corn',
  'Strawberries',
  'Kiwi',
  'Pineapple',
  'Melon',
  'Mango',
  'Avocado',
  'Banana',
  'Apple',
  'Orange',
  'Lemon',
  'Tomato',
  'Grapes',
  'Peach',
  'Chocolate',
  'Coffee',
  'Tea',
  'Prawns',
  'Oysters',
  'Lentils',
  'Chickpeas',
  'Garlic',
  'Onions',
  'Leeks',
  'Peas',
  'Cabbage',
  'Spinach',
  'Lettuce',
  'Cucumber',
  'Carrots',
  'Potatoes',
  'Chilli',
  'Ginger',
  'Cinnamon',
  'Oregano',
  'Coriander',
  'Cumin',
  'Basil',
];

export async function up(sql: Sql) {
  for (const ingredient of predefinedIngredients) {
    await sql`
    INSERT INTO ingredients
    (ingredient_name, user_id)
    VALUES
    (${ingredient.toLowerCase()}, ${4})

  `;
  }
}

export async function down(sql: Sql) {
  for (const ingredient of predefinedIngredients) {
    await sql`
    DELETE FROM ingredients WHERE ingredient_name = ${ingredient.toLowerCase()}
  `;
  }
}
