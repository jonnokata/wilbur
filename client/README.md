# Wilbur - Beautifully simple notes
This project marks the end of my Web Development Immersive course at General Assembly, Sydney. As a Product Manager (PM) at Atlassian working on platform, I wanted to use this time to learn more about how our platform components from our Open Source library, [AtlasKit](https://atlaskit.atlassian.com/packages), work. The main outcome for me with this project was purely to dig into these components in order to understand both their pros and cons.

As this app was built as more of a technical exploration, the real-world use case was less important to me (which feels weird as a PM to say). Like many other apps out there, this is just another note taking app. 

## Built with
- React
- Firebase - Authentication & Firestore Database
- AtlasKit - Various packages

## To do
- Drag-and-drop pages in page tree
- Child pages in page tree (i.e. nesting of pages)
- Auto populate titles in page tree on page create and update
- Auto populate username in left nav header
- Update details modal
- Create default new page on sign-up
- Render last opened page on login
- Version history of pages

## What it looks like
Login/signup

Page tree with editor

## To clone & use
1. Clone this repo
2. `npm-install` to install dependencies
3. Create your own Firebase account and project
4. Update the code in `.env.local` and `firebase.js` with your own credentials

## Available scripts

In the project directory you can run:
## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
