require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    { dbName: "freecodecamp" }
  )
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.error("failed to connect database", error));

// ==== 1 create a model
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// ==== 2 create and save person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Sushi"],
  });

  person.save(function (error, result) {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

// === 3 create many people

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      done(null, result);
    }
  });
};

// === 4 find people by name

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      done(null, result);
    }
  });
};

// === 5 find one people by food

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      done(null, result);
    }
  });
};

// ==== 6 Find Person by Id
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      done(null, result);
    }
  });
};

// === 7 Find the Person and update ;

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      result.favoriteFoods.push(foodToAdd);

      result.save((errs, data) => {
        if (errs) console.log(errs);
        else console.log("updated", data);
        done(null, data);
      });
    }
  });
};

// ===== 8 findone and update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("udpated by age", result);
        done(null, result);
      }
    }
  );
};

//
const removeById = (personId, done) => {
  Person.findByIdAndDelete({ _id: personId }, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log("person removed", result);
      done(null, result);
    }
  });
};

// === remove all people
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      done(null, result);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({name:1})
    .limit(2)
    .select({name:true})
    .exec(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        done(null, result);
      }
    });
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
