class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, I'm ${this.firstName} ${this.lastName} and I'm ${this.age} years old.`);
  }
}

const person1 = new Person('John', 'Doe', 30);
person1.introduce();

const person2 = new Person('Alice', 'Smith', 25);
person2.introduce();
