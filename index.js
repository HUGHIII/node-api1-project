const express = require("express");
 const shortid = require("shortid");
 const server = express();

 server.use(express.json());

 const PORT = 5000;
  server.listen(PORT, () =>
  console.log(`\n ** API running on http://localhost:${PORT} **\n`)
  );

  const users = [{
    id: "",
    name: "",
    bio: "",
  }];

  server.post('/api/users', (req,res) => {
      const userBody = req.body;
            userBody.id = shortid.generate();

                users.push(userBody);
                  const nameBioCondition =  (!userBody.name || !userBody.bio) ? 
                        res.status(400).json({errorMessage:'please provide bio and name'}): res.status(201).json(userBody); 
                        !nameBioCondition ? res.status(500).json({error:'server error'}): null
  });

  server.get('/api/users',(req,res)=> {
      !users ? res.status(500).json({error:'the users information could not be retrieved'}):res.status(202).json(users)
  })