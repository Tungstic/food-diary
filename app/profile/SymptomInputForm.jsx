'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SymptomInputForm(props) {
  const [symptomFromUser, setSymptomFromUser] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkmark, setCheckmark] = useState();
  const currentUserId = props.user;
  const router = useRouter();

  function handleInput(event) {
    setSymptomFromUser(event.currentTarget.value);
    if (symptomFromUser !== '') {
      setIsDisabled(false);
    }
  }

  async function handleSubmit() {
    const response = await fetch('/api/symptoms', {
      method: 'POST',
      body: JSON.stringify({
        symptomName: symptomFromUser,
        userId: currentUserId,
      }),
    });

    const data = await response.json();

    console.log('new symptom from user', data);

    if (data) {
      router.refresh();
      setSymptomFromUser('');
      setCheckmark('✔️');
    }
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Add new symptom
        <input
          style={{ marginLeft: '8px' }}
          value={symptomFromUser}
          onChange={handleInput}
        />
      </label>
      <button disabled={isDisabled} onClick={async () => await handleSubmit()}>
        Save
      </button>
      <span>{checkmark}</span>
    </form>
  );
}
