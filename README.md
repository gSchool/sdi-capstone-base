# <strong>SMARTSHEETS
### *Group 1:  Daniel Salazer, Dayan Sauerbronn, Levi Fry, Kyle Dilick, & Kevin Wolfe*

<br>

### **Version Notes:**

    v0.1:
    - Initialized Application 
    - Set up the framework to start building SmartSheets
    - Imported README picture files into SMARTSHEETPICS folder
    - Began README "living document" logging
    - Began implementing ROUTES
    - Created .css, .jsx styling files for GLOBAL
    - Began styling basic sheet format
    - Building scaffolds
    - Begin creating API
    - Collapsible menu created
    - Authentication tokens in Firebase implemented

    v0.2:
    - Added "instant login" button to login instantly when desired -- user auth only persists until page refresh
    - Refactored user object in useUser.jsx state
    - Added profile image to sidebars
    - General updates to sidebar CSS
    - User authentication now persists in local storage
    - Created AuthProvider to route the user based on authentication in local storage
    - Refreshing the page now preserves the previous location in history, instead of defaulting to the homepage
    - Created PageLoader element with animation for page loads
    - Lite and dark theme added, still needs work -- theme toggle button added to sidebar
    - Small updates to Sheets page CSS

    v0.3 (5 July):
    - Formatted ADD ITEM menu to be seperate from page; enables easier mobile display
    - Adjusted light/dark theme options for aesthetics, ease of viewing
    - Implementing FIREBASE authentication between client, host
    - Added scrollbars to sheet view, formatted to be outside of viewable area
    - ADD ITEM container now goes across entire page rather than being a sidebar
    - Played with checkboxes, verified that Family Size Baked Beans IS BEANS

    v0.4 (6 July):
    - Formatting front end DIV's, containers, to ensure proper display
    - Resolved FIREBASE login issue where token wasn't being passed between host, client
    - Beginning to implement GET requests from backend to frontend
    - Implementing USER ACCESS/menus page from mobile view
    - Wolfe bought GitHub Co-Pilot because of Levi's peer pressure
    - Clicking on a sheet now generates a dynamic route
    - Beginning to tie together backend, frontend tables/presentation together
    - USER ACCESS screen now displayers access rights per user

    v0.5 (7 July):
    - Refactored EDIT ENTRY code to iterate through all fields correctly, update values/value ID's
    - Updated Miro board to ensure "living document" accuracy
    - Implementing, refactoring USE STATE for table EDIT ENTRY array
    - Refactoring, editing DARK MODE CSS to better display requisite information
    - Refactoring USER ACCESS screen code
    - Implemented CLICK TO DRAG for sheet view
    - Implemented auto-scrolling, auto center

    v0.6 (8 July):
    - Tied frontend into backend for data handling
    - Created MENUS for SHEETS VIEW
    - Implemented SEARCH on USER ACCESS screen
    - Added "UPDATE" notification if previously entered data is changed
    

<br>

* * *

<br>

#### <strong>PROBLEM STATEMENT:
>I need a user friendly way to manage inventory, which promotes accountability and increases efficiency across the Air Force.

<br>

#### <strong>BACKSTORY:</strong>

> Aircraft maintenance is centered around sortie generation. It is the job of the maintainers to keep the aircraft in working condition so the pilots can conduct their missions.

> Aircraft maintenance often involves ordering parts for a job and those parts come in piecemeal; once all parts are on hand, we can conduct the maintenance action requiring those parts.  The downtime between receiving individual parts can be days, weeks, or months.  There is a lot of in-and-out in a parts cage at a maintenance squadron and parts frequently get misplaced.  To remedy this, I decided to create an Access database to better track parts received from supply, placed in our parts cage, and were awaiting maintenance actions, and those parts removed from the parts cage for installation on an aircraft.

> From there, the idea of incorporating QR codes into parts entered into the parts cage presented itself.  The idea being that any part large enough to fit a QR code could be so outfitted, with that QR containing all parts ordering information for the part in question to better enable personnel down range or at a different base to order parts before the arrival of a Maintenance Recovery Team (MRT).  This serves to cut down on "dead time" between the MRT arrival at the broken aircraft and the delivery of required parts; by the time the MRT gets on location, the needed parts are already ordered and on their way.

<br>

* * * * *

<br>

## <strong>PROJECT PLANNING:

#### <strong>Entity Relationship Diagram (ERD):
> ![ERD](https://i.imgur.com/teNQ9pP.png)

* * * * *

#### <strong>ERD Elaboration (Psuedo Code):
> ![ERD_Elaboration](https://i.imgur.com/8GIu9Fm.png)

* * * * *

#### <strong>Server Notes (Sheet, Table, Field Relationships):
> ![Server_Notes](https://i.imgur.com/qCH7iyw.png)

* * * * *

#### <strong>Logic Tree:
> ![Logic_Tree](https://i.imgur.com/2ms1TJR.png)

* * * * *

## <strong>Project Status Breakdown:

<br>

> 30 June
>> ![Project_Status](https://i.imgur.com/fmJPcK3.png)

<br>

> 5 July
>> ![Project_Status_2](https://i.imgur.com/yQMBjKO.png)

<br>

* * * * *

## <strong>Project Wireframe:

<br>

> Login Screen
>> ![Login_Screen](https://i.imgur.com/pPGjQb4.png)

> Logged In Screen
>> ![Logged_In](https://i.imgur.com/XLDuuQu.png)

> Sheets Screen, Main
>> ![Parts_Inv](https://i.imgur.com/gCnIu19.png)

> Sheets Screen, New & Edit Item
>> ![New_Edit](https://i.imgur.com/sWbRcEu.png)

> Sheets View, Entry Created
>> ![Entry_Created](https://i.imgur.com/dCdXD2j.png)

> Sheets View, Filter
>> ![Sheets_Filtered](https://i.imgur.com/4gup0PL.png)

> Sheets View, Edit Sheet
>> ![Sheets_Edit](https://i.imgur.com/EXSe0K7.png)

> Sheets View, Options Menu
>> ![Sheets_Options](https://i.imgur.com/auSOubO.png)

> AFTO 350/Due In For Maintenance (DIFM):
>> ![AFTO_350](https://i.imgur.com/8jycIEw.png)

> User Access Screen
>> ![User_Access](https://i.imgur.com/2QGkxi2.png)

> User Account Screen
>> ![User_Account](https://i.imgur.com/pjInHAC.png)

> Where we kept Daniel Salazar
>>![Circle_Daniel](https://i.imgur.com/xdKdgRN.png)

<br>

* * * * *

<br>

## <strong>Install Required Dependencies:

<br>

Install Router package
> npm install react-router-dom

<br>

Install styled components
> npm install --save styled-components

<br>

Install Cypress for unit testing
> npm install --save-dev cypress @testing-library/cypress

<br>

Install React testing library
> npm install --save-dev @testing-library/react

<br>

Install Mock Service Worker (MSW) for mock testing
> npm install msw
