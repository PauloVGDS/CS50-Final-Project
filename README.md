# Tracking Extension
#### Video Demo:  https://youtu.be/2_quJmquLOg
#### Description:

### The "Parcel Tracker" extension allows tracking of national parcels through integration with the API https://api.linketrack.com/track/json, presenting a friendly interface in the popup.html file and using a local Express server to improve interaction.

## Extension
# manifest.json:
This file is used to define the extension properties such as name, version, description, permissions, icons, background scripts, etc. It contains important information for the browser to understand how the extension should work.

# popup.html:
This is the HTML file that defines the structure of the extension's popup. It appears that this file contains elements such as an input field (#inputCode), a search button (#inputBtn), a theme switch button (#themeBtn), and a container (#infoContainer) where the API information will be displayed .

# popup.css:
This file contains CSS styles that are applied to the HTML popup. It defines the visual appearance of the elements in the popup, such as colors, fonts, sizes, etc.
popup.js:

# popup.js
This is the main JavaScript file for the extension. It contains two main functions: infoAPI and switchTheme.
**infoAPI**: This function makes an asynchronous request to a local server based on the value entered in the input field (#inputCode). It then manipulates the received data and displays it ordered by date and time in the container (#infoContainer).
**switchTheme**: This function switches between "light" and "dark" themes by modifying the data-theme attribute on the HTML element and adjusting the icon on the theme switch button (#themeBtn).
favicon.png:

# favicon.png
This is the extension icon that will be displayed in the browser toolbar.

# popup.js
JavaScript code using the fetch method to obtain data from a local API, and the infoAPI functions to manipulate and display this data in the extension popup. And the switchTheme function as additional functionality to personalize the user experience.


## Server
Node.js server using the Express framework. Here is a description of some key parts:

## Express and CORS Middleware:
The express library is imported and initializes the Express application.
The cors middleware is configured using app.use(cors()), allowing requests from different sources.

## Port Definition:
The port variable is set to 1732, indicating which port the server will be listening on.

## GET Route and Code Parameter:
A GET route is defined using app.get('/:code', ...), where :code is a parameter in the URL.
The order code is extracted from the URL parameter using const code = req.params.code.

## Request to the Tracking API:
Use the fetch function to make a request to the tracking API (https://api.linketrack.com/track/json) with the order code.
Configures appropriate headers, such as JSON content type.

## JSON Response and Send Handling:
Checks whether the fetch request was successful (status 200).
Converts the response to JSON using await solicitacao.json().
Returns JSON information to the client using res.json(info).

## Error Handling:
Includes a try-catch block to handle errors during request or processing.

## Server Home:
The server is started by calling app.listen(port, ...), displaying a message when ready.
This server acts as an intermediary between the extension and the tracking API, facilitating CORS control and providing an additional layer for handling requests and responses.
