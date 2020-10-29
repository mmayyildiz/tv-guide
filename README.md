 How to run?

## npm install
## npm test 
## npm start

 If given more time, I would like to improve UI/UX, adding new features like filtering channels. And also increasing the test coverage. 
 an API could be provided that paginates program data, it could improve the performance, decreases the page loading time. Instead of fetching all data at once, we could fetch programs while scrolling down. It is a huge amount of data that doesn't fit into local storage and redux store fully. Because of the absence of pagination API, I developed my own pagination mechanism. For Preventing the page from freezing, I lazily fetch data from the api and used local storage to cache the data.

 Note : https://cdn.skyq.sky.com/recruitment/tvguide/schedule/20201029/2002.json service doesn't return any schedule for the current date and the week days. So I set today as 20200129, to make the tv guide table filled. 