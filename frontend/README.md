UniEvent is a college event listing platform with three parts: a backend API, a public frontend for browsing events, and an admin panel for managing them. This page introduces how those parts fit together; implementation and setup details are covered in the child pages.


Applications and interaction
At a high level, administrators use the admin panel to manage event information through the backend API, while the public frontend presents event listings to users. In the admin app, App renders shared navigation and routes to the Add, Delete, Update, and UpdateEventPage components. 

Application	Role
Backend API	Provides the event-management and event-listing interface used by the other applications.
Public frontend	Presents event listings to users.
Admin panel	Provides pages for adding, deleting, and updating events. 


Admin panel code map
App is the admin app’s route composition point: it renders Navbar and Sidebar, then maps /add, /delete, /update, and /update/:id to their corresponding page components. The admin package includes React, React Router, Axios, and Vite dependencies

The admin app is an npm package named admin, configured as an ES module. Its scripts provide development, build, lint, and preview tasks. 
From the admin/ directory, install dependencies using the repository’s package manager, then run the package’s dev script with npm run dev. The script invokes Vite. 


The package file does not specify a Vite server port. Use the address printed by Vite when the server starts, or consult the admin Vite configuration if you need to establish or change the port; that configuration was not included in the supplied files. 
admin/package.json
6-10

Other available scripts are npm run build for a production build, npm run lint for ESLint, and npm run preview for Vite’s preview server. 

Run the backend
The supplied backend configuration defines MONGO_URI in backend/.env; its value points to a MongoDB Atlas connection string and includes credentials. Keep the actual value private. 

The requested node server.js or nodemon server.js command cannot be confirmed from the supplied files: no backend entry-point file or backend package scripts were provided. Likewise, the supplied files do not show whether the backend loads .env, which port it listens on, or how it connects to MongoDB. Verify those details in the backend server and database-connection files before starting it
The backend has a .env file containing a MONGO_URI setting. Treat this value as a secret: the supplied file includes database credentials, so do not copy it into documentation, commit it to a public repository, or share it in logs. If the credential has been exposed, rotate it and update the local environment file. 

Run the public frontend

The public frontend’s package manifest and Vite configuration were not included in the supplied content. Consequently, its development command, default port, and any environment variables used to reach the backend cannot be documented as verified setup instructions here. Check the frontend package scripts and Vite configuration in the repository before starting its development server.

Backend API
Relevant source files
This page summarizes the Express and Mongoose backend in backend/. The backend exposes a REST API for event data, stores events in MongoDB through a Mongoose model, and handles poster image uploads. It serves the admin panel and the public frontend. Implementation details live in the child pages linked below.

The backend has four concerns:

Bootstrap: starting the Express app and connecting to MongoDB.
Routing and controllers: mapping HTTP endpoints to handler functions.
Data model and uploads: the event schema and poster storage.
Dependencies: the vendored node_modules tree.


Request Flow Across Backend Modules
The diagram below maps the backend modules to the identifiers in the code. Route and controller names are the exact identifiers used in the source.

2.1 Server Bootstrap and Database Connection
server.js creates the Express app, applies middleware (CORS, JSON body parsing), serves /images as static files, and listens on port 4000. It calls connectDb to open the MongoDB connection. connectDb in backend/config/db.js reads MONGO_URI from the environment via dotenv, calls mongoose.connect, and logs success or failure. It does not rethrow errors, so the server keeps running if the connection fails.


2.2 Event Routes and Controllers
backend/routes/eventRoute.js maps the event endpoints (/add, /list, /remove, and PUT /:id) to controller functions. Poster uploads go through a multer disk storage middleware, which sets req.file before addEvent runs. The controller file defines four handlers: addEvent creates an event from the request body and stores the uploaded file name in poster, listevent returns all events, removeEvent deletes an event by req.body.id, and showEvent updates an event by ID.

Several known issues affect these handlers. showEvent destructures id from req.params.id, which is a string, so the id value is undefined (backend/controllers/eventController.js:53). removeEvent reads remove.image while the schema stores the file in poster (backend/controllers/eventController.js:39). Both are covered in the child page.

Event Data Model and Uploads
backend/models/eventModel.js defines the Mongoose eventSchema and registers the eventModel. The controllers construct documents from the request body fields name, about, club, place, time, and date, along with poster, the uploaded file name (backend/controllers/eventController.js:7-15). Poster files are written to the backend/uploads directory and served at /images.

Backend Dependencies and node_modules
The backend/ directory includes a vendored node_modules tree, which contains express, mongoose, mongodb, multer, bcrypt, jsonwebtoken, validator, and nodemon. The .bin shims in that tree provide CLI entry points such as nodemon. Committing node_modules increases repository size and can cause platform-specific install problems, particularly for native modules such as bcrypt.

connectDb behavior
connectDb is an exported asynchronous function. It awaits mongoose.connect(process.env.MONGO_URI). On success, it logs DB connected. If the connection attempt throws, the catch block logs DB connection failed: and the error message. The function does not rethrow the caught error. 
backend/config/db.js
7-13
The supplied files do not show whether server.js imports or invokes connectDb, or whether server startup waits for the connection attempt. 

Event Routes and Controllers
Poster Upload (multer)
The controller depends on multer having already run on the request. addEvent reads req.file.filename at line 5, which multer populates when a file part is received. Disk storage, destination folder, and filename generation are configured in a file that was not reviewed.

Two consequences are visible from the controller alone:
The stored poster value is only the generated filename, not a path. The directory is resolved elsewhere (the outline places posters in backend/uploads and serves them under /images).
req.file must exist.
Controller: addEvent
addEvent builds an eventModel document from the multipart body fields name, about, club, place, time, date, and sets poster to the uploaded filename. It then calls save() inside a try block and returns a JSON envelope.
Controller: listevent
listevent calls eventModel.find({}) with an empty filter, so it returns every document with no pagination, sorting, or projection. The result is wrapped as {success:true, data:events}. On error it logs and returns {success:false, message:"error"}.
Controller: removeEvent
removeEvent reads the target id from req.body.id, not from a URL parameter. It performs two database operations and a best-effort file delete.
Controller: showEvent (PUT /:id handler)
Despite its name, showEvent is the update handler. It is intended to serve PUT /:id.

Intended logic: findByIdAndUpdate(id, {...req.body}, {new:true}) returns the updated document. A missing document yields HTTP 404 (line 61), and success returns the updated event (line 64).

Defect at line 53:

const { id } = req.params.id;
req.params.id is already a string. Destructuring id from a string yields undefined, not the route parameter. The subsequent findByIdAndUpdate call therefore receives undefined as the id, so the handler does not target the document named in the URL. The behavior depends on Mongoose's handling of an undefined _id filter, and the 404 branch is the likely outcome. The correct access pattern is a direct read of the parameter, not destructuring of the parameter value.

Schema fields
eventSchema is created with new mongoose.Schema(...). It defines seven fields: six required strings and one required date. The poster field is also declared as a string, but its option is spelled reqiured rather than Mongoose’s required; as written, that option does not express the normal required-field constraint.

Model registration and export
The module assigns eventModel using the expression mongoose.model.event || mongoose.model("event", eventSchema) and exports that value as the default export. The expression first checks mongoose.model.event; if that property is falsy, it calls mongoose.model with the model name "event" and eventSchema. 

The file does not show where other modules import eventModel, nor does it establish how the model name maps to a MongoDB collection in this application. Those details are outside the supplied source. 

eventSchema is the schema definition in backend/models/eventModel.js; eventModel is the module’s default export. Event metadata is represented by the seven declared fields, with poster stored as a string. The supplied model source does not document upload processing or the contents and usage of backend/uploads

                  ******Admin Panel*****

The admin panel is the admin/ application for managing events through Add, Delete, and Update pages. Its HTML entry point mounts the React application, while App.jsx places the shared navigation and sidebar around the page routes. This page summarizes that structure; detailed behavior is covered by the child pages.

App structure and event-management areas
admin/index.html provides the root mount point and loads src/main.jsx. The bootstrap renders App inside BrowserRouter; App then renders Navbar, Sidebar, and routes for adding, deleting, listing events to update, and editing an event by ID. 

App imports the four page components and declares their paths in Routes. Navbar and Sidebar are rendered outside Routes, so they form the shared surrounding layout for the routed content.

Admin Event Management Pages
This section documents the admin panel’s event-management pages: Add creates events, Delete lists and removes them, Update lists events for selection, and UpdateEventPage submits changes for a selected event. It covers their form state, Axios requests, toast notifications, poster preview/upload controls, and the page styles shown in the supplied files.

Add page: create and upload
Add defines url as http://localhost:4000, initializes image to false, and stores the six event text fields in data. 

On form submission, onSubmitHandler prevents the browser’s default submit behavior, creates a FormData, and appends each text field plus image. It sends that multipart payload using Axios to POST ${url}/api/event/add. 

On a successful response, the component resets the text state, sets image back to false, and displays response.data.message through toast.success. If the response indicates failure, it logs error and displays the response message with toast.error; the supplied handler does not declare an error variable in that branch. 

Poster upload area
The file input is hidden and associated with a label through htmlFor='image'. Selecting a file stores the first file in image; the displayed image uses URL.createObjectURL(image) when a file is selected, otherwise it uses assets.upload_area_image. The input is marked required, and the selected file is included in the FormData under the key image. 

The visual layout is defined in Add.css: .add-form is a vertical flex container; its inputs are given a 50-pixel height and a width based on max(1vh,500px); the description input is taller; and the upload image is styled to a width of 200 pixels.

Delete page: list and remove events
Delete maintains an array in list. Its fetchList function requests GET ${url}/api/event/list; on success it stores response.data.data, and on failure it shows the generic toast message Error Occured. A mount-time useEffect calls fetchList once. 

The page renders a row for each item with its name, description, club, time, date, place, poster, and an X action. Poster URLs are formed as ${url}/images/ plus item.poster. Clicking X calls removeFood(item._id). 
removeFood posts {id: eventId} to /api/event/remove, then awaits fetchList to refresh the displayed events. It shows event removed on a successful removal response and error occured otherwise. 

Delete.css lays out the header and event rows with CSS grid columns and reduces the grid proportions at widths below 900 pixels. Poster thumbnails are 50 pixels wide.

Update page: select an event

Update uses the same list-fetching pattern as Delete: fetchList requests GET ${url}/api/event/list, stores the returned data on success, and shows a generic error toast otherwise. A useEffect triggers the fetch when the component mounts. 
Each rendered row shows the event’s text fields and poster image. Its UPDATE anchor is constructed as /update/:${item._id}. 
The styles in Update.css define a grid for the heading and rows, a 50-pixel poster thumbnail, and an alternate grid layout below 900 pixels. 

UpdateEventPage: submit edits
UpdateEventPage reads id using useParams, initializes image to false, and initializes the six text fields to empty strings. Its onChangeHandler updates those fields in the same name-based manner as Add. 
On submit, onSubmitHandler prevents the default form action, builds a FormData containing the six text fields, and sends it with Axios as a PUT request to ${url}/api/event/${id}. The request specifies the multipart/form-data content type. 
If the response reports success, the component resets the text fields and shows response.data.message through toast.success. The request is inside a try/catch; the catch logs the caught error and attempts to display response.data.message, although response is not declared in that catch block. 

              *****FRONTEND******

The public frontend is the read-only, student-facing client of UniEvent. It fetches event records from the backend REST API and presents them in three views: events happening today, upcoming events, and clubs. It shares a state store through a React context and offers a login popup. It does not create or modify events. The admin panel handles writes (see Admin Panel).
Both client apps call the same backend API. The admin app is a route-based React app that mounts Navbar, Sidebar, and routed pages (/add, /delete, /update, /update/:id). The public frontend is a separate Vite-based React app with its own route table.

Frontend Sub-Systems
The frontend has two sub-topics, each covered in a child page.

Pages and Routing
The frontend root component routes to three pages: Today, Upcoming, and Clubs (per outline, frontend/src/App.jsx). Each page displays event data through a shared Event component. The routing and page-level data flow are described in detail in the child page.

Shared Components and Store Context
Navigation and layout are handled by Navbar and Footer. LoginPopup provides the login UI. A StoreContext (per outline, frontend/src/Context/StoreContext.jsx) holds state shared across pages and components. Static images are kept in an assets directory.

The available source does not show the public frontend’s App.jsx or define Today, Upcoming, Clubs, or Event. Consequently, route paths, component wiring, data-fetching behavior, and event display details for the public frontend cannot be verified from this excerpt.
App returns the shared page shell before rendering its route table: Navbar appears first, followed by <hr />, then the app-content container with Sidebar and Routes. Each Route supplies a path and an element to render when that path matches. 
The component imports Route and Routes from react-router-dom, and imports Navbar, Sidebar, Add, Delete, Update, and UpdateEventPage from their respective admin directories.

