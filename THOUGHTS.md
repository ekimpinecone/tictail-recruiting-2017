cd into /app
npm install
npm start
CORS should be enabled on browser.
Using fetch() so IE won't be supported in this demo.
Using react-create-app for a quick build.

Colors pulled from Tictail site or random painted walls in Mexico City.

App.js will play the role of store for this quick spin up.

- For simplicity no css frameworks used, A micro version of skeleton would be best to spin up mobile quickly.
- Again for simplicity, no SASS used.
- I wanted to create info cards that were simple and easy to understand from a management side, but have the flexibility to have some fun with on a public-facing site.
- Editing should be easy and quick with the ability to validate your changes immediately.

Todos:
- Tests
- Sanitize and validate fields
- Alert users when errors/success happened
- Get stateless functions out of the way
- Every filed should have a filter.
- Move state into a proper store, get logic out of components.
- Add new member component
- Toggle View to demo public/private views
- Handle Nulls
- Avoid components from shifting when opening up expanded window
- Create seating chart web
- Mobile
- Import SASS
- Pretty up expanded view... a lot.
- Sort by color
- Pretty up (much wow)
- Handle Null fields
