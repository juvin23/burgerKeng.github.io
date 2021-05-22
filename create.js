
window.onload = function(){
    // document.getElementById("CreateBtn").onclick = function() {
    //     document.getElementById("CreateBtn").submit();
    // }
    let BurgerSubmission = document.getElementById("BurgerSubmission");
    
    BurgerSubmission.addEventListener("submit", createBurger)
}

function createBurger(e){
    e.preventDefault();
    let burger = e.target;

    let bun = burger.elements["Bun"].value;
    let bunErr = "";
    let patty = burger.elements["Patty"].value;
    let pattyErr = "";
    let sauce = [];
    let sauceErr = "";
    let extras = [];
    let extrasErr = "";

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
    // let errMsg = [];
    let emptyMsg = "this field cannot be empty";
    let invalidMsg = "field invalid";
    if(bun === ""){
        bunErr = emptyMsg;
    }
    document.getElementById("bunErr").innerHTML = bunErr;

    
    // if(patty === ""){
    //     errMsg.push("bun : " +emptyMsg);
    // }
    // if(sauce.length === 0){
    //     errMsg.push("bun : " +emptyMsg);
    // }
    // if(extras.length === 0){
    //     errMsg.push("bun : " +emptyMsg);
    // }
    // if(errMsg.length > 0){
        
    // }
}