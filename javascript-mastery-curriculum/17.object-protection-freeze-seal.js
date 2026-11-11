// 1- using the Object constructor 
(function () {
    // create a new object
    let createObj = new Object();

    // adding property to the object
    createObj.name = 'Bandhu';
    createObj.age = 30;
    createObj.gender = 'male';
    console.log(createObj);
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = new Object({
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
    });
    console.log(createObj);
})();

// 2- using an object literal
(function () {
    // create a new object
    let createObj = {};

    // adding property to the object
    createObj.name = 'Bandhu';
    createObj.age = 30;
    createObj.gender = 'male';
    console.log(createObj);
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
       name: 'Bandhu',
       age: 30,
       gender: 'male',
    };
    console.log(createObj);
    console.log("name" in createObj); //	true
    console.log("age" in createObj); //	true
    console.log("title" in createObj); //	false
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    console.log("sayHello" in createObj); //	true
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    console.log("name" in createObj); //	true
    console.log(createObj.hasOwnProperty('name')); //	true
    console.log("toString" in createObj); 
    //	true as the toString() method is present in Object.prototype
    console.log("toString" in Object.prototype); 
    //	true as the toString() method is present in Object.prototype
    console.log(createObj.hasOwnProperty('toString')); //	false
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    console.log(createObj);
    delete createObj.gender;
    console.log("gender" in createObj); //	false
    console.log(createObj.gender); //	undefined
    console.log(createObj);
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };

    for (let prop in createObj) {
        console.log("Name: " + prop);
        console.log("Value: " + createObj[prop]);
        // or console.log("Value: " + createObj.prop);
    }

})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    let prop = Object.keys(createObj);
    console.log(prop); //[ 'name', 'age', 'gender', 'sayHello' ]
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    let prop = Object.keys(createObj);
    // if we want to mimic for...in behavior
    for (let i = 0; i < prop.length; i++) {
        console.log("Name: " + prop[i]);
        console.log("Value: " + createObj[prop[i]]);
    }

})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        name: 'Bandhu',
        age: 30,
        gender: 'male',
        sayHello: function () {
            console.log(`Hi, ${this.name}!`);
        }
    };
    console.log("name" in createObj); //true
    console.log(createObj.propertyIsEnumerable("name")); //true

    let prop = Object.keys(createObj);
    console.log("length" in prop); //true
    console.log(createObj.propertyIsEnumerable("length")); //false

})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        _name: 'Bandhu',
        get name() {
            console.log('Reading name');
            return this._name;
        },
        set name(newValue) {
            console.log("Setting name to %s", newValue);
            this._name = newValue;
        }
    };
    console.log(createObj);
    console.log(createObj.name); // "Reading name" then "Bandhu" 
    createObj.name = "Xivig";
    console.log(createObj.name);
    /* 
    Setting name to Xivig
    Reading name
    Xivig 
    */

})();

(function () {
    let createObj = {
        name: "Bandhu"
    };
    Object.defineProperty(createObj, 'name', {
        enumerable: false
    });
    console.log("name" in createObj); //true
    console.log(createObj.propertyIsEnumerable('name')); //false
    let prop = Object.keys(createObj);
    console.log(prop.length);

    Object.defineProperty(createObj, 'name', {
        configurable: false
    });
    // try to delete the non-configurable property
    // delete createObj.name; 
        //TypeError: Cannot delete property 'name' of #<Object>

    console.log("name" in createObj); //true
    console.log(createObj.name); //true

    /*   
    Object.defineProperty(createObj, 'name', {
          configurable: true
    });
    */ 
    // TypeError: Cannot redefine property: name
})();

(function () {
    var createObj = {};
    Object.defineProperty(createObj, "name", {
        value: "Bandhu"
    });

    console.log("name" in createObj); // true 
    console.log(createObj.propertyIsEnumerable("name")); // false 
    // delete createObj.name;
    console.log("name" in createObj); // true 
    // createObj.name = "Xivig";
    console.log(createObj.name);
})();

(function () {
    // The above can be done in a single step
    // create a new object
    let createObj = {
        // adding property to the object
        _name: 'Bandhu'
    }
    Object.defineProperty(createObj, 'name', {
        get name() {
            console.log('Reading name');
            return this._name;
        }
    });
    console.log(createObj);
    console.log(createObj.name); // "Reading name" then "Bandhu" 
    // createObj.name = "Xivig"; 
    // TypeError: Cannot assign to read only property 'name' of object
    console.log(createObj.name);
    // undefined
})();

(function () {
    let createObj = {};
    Object.defineProperties(createObj, {
        // data property to store data 
        _name: {
            value: "Bandhu",
            enumerable: true,
            configurable: true,
            writable: true
        },
        // accessor property
        name: {
            get: function () {
                console.log("Reading name");
                return this._name;
            },
            set: function (value) {
                console.log("Setting name to %s", value);
                this._name = value;
            },
            enumerable: true,
            configurable: true
        }
    });
    console.log(createObj);
    console.log(createObj.name); // "Reading name" then "Bandhu" 
})();

(function () {
    let createObj = {
        name: "Bandhu"
    };
    let descriptor = Object.getOwnPropertyDescriptor(createObj, "name");
    console.log(descriptor.enumerable); //	true
    console.log(descriptor.configurable); // true
    console.log(descriptor.writable); // true
    console.log(descriptor.value); // "Bandhu"
})();

(function () {
    let createObj = {
        name: 'Bandhu'
    }

    console.log(Object.isExtensible(createObj));
    Object.preventExtensions(createObj);
    console.log(Object.isExtensible(createObj));
    /*  createObj.sayHello = function () {
         console.log(`Hi, $this.name}!`)
     } // TypeError: Cannot add property sayHello, object is not extensible */
    console.log("sayHello" in createObj)

})();

(function () {
    let createObj = {
        name: "Bandhu"
    }
    console.log(Object.isExtensible(createObj)); // true
    console.log(Object.isSealed(createObj)); // false
    Object.seal(createObj);
    console.log(Object.isExtensible(createObj)); // false
    console.log(Object.isSealed(createObj)); // true
    /* createObj.sayHello = function(){
        console.log(`Hi, ${this.name}`);
    } */ //TypeError: Cannot add property sayHello, object is not extensible
    console.log("sayHello" in createObj); // false
    createObj.name = 'Xivig';

    // delete createObj.name; // TypeError: Cannot delete property 'name' of #<Object>
    console.log("name" in createObj); //	true
    console.log(createObj.name); // Xivig
    let descriptor = Object.getOwnPropertyDescriptor(createObj, "name");
    console.log(descriptor.configurable); // false

})();


(function () {
    let createObj = {
        name: "Bandhu"
    }
    console.log(Object.isExtensible(createObj)); // true
    console.log(Object.isSealed(createObj)); // false
    console.log(Object.isFrozen(createObj)); // false
    Object.freeze(createObj);
    console.log(Object.isExtensible(createObj)); // false
    console.log(Object.isSealed(createObj)); // true
    console.log(Object.isFrozen(createObj)); // true
    /* createObj.sayHello = function(){
        console.log(`Hi, ${this.name}`);
    }*/ //TypeError: Cannot add property sayHello, object is not extensible
    console.log("sayHello" in createObj); // false
    // createObj.name = 'Xivig'; 
    //TypeError: Cannot assign to read only property 'name' of object '#<Object>'

    // delete createObj.name; 
    // TypeError: Cannot delete property 'name' of #<Object>
    console.log("name" in createObj); //	true
    console.log(createObj.name); // Bandhu
    let descriptor = Object.getOwnPropertyDescriptor(createObj, "name");
    console.log(descriptor.configurable); // false
    console.log(descriptor.writable); // false

})();

