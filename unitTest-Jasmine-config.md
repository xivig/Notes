# Setup Jasmine testing framework

1. Run the following commands:
```
    mkdir jasmine-project // making a directory named jasmine-project
    
    cd jasmine-project // going to the project directory named jasmine-project
    
    npm install jasmine -g // installing jasmine globally
    
    jasmine init 
    // initialize the jasmine framework and it will create directory 'spec'
    
    touch spec/test.spec.js 
    // making a file in the spec directory named test.spec.js as jasmine will lookup a file named *.spec.js for its testing purpose

    vim spec/test.spec.js // open the file in the bash shell and hit the insert key and type the following codes:
```

2. 
```js

    function sayHi(greet){
    return "hi " + greet;
}

describe( "Greeting  test", function() {
  it( "Say hi to Alex", ()=>{
    expect(sayHi("Alex")).toBe("hi Alex");
  });
  it( "Should fail", ()=>{
    expect(false).toBe(false);
  });
});
```

3. Now follow this

    1. hit esc key
    2. :
    3. wq
    4. enter

Now you are done.

4. now run 
`$ jasmin`

You will get the following output:
```
Randomized with seed 37006
Started
..


2 specs, 0 failures
Finished in 0.006 seconds
Randomized with seed 37006
```

5. Now you have run your first jasmine test

Explanation of jasmine: it contains
    1. describe('name of test', callback) block
    2. it('message', callback) block
    3. console output 

```js
describe('name of test', () =>{
    it('message',()=>{
        // just the console log ot the meassage
        console.log("Jasmine test");
    });
});
```

6. Sample jasmine test code with hooks

```    
// define a calculator class
class Calculator{
    sum(a, b){
        return a+b;
    }
    sub(a, b){
        return a-b;
    }
    mul(a, b){
        return a*b;
    }
    div(a, b){
        return a/b;
    }

    desc(){
        return "This is Simple calculator class";
    }
}

describe('Calculator operation test', () =>{
    // Hooks run before any of the test
    beforeAll(function(){
        console.log("Before all hooks");
    });
    // After all hooks
    afterAll(function(){
        console.log("After all hooks");
    });
    // Before each hooks
    beforeEach(function(){
        console.log("Before each hooks");
    });
    // After each hooks
    afterEach(function(){
        console.log("After each hooks");
    });

    // Now we have have to instantiate the class
    let calculator = new Calculator();
    it('Calculator class should be declared',()=>{
        expect(calculator).toBeDefined();
        expect(calculator).not.toBeUndefined();
        expect(calculator).not.toBeNull();
    });
    it('Description should be there',()=>{
        expect(calculator.desc()).toMatch('class');
        expect(calculator.desc()).toContain('calculator');
    });



    it('Add 2 and 3',()=>{
        console.log(calculator.sum(2, 3));
        // expect is like a
        expect(calculator.sum(2, 3)).toBe(5);
        expect(calculator.sum(2, 3)).not.toBe(4);
        expect(calculator.sum(2, 3)).toEqual(5);
        expect(calculator.sum(2, 3)).toBeLessThan(6);
        expect(calculator.sum(2, 3)).toBeGreaterThan(3);
        expect(calculator.sum(2, 3)).not.toBeGreaterThan(6);

    });
    it('substract 2 from 3 ',()=>{
        console.log(calculator.sub(3, 2));
        expect(calculator.sub(3, 2)).toBe(1);

    });
    it('multiply 2 and 3 ',()=>{
        console.log(calculator.mul(2, 3));
        expect(calculator.mul(2, 3)).toBe(6);
    });
    it('divide 2 by 3 ',()=>{
        console.log(calculator.div(2, 3));
        expect(calculator.div(2, 3).toFixed(3)).toBe('0.667');
    });
});
```