const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'peliculas';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect( async function(err) {
  await assert.equal(null, err);
  console.log("Connected successfully to server");
  const db =  await client.db(dbName);

  const collection = await db.collection('peliculas');
  // Insert some documents
  await collection.deleteMany({});
  await collection.insertMany([
    { nombre  : "Harry Potter y la piedra filosofal",
      actor   : "Daniel Radcliffe",
      estreno : 2001
    }, 
    { nombre  : "Harry Potter y la cámara secreta",
      actor   : "Daniel Radcliffe",
      estreno : 2002
    }, 
    { nombre  : "Harry Potter y el prisionero de Azkaban",
      actor   : "Daniel Radcliffe",
      estreno : 2004
    },
    { nombre  : "Harry Potter y el cáliz de fuego",
      actor   : "Daniel Radcliffe",
      estreno : 2005
    },
    { nombre  : "Harry Potter y la orden del fénix",
      actor   : "Daniel Radcliffe",
      estreno : 2007
    },
  ]);

  collection.updateMany({}, { $set: { boxoffice: 0 } });

  collection.replaceOne(
    { nombre  : "Harry Potter y la piedra filosofal" },
    { nombre  : "Harry Potter y el misterio del príncipe",
      actor   : "Daniel Radcliffe",
      estreno : 2009
    }
  );

  let pelis = await collection.find({estreno : {$lt : 2006}}).toArray();
  console.log("Pelis estrenadas antes del 2006 : ---------------------------------------------------------------")
  console.log(pelis);

  collection.updateOne({nombre : "Harry Potter y la orden del fénix"}, {$unset : {boxoffice : ""}});


  pelis = await collection.find({}).toArray();
  console.log("Todas las pelis : ---------------------------------------------------------------")
  console.log(pelis);

  client.close();
});