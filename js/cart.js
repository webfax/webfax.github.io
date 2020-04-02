$(document).ready(function () {
    let proizvodi = proizvodiukorpi();
    if(!proizvodi) {
        praznaKorpa();
    }
    else {
        korpa();
    }
});

function proizvodiukorpi() {
    return JSON.parse(localStorage.getItem("proizvodi"));
}

function korpa() {
    let proizvodi = proizvodiukorpi();
    $.ajax({
        url: "data/products.json",
        method: "get",
        type: "json",
        success: function(data) {
            data = data.filter(p=> {
                for(let proiz of proizvodi) {
                    if(p.id == proiz.id) {
                        p.quantity == proiz.quantity;
                        return true;
                    }
                }
                return false;
            })
            ispisiProizvode(data);
        },
        error: function(xhr, status, error) {
            console.log(xhr);
        }
    })
}

function ispisiProizvode(proizvodi) {
    let ispis = ``;
    proizvodi.forEach( el => {
        ispis += `
        <tr class="cart-row">
			<td class="cart_product">
				<a href=""><img src="${el.picture.src}" alt="${el.picture.alt}" style='height:100px; width: 100px;'></a>
			</td>
			<td class="cart_description">
				<h4><a href="">${el.name}</a></h4>
				<p>Web ID: ${el.id}</p>
			</td>
			<td class="cart_price">
				<p class="cart-price">$${el.price}</p>
			</td>
			<td class="cart_quantity">
				<div class="cart_quantity_button">
                    <input class="cart_quantity_input" type="number" name="quantity" value="1" size="2">
			    </div>
			</td>
			<td class="cart_delete">
				<button onclick='removeFromCart(${el.id})' class="cart_quantity_delete fa fa-times"></button>
			</td>
		</tr>
        `;
    })
    $('.cart-items').html(ispis);
}

function removeFromCart(id) {
    let proizvodi = proizvodiukorpi();
    let filtrirano = proizvodi.filter( p => p.id != id)

    localStorage.setItem("proizvodi", JSON.stringify(filtrirano));
    
    korpa();
}

function praznaKorpa() {
    $('.cart-items').html('<h1>Your cart is empty!</h1>');
}