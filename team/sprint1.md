# Sprint 1 - *T10* - *finiteLoop*

## Goal

### Distance Calculator!
### Sprint Leader: *Jack Fitzgerald*

## Definition of Done

* Web application deployed on the production server (black-bottle.cs.colostate.edu).
* Version in server/pom.xml should be `<version>1.0</version>`.
* Product Increment release `v1.0` created on GitHub.
* Sprint Review and Retrospectives completed (sprints/sprint#.md).

## Policies

* All commits include a task/issue number.
* Someone else approves and merges commits, you may not merge your own changes.
* No commits to master

## Plan

Epics planned for this release.

* *TripCo: The application should identify the client and server*
* *TripCo: use a standard logging system on the server*
* *User: I want to compute the distance between two locations on the planet*
* *User: I'd like to know who to thank for this tool*
* *User: I want to know where I am on the map*
* *User: I may need distances in other units of measure Epic*

## Review

#### Completed epics in Sprint Backlog
*  *TripCo: The application should identify the client and server currently in use #30.*: The server should be working and
            deployed for Sprint1.        
* *User: I'd like to know who to thank for this #35.*: About page was created and group information was added.
* *TripCo: use a standard logging system on the server #29*: toString() methods were added to TIPDistance and TIPConfig.
* *User: I want to compute the distance between two locations on the planet #34*: Distance calculator was implemented with the Haversine formula.
* **

#### Incomplete epics in Sprint Backlog
* *User: I want to know where I am on the map #33*: not enough practice with this API so far to avoid a brute force
         approach and degrade user experience.
* *User: I may need distances in other units of measure Epic #32*: We were not able to save the user's unit of measure
* **

#### What went well
* We finished this Sprint with plenty of time to spare.
* The epics were usually easy to understand and when they were not, we were able to talk through it.
* Good communication about issues in Slack and daily Scrum.
* **

#### Problems encountered and resolutions
* Attempting to do the geolocation Epic just ended up wasting time. 
* Unfamiliar with new tools. Resolved by studying code from other files and reading guides.


## Retrospective

#### What went well
* Our group was able to communicate effectively, which made completing tasks/epics easier and quicker.
* We followed proper github etiquette and our policies. Overall we were cohesive on github and worked well together.
* **

#### Potential improvements
* We will work to improve on deciding which tasks we can and will take on during the planning phase and making more reasonable
estimates for issues.
* Better use of ZenHub by updating the epics during the sprint actively and use estimates to prioritize tasks related to epics.
* **

#### What we will change next time
* Active use of ZenHub for project planning
* We should create a basic plan for the entire sprint from the beginning.
