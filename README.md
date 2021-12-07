WikiMaps
=========

Map sharing website that allows users to create, edit, delete and share maps of their favourites places and locations. Maps are generated using the Google Maps API and users can share these maps by sending the single map page url after the map has been created. Users can also login and favourite maps that other users have created. 

## Final Product

!["Main"]()

!["Profile"]()

!["Creating"]()

!["Viewing Map]()

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
9. Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`

## Dependencies

- Node.js 10.x or above
- Express
- cookie-session
- EJS
- NPM 5.x or above
- PG 6.x
- Morgan
- SASS
