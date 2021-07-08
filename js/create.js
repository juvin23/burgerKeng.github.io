let $emptyMsg = "this field cannot be empty";
let $invalidMsg = "field invalid";

$('document').ready(main);
    
function main(){
    let BurgerSubmission = document.getElementById("BurgerSubmission");
    
    BurgerSubmission.addEventListener("submit", createBurger)
}

const CART_KEY = "CART_STORAGE";
let burgerPrice = 15000;
let burgerName = "";

function addCart(id){
    const storage = getLocal(CART_KEY);
    const newItem = {id:"Custom", cat:'Burger', name: burgerName ,price: burgerPrice, img :"imgs/Product/SideDish/custom.png"};
    if(!storage){

        newItem.total = 1;
        setLocal(CART_KEY,[newItem]);
        return;
    }else{
        const exist = storage.find(key =>{
            if(key.id === id) return key.total++;
        })
        if(!exist){
            newItem.total = 1;
            storage.push(newItem);
        }
        setLocal(CART_KEY,storage);
    }

}

function setLocal(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}


function getLocal(key){
    return JSON.parse(localStorage.getItem(key));
}

function createBurger(e){
    e.preventDefault();
    let burger = e.target;

    let bun = burger.elements["Bun"].value;
    console.log("Bun Selected : " + bun)
    let patty = burger.elements["Patty"].value;
    let sauce = [];
    let extras = [];

    let temp = burger.elements["Sauce"]; 
    temp.forEach(element => {
        if (element.checked) {
            sauce.push(element.value);
            burgerPrice+=5000;
        }
    }); 

    temp = burger.elements["Extras"];
    temp.forEach(element => {
        if (element.checked) {
            extras.push(element.value);
            burgerPrice+=5000;
        }
    }); 

    let bunErr = pattyErr = sauceErr = nameErr = false;
    if(burger.name.value === ""){
        nameErr = true;
        document.getElementById("nameErr").innerHTML = $emptyMsg;
    }else{
        nameErr = "";
        burgerName = burger.name.value;
        document.getElementById("nameErr").innerHTML = "";
    }

    if(bun === ""){
        bunErr = true;
        document.getElementById("bunErr").innerHTML = $emptyMsg;
    }else{
        bunErr = false;
        document.getElementById("bunErr").innerHTML = "";
    }
    
    if(patty === ""){
        pattyErr = true;
        document.getElementById("pattyErr").innerHTML = $emptyMsg;
    }else{
        bunErr = false;
        document.getElementById("pattyErr").innerHTML = "";
    }

    if(sauce.length === 0){
        sauceErr = true;
        document.getElementById("sauceErr").innerHTML = $emptyMsg;
    }else{
        bunErr = false;
        document.getElementById("sauceErr").innerHTML = "";
    }
    if(nameErr || bunErr || pattyErr || sauceErr) return;

    document.getElementById("baseBunImg").innerHTML = "<img src=\"imgs/ingredient/bun/"+ bun +"BaseBun.png\">";
    document.getElementById("pattyImg").innerHTML = "<img src=\"imgs/ingredient/patty/" + patty + ".png\">";
    if(patty === "Chicken")burgerPrice += 13000;
    else if(patty === "Beef")burgerPrice += 16000;
    else burgerPrice += 14000;
    document.getElementById("topBunImg").innerHTML = "<img src=\"imgs/ingredient/bun/"+ bun +"TopBun.png\">";
    
    document.getElementById("extrasImg").innerHTML="";
    extras.forEach(ex => {
        if(ex !== "ExtChilli")document.getElementById("extrasImg").innerHTML += "<div><img src=\"imgs/ingredient/" + ex + ".png\"></div>";
    });

    document.getElementById("sauceChoice").innerHTML = "";
    document.getElementById("sauceChoice").innerHTML += "Sauce Of Choice<ul>";
    sauce.forEach(sa =>{
        document.getElementById("sauceChoice").innerHTML += `
            <li>${sa}</li>
        `
    });
    document.getElementById("sauceChoice").innerHTML +="</ul>";
    
    if(!(document.getElementById('addButton')))$('#preview').append(
        '<button class="button" id="addButton" onClick = addCart("CustomBurger") style="padding: 10px;align-items: center">Add to Cart</button>'
    )
}
