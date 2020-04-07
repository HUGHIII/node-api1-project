const express = require("express");
const shortid = require("shortid");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} **\n`)
);

const users = [
  // id: "",
  // name: "",
  // bio: "",
];

server.post("/api/users", (req, res) => {
  const userBody = req.body;
  userBody.id = shortid.generate();

  users.push(userBody);
  const nameBioCondition =
    !userBody.name || !userBody.bio
      ? res.status(400).json({ errorMessage: "please provide bio and name" })
      : res.status(201).json(userBody);
  !nameBioCondition ? res.status(500).json({ error: "server error" }) : null;
});

server.get("/api/users", (req, res) => {
  !users
    ? res
        .status(500)
        .json({ error: "the users information could not be retrieved" })
    : res.status(202).json(users);
  console.log(users);
});

server.put("/api/users", (req, res) => {
  res.status(200).json({ url: "/api/users", operation: "put" });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // or we could destructure it like so: const { id } = req.params;
  res.status(200).json({
    url: `/api/users/${id}`,
    operation: `DELETE for user with id ${id}`,
  });
});

// example from api2 tk video==========================================================================

server.get("/hobbits", (req, res) => {
  console.log(req.query);
  // query string parameters get added to req.query
  const sortField = req.query.sortby || "id";
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee",
    },
    {
      id: 2,
      name: "Frodo Baggins",
    },
    {
      id: 3,
      name: "bilbo baggins",
    },
  ];

  // apply the sorting
  const response = hobbits.sort((a, b) =>
    a[sortField] < b[sortField] ? -1 : 1
  );

  res.status(200).json(response);
});

server.delete("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // or we could destructure it like so: const { id } = req.params;
  res.status(200).json({
    url: `/api/users/${id}`,
    operation: `DELETE for user with id ${id}`,
  });
});

// this request handler executes when making a POST request to /hobbits
// server.post('/hobbits', (req, res) => {
//   res.status(201).json({ url: '/hobbits', operation: 'POST' });
// });

// this request handler executes when making a PUT request to /hobbits
server.put("/hobbits", (req, res) => {
  res.status(200).json({ url: "/hobbits", operation: "PUT" });
});

// add this code right after const server = express();
// server.use(express.json());

let hobbits = [
  {
    id: 1,
    name: "Bilbo Baggins",
    age: 111,
  },
  {
    id: 2,
    name: "Frodo Baggins",
    age: 33,
  },
];
let nextId = 3;

// and modify the post endpoint like so:
server.post("/hobbits", (req, res) => {
  const hobbit = req.body;
  console.log(req.body);
  hobbit.id = nextId++;

  hobbits.push(hobbit);

  res.status(201).json(hobbits);
});
