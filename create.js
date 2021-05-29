let $emptyMsg = "this field cannot be empty";
let $invalidMsg = "field invalid";

window.onload = function(){
    let BurgerSubmission = document.getElementById("BurgerSubmission");
    
    BurgerSubmission.addEventListener("submit", createBurger)
}

function createBurger(e){
    e.preventDefault();
    let burger = e.target;

    let bun = burger.elements["Bun"].value;
    let patty = burger.elements["Patty"].value;
    let sauce = [];
    let extras = [];

    let temp = burger.elements["Sauce"]; 
    temp.forEach(element => {
        if (element.checked) {
            sauce.push(element.value);
        }
    }); 

    temp = burger.elements["Extras"];
    temp.forEach(element => {
        if (element.checked) {
            extras.push(element.value);
        }
    }); 

    let bunErr = pattyErr = sauceErr = false;
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
    if(bunErr || pattyErr || sauceErr) return;

    document.getElementById("baseBunImg").innerHTML = "<img src=\"imgs/ingredient/bun/BaseBun.png\">";
    document.getElementById("pattyImg").innerHTML = "<img src=\"imgs/ingredient/patty/" + patty + ".png\">";
    document.getElementById("topBunImg").innerHTML = "<img src=\"imgs/ingredient/bun/TopBun.png\">";
    
    extras.forEach(ex => {
        if(ex !== "ExtChilli")document.getElementById("extrasImg").innerHTML += "<div><img src=\"imgs/ingredient/" + ex + ".png\"></div>";
    });

    document.getElementById("sauceChoice").innerHTML += "Sauce Of Choice<ul>";
    sauce.forEach(sa =>{
        document.getElementById("sauceChoice").innerHTML += `
            <li>${sa}</li>
        `
    });
    document.getElementById("sauceChoice").innerHTML +="</ul>";
}