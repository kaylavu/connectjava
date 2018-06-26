const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : settings.hostname,
      user : settings.user, 
      password : settings.password, 
      database : settings.database
    }
  });

// var myArgs = process.argv.slice(2);

// knex.select().from('famous_people').where('first_name', '=' , myArgs[0]).asCallback(function(err,rows) {
//     if (err) return console.error(err); 
//     printNames(rows,myArgs[0]); 
// })


// function printNames(names,name) {
//     //console.log(names); 
//     console.log(`Found ${names.length} person(s) by the name ${name}: `) 
//     names.forEach((person, index) => {
//       console.log(`${index + 1}:${person.first_name} ${person.last_name}, born ${person.birthdate.getFullYear()}-${person.birthdate.getMonth()+1}-${person.birthdate.getDate()}`);  
//     })
//   }

var personArgs = process.argv.slice(2)
console.log(personArgs); 

knex('famous_people').insert({first_name:personArgs[0], last_name:personArgs[1], birthdate:personArgs[2]}).asCallback(function(err,rows) {
    if (err) return console.error(err); 
    console.log(rows); 
})

knex.destroy(); 


