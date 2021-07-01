$('document').ready(main)

const CART_KEY = "CART_STORAGE";
const ORDER_KEY = "ORDER_STORAGE";

function main(){
    let orderForm = document.getElementById('orderForm');
    orderForm.addEventListener("submit", order);
}
function isNumeric(s){
    let num =['0','1','2','3','4','5','6','7','8','9','0'];

    for(i = 0;i<num.length;i++){
        if(s === num[i]) return true;
    }
    return false;
}

function validate(e){
    let form = e.target;
    let name = form.elements['orderName'].value.trim();
    let lastName = form.elements['orderLastName'].value.trim();
    let email = form.elements['orderEmail'].value.trim();
    let phone = form.elements['orderPhone'].value.trim();
    let address = form.elements['orderAddress'].value.trim();


    const $validMsg = "enter a valid data";
    let nameErr = emailErr = lastNameErr = addressErr = phoneErr = false;
    // Name
    if(name === ""){
        nameErr = true;
    }
    var temp = name.toLowerCase();
    if(temp.includes("script")){
        nameErr = true;
    }
    if(lastName === ""){
        lastNameErr = true;
    }
    temp = lastName.toLowerCase();
    if(temp.includes("script")){
        nameErr = true;
    }
    //email
    if(email === ""){
        emailErr = true;
    }else{
        temp = email.toLowerCase();
        if(temp.includes("script")){
            emailErr = true;
        }

        let prefix = email.split("@");
        if(prefix.length > 2) emailErr = true;
        else if(prefix[0].trim() === "") emailErr = true;
        else if(prefix[1]){
            let suffix = prefix[1].split('.');
            if(suffix.length > 2) emailErr = true;
            else if(!suffix[1])emailErr = true;
            else if(suffix[1].trim() === "") emailErr = true;
            else if(suffix[0].trim() === "") emailErr = true;
        }else{
            emailErr = true;
        }
    }

    //Phone
    if(phone === "")phoneErr = true;
    for(i = 0;i<phone.length;i++){
        if(!isNumeric(phone[i])) phoneErr = true;
    }

    //address
    if(address === ""){
        addressErr = true;
    }
    temp = address.toLowerCase();
    if(temp.includes("script")){
        addressErr = true;
    }

    if(emailErr||addressErr||nameErr||lastNameErr|| phoneErr){
        alert("Enter Valid Data");
        return false;
    }

    return true;
}

function order(e){
    e.preventDefault();
    if(!validate(e)) return;
    const newOrder = getLocal(CART_KEY);
    const orderData = getLocal(ORDER_KEY);
    let id = 0;
    if(!orderData){
        newOrder.id = id = 1;
        setLocal(ORDER_KEY,[newOrder]);
    }else{
        newOrder.id = Object.keys(orderData).length + 1;
        orderData.push(newOrder);
        id = Object.keys(orderData).length;
        setLocal(ORDER_KEY,orderData);
    }
    window.localStorage.removeItem(CART_KEY);
    window.open("https://api.whatsapp.com/send/?phone=%2B6287881814150&text=hai,%20saya%20melakukan%20Order%20dengan%20Order%20ID%20"+ id  +"&app_absent=0")
}

function getOrder(){
    return getItem(CART_KEY)
}

function setLocal(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocal(key){
    return JSON.parse(localStorage.getItem(key));
}

function getItem(key){
    return localStorage.getItem(key);
}