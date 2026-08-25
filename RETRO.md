Stage 1 Questions

1- Why might you split "routes" from "controllers" instead of writing logic directly in the route file?
Cleaner code, better separation of concerns, and easier to maintain.

2- If someone requests a task that doesn't exist, what should happen? What status code, and why not just 200?
404 Not Found because the resource does not exist.



Stage 2 Questions

1- Your API lives at /api/tasks and your static files are served at /files. How does Express decide which handler responds to a given request? What would happen if these two paths overlapped?
Express uses the first matching route in order.

2- If someone requests a file that doesn't exist in uploads/, what does express.static() do by default? Try it and observe.
Returns 404 Not Found.

3- Should the uploads/ folder be publicly listable (i.e. can someone see all filenames just by browsing)? What does that mean for how you name files?
No. Use unique filenames to prevent guessing.



Stage 4 Questions

1- What could go wrong with reading/writing a JSON file if two requests hit the server at nearly the same time? You don't need to solve this — just explain the risk in your own words.
Data corruption or data loss because both requests write at the same time.

2- Look back at your Stage 1 design. What did you get wrong or underestimate? Write a few honest sentences.
Nothing. My design was accurate and matched the implementation.