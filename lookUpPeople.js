// CREATE TABLE famous_people (
//     id BIGSERIAL PRIMARY KEY,
//     first_name VARCHAR(50),
//     last_name VARCHAR(50),
//     birthdate DATE
//   );

// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Abraham', 'Lincoln', '1809-02-12');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Mahatma', 'Gandhi', '1869-10-02');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Rudd', '1969-04-06');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Giamatti', '1967-06-06');

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});



client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching...")
  const name = process.argv[2];
  const sqlQuery = `SELECT * from famous_people WHERE first_name = '${name}'`;

  client.query(sqlQuery, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name of '${name}'`)
    // process.argv[2]
    result.rows.forEach(function(object){
      console.log(`- ${object.id}: ${object.first_name} ${object.last_name}, born ${object.birthdate}`)
    })
    // console.log(result.rows)
    // console.log(result.rows[0].number); //output: 1
    client.end();
  });
});