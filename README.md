**JS Project Proposal**

Portuguese Oceanic Trade Routes Data Visualization


**Background**

Portuguese oceanic trade routes involve geographic data, maritime data, and trade data.

This project is to visualize such data with regards to the trade routes on a globe, using d3-geo and d3.js, and to provide UI for users to interact with such data.


**Functionality & MVPs**

With this Portuguese Oceanic Trade Routes Data Visualization App, users will be able to:

    Select a specific destination country

    Start, pause, and resume the journey of a trade from Portugal to that specific destination country
    
    Select a specific stop along the route, and browse data with regards to that specific stop
    
    Browse collective data with regards to the selected trade route

In addition, this project will include:

    An About modal describing the background and user instructions
    A production README


**Wireframes**

![alt text](https://github.com/qyhAppAcademy/portuguese_oceanic_trade_routes_data_visualization/blob/main/wireframe.png)

    On the left, there will be an interactive globe to display the Portuguese oceanic trade routes.

    On the right, there will be a control section for selecting specific data with regards to a trade route.

    Below the control section, there will be a display section for the collective data with regards to the selected route.


**Technologies, Libraries, APIs**

This project will be implemented with the following technologies:

    d3-geo to render the globe and trade routes

    d3.js to display trade routes data
    
    Webpack and Babel to bundle and transpile the source JavaScript code
    
    npm to manage project dependencies


**Implementation Timeline**

    Friday & Weekend: Setup project, getting webpack up and running. Get the global to show up on the screen, and spend time getting comfortable with d3-geo. Render trade routes on the global.

    Monday: Create interactive functions on the global to enable users to explore trade routes in detail, such as allowing users to click on a specific stop on the route, and displaying data with regards to that stop after being selected.

    Tuesday: Spend time getting comfortable with D3.js. Use D3.js to display collective data with regards to the selected trade route, based on the input from the control section.

    Wednesday: Continue working on the project if it is not complete. If complete, improve upon the UI.

    Thursday Morning: Deploy to Github pages. If time, rewrite this proposal as a production READEME.