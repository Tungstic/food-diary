'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function IngredientInputForm(props) {
  const [ingredientFromUser, setIngredientFromUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkmark, setCheckmark] = useState();
  const currentUserId = props.user;
  const router = useRouter();

  function handleInput(event) {
    setIngredientFromUser(event.currentTarget.value);
    if (ingredientFromUser !== '') {
      setIsDisabled(false);
    }
  }

  async function handleSubmit() {
    const response = await fetch('/api/ingredients', {
      method: 'POST',
      body: JSON.stringify({
        ingredientName: ingredientFromUser,
        userId: currentUserId,
      }),
    });

    const data = await response.json();

    console.log('new ingredient from user', data);

    if (data) {
      router.refresh();
      setIngredientFromUser('');
      setCheckmark('✔️');
    }
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Add new ingredient
        <input
          style={{ marginLeft: '8px' }}
          value={ingredientFromUser}
          onChange={handleInput}
        />
      </label>
      <button
        style={{ padding: '2px' }}
        disabled={isDisabled}
        onClick={async () => await handleSubmit()}
      >
        Save
      </button>
      <span>{checkmark}</span>
    </form>
  );
}
