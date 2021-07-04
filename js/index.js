$('document').ready(main);

function main(){
    initItems();
}

const PRODUCT = [
    {id:'Burger1', cat:'Burger', name :'Burger Alaska', price : 57000, img : "imgs/Product/Burger/Burger1.png"},
    {id:'Burger2', cat:'Burger',name :'Burger Malamute', price : 67000, img : "imgs/Product/Burger/Burger2.png"},
    {id:'Burger3', cat:'Burger',name :'Burger Husky', price : 65000, img : "imgs/Product/Burger/Burger3.png"},
    {id:'side1', cat:'SideDish',name :'Fries', price : 37000, img : "imgs/Product/SideDish/fries.png"}
];

function initItems(){
    let recom = $('#recomendation');
    let best = $('#bestSeller');
    for(i =0;i<2;i++){
        e = PRODUCT[i];
        recom.append(
        `<div class="product">
            <img src="${e.img}">
            <H3>${e.name}</H3>
            <button class="button" onClick=addCart("${e.id}")> ADD TO CART </button>
        </div>`
    )}
    best.append(
        `<div class="product">
        <img src="${PRODUCT[2].img}">
        <H3>${PRODUCT[2].name}</H3>
        <button class="button" onClick=addCart("${PRODUCT[2].id}")> ADD TO CART </button>
        </div>`
    )
}

let CART_KEY = "CART_STORAGE";

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

$(document).ready(function(){
    
    $('.next').on('click', function(){
        var currentIMG = $('.active-img');
        var nextIMG = currentIMG.next();

        if(nextIMG.length){
            currentIMG.removeClass('active-img').css('z-index',-10);
            nextIMG.addClass('active-img').css('z-index',10);
        }
        
    });

    $('.prev').on('click', function(){
        var currentIMG = $('.active-img');
        var prevIMG = currentIMG.prev();

        if(prevIMG.length){
            currentIMG.removeClass('active-img').css('z-index',-10);
            prevIMG.addClass('active-img').css('z-index',10);
        }
        
    });
});

var flag = true;
setInterval(function(){
    if (idleTime < MAX_IDLE_TIME){
        var currentIMG = $('.active-img');
    
        if(flag == true){
            var nextIMG = currentIMG.next();

            if(nextIMG.length){
                currentIMG.removeClass('active-img').css('z-index',-10);
                nextIMG.addClass('active-img').css('z-index',10);
            }
            else{
                flag = false; 
            }
        }
        else{
            var prevIMG = currentIMG.prev();

            if(prevIMG.length){
                currentIMG.removeClass('active-img').css('z-index',-10);
                prevIMG.addClass('active-img').css('z-index',10);
            }
            else{
                flag = true;
            }
        }
    }
},2000);