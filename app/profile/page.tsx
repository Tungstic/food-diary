import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllIngredients } from '../../database/ingredients';
import { getAllSymptoms } from '../../database/symptoms';
import { getUserBySessionToken } from '../../database/users';
import IngredientInputForm from './IngredientInputForm';
import styles from './page.module.scss';
import SymptomInputForm from './SymptomInputForm';

export default async function ProfileUsernamePage() {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const symptoms = await getAllSymptoms();
  const ingredients = await getAllIngredients();

  const symptomList = symptoms.map((symptom) => symptom.symptomName);
  const ingredientList = ingredients.map(
    (ingredient) => ingredient.ingredientName,
  );

  return (
    <>
      <div className={styles.hello}>{`Hello, ${user.username
        .at(0)
        ?.toUpperCase()}${user.username.slice(1)}!`}</div>
      <div className={styles.hello}>
        This is your profile. Here you can see the full list of symptoms and
        ingredients and add to it. You can also create new symptoms and/or
        ingredients while making{' '}
        <Link
          style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
          href="/new"
        >
          a new entry.
        </Link>
      </div>
      <div className={styles.readOnlyLists}>
        <SymptomInputForm user={user.id} />
        <IngredientInputForm user={user.id} />
        <div className={styles.symptoms}>
          <ul>
            {symptomList.map((singleSymptom) => {
              return <li key={`symptom ${singleSymptom}`}>{singleSymptom}</li>;
            })}
          </ul>
        </div>
        <div className={styles.symptoms}>
          ingredient
          <ul>
            {ingredientList.map((singleIngredient) => {
              return (
                <li key={`symptom ${singleIngredient}`}>{singleIngredient}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
