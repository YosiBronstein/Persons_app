

let arrayOfPersons = [];

function Person(firstName, lastName, id, city, dateOfBirth, parentId) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.id = id;
  this.city = city;
  this.dateOfBirth = new Date(dateOfBirth); 
  this.parentId = parentId; 
  this.printPerson = () => {
    console.log(`${this.firstName}  ${this.lastName}  | id ${this.id}
    ${this.dateOfBirth.getDate()} ${
      this.dateOfBirth.getMonth() + 1
    } ${this.dateOfBirth.getFullYear()}  age: ${this.age}  `);
  };

  this.age = getAge(dateOfBirth);
}

let p1 = new Person(
  "Davad",//בשביל פולינדרום
  "Bavab",
  "123456789",
  "Jerusalem",
  "1972-4-21",
  null
);
let p2 = new Person(
  "Beny",
  "Feldman",
  "234567891",
  "Jerusalem",
  "1990-5-1",
  "123456789"
);
let p3 = new Person(
  "Avi",
  "Perez",
  "345678912",
  "Safed",
  "2000-10-11",
  "123456789"
);
let p4 = new Person(
  "Rivka",
  "Cohen",
  "456789123",
  "Haifa",
  "2005-6-23",
  "321987654"
);
let p5 = new Person(
  "Zaki",
  "Levi",
  "567891234",
  "Beit-Shemesh",
  "1995-9-5",
  "432198765"
);

arrayOfPersons = [p1, p2, p3, p4, p5];
//מכניס מילים לאובייקט
function inputWordToPerson(message) {
  let input = prompt(message);
  if (input === "" || input === null) {
    alert("please fill this field");
    input = inputWordToPerson(message);
  }
  if (isNumExists(input)) {
    alert("please letters only");
    input = inputWordToPerson(message);
    //return input;
  }
  return input;
}
//מכניס מספרים לאובייקט
function inputNumberToPerson(message) {
  let input = prompt(message);
  if (input === "" || input === null) {
    alert("please fill this field");
    input = inputNumberToPerson(message);
  }
  if (isLetterExists(input)) {
    alert("please numbers only");
    input = inputNumberToPerson(message);
    //return input;
  }
  return input;
}
function inputParentId(message) {
  let input = prompt(message);
  if (input === "" || input === null) {
    return (input = null);
  }
  if (ifPersonExistsById(input)) {
    return input;
  } else {
    alert("this id not exists in the system");
    input = inputParentId(message);
  }
  // if (isLetterExists(input)) {
  //   alert("please numbers only");
  //   input = inputNumberToPerson(message);
  // }
  return input;
}

//פונקציה שבודקת אם יש מספרים בקלט
function isNumExists(input) {
  for (i of input) {
    if (!isNaN(i)) return true;
  }
  return false;
}

//פונ שבודקת אם קיימים תווים חוץ ממספרים בקלט
function isLetterExists(input) {
  for (i of input) {
    if (isNaN(i)) return true;
  }
  return false;
}
//בדיקה אם קיים תעודת זהות במערכת
function ifPersonExistsById(id) {
  if (arrayOfPersons.some((v) => v.id === id)) return true;
  else return false;
}
function getPersonById(id) {
  let res = arrayOfPersons.find((v) => v.id === id);
  return res;
}
function getPersonByName(str) {
  let res;
  if (str === "" || str === null) return (res = []);
  else {
    res = arrayOfPersons.filter(
      (v) =>
        v.firstName.toLowerCase().includes(str.toLowerCase()) ||
        v.lastName.toLowerCase().includes(str.toLowerCase())
    );
    return res;
  }
}
function addPerson() {
  let tempPerson = new Person(
    inputWordToPerson("enter first name"),
    inputWordToPerson("enter last name"),
    inputNumberToPerson("enter id"),
    inputWordToPerson("enter city"),
    prompt(`enter birth day : month-day-year`),
    inputParentId("enter parent id")
  );
  if (!ifPersonExistsById(tempPerson.id)) arrayOfPersons.push(tempPerson);
  else alert("the person with this id is exists in system");
}


function deletePersonById(id) {
  if (ifPersonExistsById(id)) {
    if (isParent()) {
      let children = searchChildrenByParentId(id);
      for (v of children) {
        deletePersonById(v.id);
      }
    }
    arrayOfPersons.splice(arrayOfPersons.indexOf(getPerson(id)), 1);
  } else alert("this person is not exists");
}

function isParent() {
  if (arrayOfPersons.some((v) => v.parentId !== null)) {
    return true;
  } else {
    return false;
  }
}
function updatePersonById(id) {
  let updatePerson = getPerson(id);
  let tempPerson = new Person(
    inputWordToPerson("enter first name"),
    inputWordToPerson("enter last name"),
    updatePerson.id,
    inputWordToPerson("enter city"),
    updatePerson.dateOfBirth,
    inputParentId("enter parent id")
  );
  arrayOfPersons.splice(arrayOfPersons.indexOf(updatePerson), 1, tempPerson);
}
function searchPersonByAge(age) {
  let res = arrayOfPersons.filter((v) => v.age > age);
  return res;
}
function searchChildrenByParentId(id) {
  let res = arrayOfPersons.filter((v) => v.parentId === id);
  return res;
}
function getPerson(id) {
  return arrayOfPersons.find((p) => p.id == id);

  
}
function isMonthOfBirthIsDouble(id) {
  let person = getPersonById(id);
  if (person.dateOfBirth.getMonth() % 2 !== 0) return true;
}
function isMoreOfOneChildren(id) {
  let children = searchChildrenByParentId(id);
  if (children.length > 1) return true;
  else return false;
}
function isPollindromName(name) {
  let isPolindroom = false;
  for (let i = 0; i < name.length; i++) {
    if (name[i].toLowerCase() === name[name.length - (1+i)].toLowerCase()) isPolindroom = true;
    else isPolindroom = false;
  }
  return isPolindroom;
}
function searchPersonByCity(city) {
  res = arrayOfPersons.filter((v) => v.city === city);
  return res;
}

function getAge(dateString) {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}



function printPersonsByCity() {
  let citys = [];
  for (let i = 0; i < arrayOfPersons.length; i++) {
    if (!citys.includes(arrayOfPersons[i].city)) {
      citys.push(arrayOfPersons[i].city);
    }
  }
  for (let i = 0; i < citys.length; i++) {
    let res = searchPersonByCity(citys[i]);
    console.log(citys[i]);
    for (v of res) {
      console.log("  " + v.firstName + "  " + v.lastName);
    }
  }
}


let userChoice = 1;
while (userChoice !== "0" && userChoice !== null) {
  userChoice = prompt(`ברוכים הבאים למאגר מידע שלנו ,
    אנא בחר אפשרות:
    [1] – חיפוש אדם על פי תעודת זהות
    [2] – חיפוש אדם על פי שם או שם משפחה
    [3] – הוספת אדם
    [4] – מחיקת אדם
    [5] - עריכת אדם
    [6] - הצגת אנשים על פי ערים
    [7] - הצגת ילדים של אדם 
    [8] - הצגת אנשים מעל גיל הרצוי
    [9] - הצגת פולינדרום חודש זוגי והורה לפחות לשני ילדים
    [0] - יציאה`);

  switch (userChoice) {
    case "1": {
      let id = prompt("enter id");
      if (ifPersonExistsById(id)) {
        let tempPerson = getPersonById(id);
        tempPerson.printPerson();
      } else alert("this person not exists!!!");
      break;
    }
    case "2":
      let name = prompt("enter the first name or the last name");
      let tempPersons = getPersonByName(name);
      for (i of tempPersons) {
        i.printPerson();
      }
      break;
    case "3":
      addPerson();
      console.log(
        `the person ${arrayOfPersons[arrayOfPersons.length - 1].firstName} ${
          arrayOfPersons[arrayOfPersons.length - 1].lastName
        } added successful`
      );
      break;
    case "4":
      let tempId = prompt("enter id of person you want to delete");
      if(ifPersonExistsById(tempId)){
        let tempPerson = getPersonById(tempId);
        deletePersonById(tempId);
        alert(
          `${tempPerson.firstName} ${tempPerson.lastName} and his children were deleted successful`
        );
      }else alert("person not exists")
      break;
    case "5":
      {
        let id = prompt("enter id of person you want to update");
        updatePersonById(id);
        let tempPerson = getPersonById(id);
        tempPerson.printPerson();
      }
      break;
    case "6":
      {
        printPersonsByCity();
      }
      break;
    case "7":
      {
        let id = prompt("enter parent's id");
        if(ifPersonExistsById(id)){
          let persons = searchChildrenByParentId(id);
          for (i of persons) i.printPerson();

        }
      }
      break;
    case "8":
      {
        let age = prompt("enter minimal age");
        let persons = searchPersonByAge(age);
        for (i of persons) i.printPerson();
      }
      break;
    case "9": {
      arrayOfPersons.forEach((v) => {
        if (
          isMonthOfBirthIsDouble(v.id) &&
          isMoreOfOneChildren(v.id) &&
          isPollindromName(v.firstName) &&
          isPollindromName(v.lastName)
        )
        v.printPerson();
      });
    }
    break;
  }
}
