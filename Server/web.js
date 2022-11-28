const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

//app.use(express.static('www'));
app.use(express.static('serveur'));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Quelque chose s'est cassé !");
  });

// pour mongodb version 3.0 et supérieure
const MongoClient = require('mongodb').MongoClient;
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};