'use client';

import { useEffect } from 'react';

export default function ShowEntry({ entryId }) {
  useEffect(() => {
    async function getEntryById() {
      const response = await fetch(`/api/entries/`);
      const data = await response.json();

      console.log('my single entry', data);

      getEntryById().catch((error) => console.log(error));
    }
  }, []);

  return <div>{JSON.stringify(entryId)}</div>;
}
