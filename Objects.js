const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return `${this.firstName} ${this.lastName}`;
      },
    'status': {
        marital: 'Single',
        employment: 'Employed'
    }

};

console.log(person.fullName());
console.log(person.age);
console.log(person['status'].marital);
console.log(person['status'].employment);
