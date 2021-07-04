$('document').ready(main)

const CART_KEY = "CART_STORAGE";

function main(){
    initItems();
}

function initItems(){
    const CART = getLocal(CART_KEY);
    
    $('#cart-View').empty();

    if(!CART || Object.keys(CART).length == 0){
        alert("you have nothing in your cart");
        window.location.href ="gallery.html";
        return;
    }
    let grandTotal = 0;
    CART.forEach(e => {
        let total = e.total*e.price;
        $('#cart-View').append(
            `<tr>
                <td>${e.name}</td>
                <td>${e.price}</td>
                <td>
                <button class='button' onClick = decrease("${e.id}")> - </button>
                ${e.total}
                <button class='button' onClick = increase("${e.id}")> + </button>
                </td>
                <td>${total}</td>
            </tr>
            `
        )
        grandTotal += total;
    });
    $('#cart-View').append(
        `<tr>
            <td colspan = 3> Grand Total </td>
            <td> ${grandTotal}</td>
        </tr>`
    )
}

function increase(id){  
    const storage = getLocal(CART_KEY);
    storage.find(key =>{
        if(key.id === id) return key.total++;
    })
    setLocal(CART_KEY,storage);
}
function decrease(id){  
    const storage = getLocal(CART_KEY);
    let index = storage.findIndex(key =>{
        return key.id === id;
    })

    if(storage[index].total === 1)storage.splice(index,1);
    else storage[index].total--;
    setLocal(CART_KEY,storage);
}

function setLocal(key,value){
    localStorage.setItem(key, JSON.stringify(value));
    initItems();
}

function getLocal(key){
    return JSON.parse(localStorage.getItem(key));
}
