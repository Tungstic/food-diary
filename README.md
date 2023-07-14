# Food diary app

Next.js app that serves as a digital food diary and helps people discover their food triggers. The app is not intended to give any health advice but the collected data can be shared with a medical professional for further analysis. In order to receive useful statistics the user is supposed to make regular and detailed entries with regards to their personal needs.

## Features

1. User needs to register to be able to use the app. All data is created by the user and cannot be viewed by anyone else.

2. User can log in and set up their profile: add the symptoms and/or ingredients that they want to track (added to the shared database).

3. User creates an entry with following information: a name for the meal, key ingredients (potential triggers), symptoms and an optional note. The entry is automatically timestamped with the current date. After the entry's been created, the user is re-directed to Home Page.
	
4. Home Page: user can view their latest entries or use the calendar: click on the date to view all entries made on that day.

5. Statistics Page: user can see a list of their symptoms (from most frequent to least). By clicking on a symptom, the user should be able to see a list of all ingredients (aka triggers) that were consumed when that symptom occurred (visualization with Chart.js bar chart).
	
6. Extra feature: user should be able to download the statistics report as a PDF.
	
7. Extra feature: sending a reminder if the user hasn't made an entry by 9pm (every day).

## Technologies used:

- Next.js (React and Node.js)
- PostgreSQL
- DrawSQL for database schema, Figma for visual design
- REST APIs
- Typescript (12 files written in it, not including migrations or database files)
- Testing: Jest, Playwright and Postman
- SCSS modules, responsive design to allow full access on a mobile device

![homePage_screenshot](https://github.com/Tungstic/food-diary/assets/115181901/ef4e20cd-8562-4576-a7cf-85b478a6a93f)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
