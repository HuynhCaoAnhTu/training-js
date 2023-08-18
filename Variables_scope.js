function functionScopeExample() {
  if (true) {
    var x = 10; // 'x' has function scope
    const y = 10; // 'y' has block scope
  }
  console.log(x); // Output: 10 (Prints 'x' because of function scope)
  console.log(y); // Error: 'y' declared on line 4 column 9 is used outside of binding context
}

functionScopeExample();
