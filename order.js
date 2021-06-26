$('document').ready(main)

const CART_KEY = "CART_STORAGE";

const BURGER = [
    {id:'Burger1', nama :'Burger Alaska', price : 57000, img : "/imgs/Product/Burger/Burger1.png"},
    {id:'Burger2', nama :'Burger Malamute', price : 67000, img : "/imgs/Product/Burger/Burger2.png"},
    {id:'Burger3', nama :'Burger Husky', price : 65000, img : "/imgs/Product/Burger/Burger3.png"}
];

const SIDE = [
    {id:'side1', nama :'Fries', price : 37000, img : "/imgs/Product/SideDish/fries.png"}
];

const CART = [];

function main(){
    initItems();
}

function initItems(){
    const burger_list = $('#burgerList');
    const side_list = $('#sideList');

    BURGER.forEach(key =>{
        burger_list.append(
        `<div class="product">
            <img src= ${key.img}>
            <H3>${key.nama}</H3>
            <a href="" class="button"> ADD TO CART </a>
        </div> `
        )
    })

    SIDE.forEach(key =>{
        side_list.append(
        `<div class="product">
            <img src= ${key.img}>
            <H3>${key.nama}</H3>
            <button class="button" onClick=addCart(${key.id})> ADD TO CART </button>
        </div> `
        )
    })
}

function addCart(key){

}

function setLocal(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocal(key){
    return JSON.parse(localStorage.getItem(key));
}
