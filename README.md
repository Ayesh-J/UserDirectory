 Project Overview
This is a React-based User Directory app that fetches random user data from the Random User API. It features:

Infinite scrolling to load more users as you scroll down

Search functionality by user full name

Gender filtering

User detail modal with click-outside-to-close functionality

Modern UI design with Tailwind CSS

Folder Structure
bash
Copy
Edit
/src
  /components
    - UserCard.jsx        # Displays a single user's summary info as a card
    - UserModal.jsx       # Modal popup showing detailed user info
    - FilterBar.jsx       # Search input and gender filter dropdown
  App.jsx                 # Main component managing state and fetching data
Key Components and Logic
App.jsx
Uses React hooks (useState, useEffect, useRef) for managing data, state, and side effects.

Maintains main states:

users (all fetched users)

displayedUsers (filtered & searched users)

page (current page for pagination)

search and gender (filter parameters)

loading and error (API status)

selectedUser (user for modal display)

Fetches users asynchronously from API with pagination.

Implements infinite scroll using IntersectionObserver to load more users when last card becomes visible.

Filters users array based on search input and gender selection.

UserCard.jsx
Displays user picture, name, and brief info.

Calls a function on click to open UserModal.

UserModal.jsx
Shows detailed user info in a popup modal.

Uses useRef and useEffect to detect and handle clicks outside the modal to close it.

FilterBar.jsx
Provides a controlled input for name search.

Provides a dropdown to filter users by gender.


Dependencies
React

Tailwind CSS (for styling)

API Reference
User data is fetched from:
https://randomuser.me/api/?results=20&page={pageNumber}