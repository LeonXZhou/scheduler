# Interview Scheduler
A scheduler webapp built using React where:

1. Interviews can be booked between Monday and Friday.
1. A user can switch between weekdays.
1. A user can book an interview in an empty appointment slot.
1. Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
1. A user can cancel an existing interview.
1. A user can edit the details of an existing interview.
1. The list of days informs the user how many slots are available for each day.
1. The expected day updates the number of spots available when an interview is booked or canceled.
1. A user is presented with a confirmation when they attempt to cancel an interview.
1. A user is shown an error if an interview cannot be saved or deleted.
1. A user is shown a status indicator while asynchronous operations are in progress.
1. When the user presses the close button of the error they are returned to the Form or Show view(skipping Status and Confirm).
1. The application makes API requests to load and persist data. 

## Screenshots:
Initial Home Screen
!["Home"](https://github.com/LeonXZhou/scheduler/blob/master/Docs/Screenshots/Homescreen.png)

Edited Form Screen
!["Editing"](https://github.com/LeonXZhou/scheduler/blob/master/Docs/Screenshots/Edit.png)

Updated Home Screen
!["Editing"](https://github.com/LeonXZhou/scheduler/blob/master/Docs/Screenshots/Updated.png)

## Setup
Install dependencies with `npm install`.

You will also need to seperately run a seperate resource server to handle api requests from this client side app for data persistance. The resource server used for development can be found here [link](https://github.com/LeonXZhou/scheduler-api)


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
