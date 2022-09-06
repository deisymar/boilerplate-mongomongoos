require('dotenv').config({ path: "./secrets.env"});
const mySecret = process.env['MONGO_URI'];
const express = require("express");

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URI);
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

/**2) Create model*/
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = (done) => {  
var regPerson = new Person({name: "Will Smith", age: 56, favoriteFoods: ["chocolate", "eggs", "fish", "fresh fruit"]});

  regPerson.save(function(err, data) {
    //console.log(data);
    if (err) return console.error(err);
    done(null, data)
  });
};
/** 4) Create many People with Model.create() */
var arrayOfPeople = [
  {name: "Juan Soler", age: 56, favoriteFoods: ["taco", "tole"]},
  {name: "Thalia", age: 51, favoriteFoods: ["posole", "gorditas"]},
  {name: "Frank Sinatra", age: 78, favoriteFoods: ["wine", "lasagna"]},
  {name: "Taylor Swift", age: 30, favoriteFoods: ["pizza de pepperoni", "sándwich reuben"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
/** 5) Use Model.find() */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
/** 6) Use Model.findOne() */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 7) Use Model.findById() */
const findPersonById = (personId, done) => {
   Person.findById({_id: personId}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/**8) Use find, edit and save traditional*/
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, personFound) => {
      if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
      personFound.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
      personFound.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
    })
  })  
};
/**9) update with model.findByIdAndUpdate()*/
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
   Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
};
/**10) use model.findByIdAndRemove() o model.findOneAndRemove()*/
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  );
};
/**11) use Model.remove()*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};
/**12) Chain aux .find(), .sort(), .limit(), .select(), and then .exec()*/
const queryChain = (done) => {
  const foodToSearch = "burrito";
  var findQuery = Person.find({favoriteFoods: foodToSearch});
  // Here: 1 for ascending	order and -1 for descending order.
  findQuery.sort({name:1})
    // return array which has 2 items in it.
        .limit(2)
    // .select({ name: 0, age: 1 }) Here: 0 means false and thus hide name property; 1 means true so age property will show.
        .select({age: 0})
        .exec((err, data) => {
          (err) ? done(err) : done(null, data);
        }) 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
