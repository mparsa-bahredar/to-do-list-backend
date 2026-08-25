Design of Task Management :


APIs :

/api/tasks
Method: GET, Success Status: 200, Failure Status: 500

/api/tasks/:id
Method: GET, Success Status: 200, Failure Status: 404

/api/tasks
Method: POST, Success Status: 201, Failure Status: 400

/api/tasks/:id
Method: PUT, Success Status: 200, Failure Status: 404

/api/tasks/:id
Method: PATCH, Success Status: 200, Failure Status: 404

/api/tasks/:id
Method: DELETE, Success Status: 200, Failure Status: 404


Structure :

TASK (project)/
---- node_modules/
---- src/
    ---- modules/
    ---- routes/
    ---- main.ts
---- DESIGN.md
---- package-lock.json
---- package.json



Data Structure :

{
  "id": "number",
  "title": "string",
  "completed": "boolean",
  "createdAt": "ISO string",
  "attachmentPath": "string (optional)"
}