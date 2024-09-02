# Fast Track
#### Video Demo:  https://youtu.be/2_quJmquLOg
![image](https://github.com/user-attachments/assets/1b852bdd-413f-4d4a-bc78-4f18e9031bf1)

#### Description:

### The "Parcel Tracker" extension allows tracking of national parcels through integration with the API https://api.linketrack.com/track/json, presenting a friendly interface

# Extension Details
## manifest.json:
This file is used to define the extension properties such as name, version, description, permissions, icons, background scripts, etc. It contains important information for the browser to understand how the extension should work.

## popup.html:
This is the HTML file that defines the structure of the extension's popup. It appears that this file contains elements such as an input field (#inputCode), a search button (#inputBtn), a theme switch button (#themeBtn), and a container (#infoContainer) where the API information will be displayed .

## popup.css:
This file contains CSS styles that are applied to the HTML popup. It defines the visual appearance of the elements in the html file.

## popup.js
The popup.js file contains the functions that make the request to the API, assemble the template that is returned to be displayed on the screen, format the dates to order the events and change the page theme.

## CORS and AWS:
Using the original Correios API I had the CORS (Cross-Origin Resource Share) problem and the solution I found was to use a Proxy API. And for that I used two AWS services, API Gateway and AWS Lambda. API Gateway was used as a trigger for the function, which made an HTTP request to the original API and returned the JSON with the order information.

# Interface
![image](https://github.com/user-attachments/assets/eee858a8-c78f-4d15-9eff-8a211a01b45e)
