# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## App details

The function of this app is to create a Maximum Bipartite Match using the Ford-Fulkerson Algorithm.

### `Components`

### For submitting responsed to matches

Components used are matchSearchForm.js and matchInputSubmitForm.js. These components allow users to query matches using a provided match id and submit their own inputs to the queried match. Acessing these 2 component do not require users to log in before using.

### For managing matches

newMatch.js allows for users to create a new match.

matches.js and matchResponse.js allows for users to view created matches and the responses submitted to each match.

editMatch.js allows for users to make changes to created matches.

matchResult.js allows for users to generate and view the results to their match.

### `Action Creators`

ActionCreators.js contains all action that are used in this react front-end app. They are supported by REST API endpoints created using Express [here](https://github.com/derekjxtan/Matcher-Express).

### `Planned future improvement`

### 1. Allow for maximum utilisation of second set of items

Current implementation generates results by fully creating a single Maximum Bipartite Match. In some cases, where set 1 contains few items compared to set 2, most items in set 2 may be unutilised. An option would be provided to users to maximise usage of second set such that an item from set 1 can match to more than 1 item in set 2. 

Implementation idea: Generate a Maximum Bipartite Match and save this result. Removed the items in set 2 that were used. Repeat the process.

### 2. Allow for duplicate items in either set

Current implementation does not allow duplicate items to be in a single set. In some cases, duplicate items may be needed (e.g. Assigning people to job openings. One job may have mulitple openings and set 2 in this case would have duplicated jobs.)

Implementation idea: When there are duplicates, dictionary of set 2 items will store an array of nodes instead for a given key instead of only 1 node. When generating graph of matches, all of the nodes in the array will be connected to the item in set 1.
