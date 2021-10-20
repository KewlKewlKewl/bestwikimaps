Objectives today - Oct 15:
- Pick project:
  - Runner up options: Wiki Map, Todo list, Buy/sell
  - Wiki map: might have to worry about zooming, rendering. A lot of functionality to show.
  - Todo list: hard no from Aman ;). Maybe too many APIs
  - Buy/sell: probably most straight-forward
  - Decision: Wiki map!
- User stories
- Tech choices: stack, single page vs multi-page, routes
  - For things we can choose...
    - CSS preprocessor: SASS
    - CSS/UI: <tbd> probably flexbox, maybe bootstrap
  - SP vs MP:
    - decision: MP
  - Routes:
    - Navbar (not logged in):
      - Sign Up, Login
    - Navbar
    - get/: Navbar, footer, show all maps
    - get/login (display only)
    - post/login (display only)
    - post/logout (display only)
    - post/favourite
    - get/profile (put favourites here)
    - get/map/:id
    - post/createmap
    - post/map/:id/editmap
- Routes: How modular to make it?
  - follow template for now
- Organization of roles and structure
  - Faez: Github owner
  - Go with PP (database definitely) + Horizontal at start. Maybe vertical later on.
  - Backend then db then frontend
- Meeting Times, Weekend expectations, weekday expectations
  - Everyone always in discord
  - 9:30PT Meet in Discord
  - 5pmPT Check-in
  - Saturday try to take 5/6pm PT onwards off
  - Sunday night might go longer
  - Faez: will be gone Sat 6pm PT
  - Claudia: will be gone Thurs 5pm-8pm PT (will make up hours earlier on Thurs morning)
  - MVD/MVP due by Wednesday EOD, Thursday for extra styling stuff and presentation outline
- Communication
  - discord, slack
- Set up Git repo, + review Rohit's lecture on Git
  - 
- ERD

Objectives tomorrow - Oct 16:
- Wireframes
- MVD
- Detailed plan for what to do

Stretch:
- Hosting?

User stories:
"As a ___, I want to _, because ____."
"As a __, I shouldn't be able to _, because ___."
"as a user, when I go to ___ page and click ___, I should see __"
1. As a logged-in user, I want to see a list of maps of my own.
2. As a non-logged-in user, I can view a map that I select with multiple points (and have permission to view).
3. As a non-logged-in user, I can view maps that have many points (from the same set).
4. As a non-logged-in user, I can view each point on a map. Each point a title, description, and image.
5. As a logged-in user, I can view maps that I select with multiple points (Each point a title, description, and image.) eg, 5 different restaurants on a map
6. As a logged-in user, I can create maps with multiple points (Each point a title, description, and image.)
7. As a logged-in user, I can modify maps (add, edit, remove points).
8. As a logged-in user, I can favourite a map.
9. As a logged-in user, I can have a profile, indicating my favourite maps and my maps I have contributed to.

Neat/stretch:
1. As a logged-in user, I want to see maps belonging to my friends.
2. As a logged-in user, I can toggle different layers/overlays (that is, sets of maps).
