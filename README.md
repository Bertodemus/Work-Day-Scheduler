# ORCHESTRATE
A simple hour-by-hour work day scheduler. This application runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

## Overview

* Scheduler design consists of: `index.html`, `style.css`, `bootstrap.css`, `script.js`, and `moment.js`
* Bootstrap 4 was utilized to create the layout

## Application Description

* When the application is loaded for the first time, the user will be met with a modal that gives them a description of the         software and an overview how to use the planner
* The initial view will open to the current hour block
* There are "hour blocks" where a task or appointment can be assigned
    * Three colors are used to indicate the state of each hour block
        * Gold indicates the current hour
        * Green indicates an upcoming hour block
        * Dark Gray indicates an hour block that has already passed (text entry is disabled)
    * Each hour block has a header that indicates the hour and whether or not there is an entry for this block.
* There are a few buttons to familiarize yourself with:
    * Clicking on the header of the hour block will expand or collapse the view
    * Gold diskette will save your entry
    * Crimson garbage can will delete your entry
    * The gold eye icons will perform an "At A Glance" view, which will open every hour block so that you can get an overview of         your entire day. Clicking the gold eye/"view status" icon again will collapse all of the hour blocks."
        * These icons also indicate an expanded or collapsed hour block
    * The "INFO" button at the bottom of the page will open the introductory modal 

## Bonus Features

* The user has the ability to remove entries
* Updated interface with collapsible entries
* Introductory modal with feature overview
* Time is actively updated

### Screenshots

![modal view](/images/modal.png)
![Initial view](/images/view1.png)
![Collapsed view](/images/view2.png)
![Expanded view](/images/view3.png)
