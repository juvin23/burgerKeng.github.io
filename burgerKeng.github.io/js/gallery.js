$('document').ready(main)

const CART_KEY = "CART_STORAGE";

const PRODUCT = [
    {id:'Burger1', cat:'Burger', name :'Burger Alaska', price : 57000, img : "imgs/Product/Burger/Burger1.png"},
    {id:'Burger2', cat:'Burger',name :'Burger Malamute', price : 67000, img : "imgs/Product/Burger/Burger2.png"},
    {id:'Burger3', cat:'Burger',name :'Burger Husky', price : 65000, img : "imgs/Product/Burger/Burger3.png"},
    {id:'side1', cat:'SideDish',name :'Fries', price : 37000, img : "imgs/Product/SideDish/fries.png"}
];

function main(){
    initItems();
}

function initItems(){
    const burger_list = $('#burgerList');
    const side_list = $('#sideList');

    PRODUCT.forEach(key =>{
        if(key.cat === 'Burger'){
            burger_list.append(
                `<div class="product">
                    <img src= "${key.img}">
                    <H2>${key.name}</H2>
                    <H3>Rp.${key.price}</H3>
                    <button onClick=addCart("${key.id}") class="button" > ADD TO CART </button> 
                </div> `
                )
        }else{
            side_list.append(
                `<div class="product">
                    <img src= ${key.img}>
                    <H3 class = "match-Dark">${key.name}</H3>
                    <H3>Rp.${key.price}</H3>
                    <button class="button" onClick=addCart("${key.id}")> ADD TO CART </button>
                </div> `
                )
        }

    })
}

function addCart(id){
    const storage = getLocal(CART_KEY);
    const newItem = PRODUCT.find(key =>{
        return key.id === id;
    })

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
