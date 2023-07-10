'use client';

export default function ShowEntry({ entryId }) {
  // entryId is a string

  async function getEntryById() {
    const response = await fetch(`/api/entries/${entryId}`);
    const data = await response.json();

    console.log('my single entry', data);

    getEntryById().catch((error) => console.log(error));
  }

  return <div>hello</div>;
}
