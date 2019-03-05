# Sprint 3 - *T10* - *finiteLoop*

## Goal

### Shorter trips to more places!
### Sprint Leader: *Jonathan Perea*

## Definition of Done

* Version in pom.xml should be `<version>3.0.0</version>` for your final build for deployment.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Increment `server-3.0.jar` deployed for testing and demonstration on SPRINT3 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint3.md).


## Policies

#### Mobile First Design!
* Design for mobile, tablet, laptop, desktop (in that order).
* Use ReactStrap for a consistent interface (no HTML, CSS, style, etc.).
* Must adhere to the TripCo Interchange Protocol (TIP) for interoperability and testing.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Code Coverage above 40%
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits include a task/issue number.
* All commits include tests for the added or modified code.
* All tests pass.
#### Continuous Integration / Delivery 
* Master is never broken.  If broken, it is fixed immediately.
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

This sprint will complete the following Epics.

* *#32 User: I may need distances in other units of measure*

        * Let the user configure other units of measure for distance from the user interface.
    
* *#100 User: Show me a map and itinerary for my trip*
    
        * My itinerary is in a file created by a tool. The file format is described somewhere (tip.md).
        * I should be able to load the itinerary from a file.
        * I'd like to see the leg and cumulative distances at each stage in the itinerary.
        * I'd like to see an interactive map showing my entire trip on the screen.
        * I'd like to be able to choose what to display for each destination in the itinerary.
        * I'd like to save the itinerary with the leg distances to a file for future reference or use in another tool. - The new file should maintain the original values for the latitude and longitude.
    
* *#89 User: It would be nice to see a map with the calculator.*

        * Add markers for origin and destination
        * Validate input
        
* *#162 User: Make my trip shorter*

        * Allow an optional optimization.
        * Use the nearest neighbor algorithm to shorten the trip.
        
* *#166 User: Data shouldn't go away when I change tabs.*

        * it's not just the calculator anymore.

        

#### Discussion for Plan

We planned on doing 5 epics this sprint. For epic #32, we need to add the option
to allow the user to pick the units they wish to use. For epic #100, we plan to
finish adding options to the table and adding a save button to save
the file. In #89, we plan to add the markers for origin and destination
and validate the user input before adding a marker to the map. We plan to do
the epics #162, #166.


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *value* | *value* |
| Tasks |  *value*   | *value* | 
| Story Points |  *value*  | *value* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* | *none* | 


## Review (focus on solution and technology)

In this sprint, ...

#### Completed epics in Sprint Backlog 

These Epics were completed.

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* *## epic title: explanation*
*

#### What went well

The ...


#### Problems encountered and resolutions

The ...


## Retrospective (focus on people, process, tools)

In this sprint, ...

#### What we changed this sprint

Our changes for this sprint included ...

#### What we did well

We ...

#### What we need to work on

We could improve ...

#### What we will change next sprint 

We will change ...
