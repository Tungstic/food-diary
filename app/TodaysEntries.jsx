export default async function TodaysEntries() {
  const listOfEntries = [];

  async function getTodaysEntries() {
    const response = await fetch('http://localhost:3000/api/entries');
    const data = await response.json();
    console.log(data);
    listOfEntries.push(data.entries);
  }

  getTodaysEntries().catch((error) => {
    console.log(error);
  });

  await getTodaysEntries();
  return (
    <>
      <div>Your entries today</div>
      <div>{JSON.stringify(listOfEntries)}</div>
      {listOfEntries.length > 0 && (
        <div>
          {listOfEntries.map((entry) => {
            return <div key={`entry ${entry.mealName}`}>{entry.mealName}</div>;
          })}
        </div>
      )}
    </>
  );
}
