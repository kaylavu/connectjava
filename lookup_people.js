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

var myArgs = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result)
    //console.log(result.rows[0].number); //output: 1
    client.end();
  });
});

console.log("Searching...")

// client.query("SELECT * FROM famous_people where first_name = ($1)", myArgs, (err,result) => {
//   if (err) {
//     return console.error("error running query", err); 
//   }
// //console.log(result.rows)
// console.log(`Found ${result.rows.length} person(s) by the name ${myArgs}: `) 
//   let index = 1;  
//   result.rows.forEach(function(person) {
//     console.log(`${index}:${person.first_name} ${person.last_name}, born ${person.birthdate.getFullYear()}-${person.birthdate.getMonth()+1}-${person.birthdate.getDate()}`);
//     index ++;  
//   })
// })


var getPeopleByName = (names,cb) => { 
cb(names) 
}

var printHello = (listOfNames) => {
  listOfNames.forEach(function(name) {
    console.log('Hello '+ name)
  })
}

var namesList = ["person1", "person2"]

getPeopleByName(namesList,printHello)


function getPersonByName(name,cb) {
  console.log(name);
  client.query("Select * FROM famous_people where first_name = ($1)", [name], (err,result) => {
    if (err) {
      return console.error("error running query", err)
    }
    cb(result.rows, name)
  })
}

function printNames(names, name) {
  //console.log(names); 
  console.log(`Found ${names.length} person(s) by the name ${name}: `) 
  names.forEach((person, index) => {
    console.log(`${index + 1}:${person.first_name} ${person.last_name}, born ${person.birthdate.getFullYear()}-${person.birthdate.getMonth()+1}-${person.birthdate.getDate()}`);  
  })
}


getPersonByName(myArgs[0],printNames); 
