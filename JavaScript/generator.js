// for of loop for getting only value
let pastaNames = ["capellini", "fettuccine", "fusilli", "farfalle", "linguine", "macaroni", "orecchiette", "penne", "spaghetti"];
for (let pasta of pastaNames){
	console.log(pasta);
}


// Generator
function* shopping() {
	yield;
}

let generator = shopping();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
