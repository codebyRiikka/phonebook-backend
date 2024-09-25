# phonebook-backend
Backend for the phonebook task
______________________________

RENDER FRONT-END: https://phonebook-backend-lmxd.onrender.com
RENDER BACK-END: https://phonebook-backend-lmxd.onrender.com/api/persons

------------------------------------------------------------------------------------------------------------------------------------

Here is what happends in the phonebook app: 

FRONTEND INTERACTION - When page is loaded, you can search, add, update or delete phone numbers and contact names. 

API REQUESTS - The frontend communicates with the backend via HTTP requests. For example, when you add a new contact, the frontend sends a POST request to the backend API, while viewing the phonebook triggers a GET request to fetch all contacts. 

BACKEND PROCESSING - The backend handles these API requests and perform CRUD operations (Create, Read, Update, Delete) on the phonebook data, which is stored in a MongoDB database. 

DATABASE - The phonebook data, including names and phone numbers, is stored in MongoDB, which the backend accesses when it processes requests. 

RENDER HOSTING - The entire App is deployed on Render, a cloud hosting platform that automatically updates the app when changes are made in the connected GitHub repository.

Simplier: It's a simple contact management app that allows users to manage phonebook entries via a React frontend and Node.js/MongoDB backend, all hosted on Render. 
