// Declaración de variables

const precio1 = 14000
const precio2 = 12000
const precio3 = 10000

const item1 = "Camiseta selección Argentina"
const item2 = "Camiseta selección Brasil"
const item3 = "Camiseta selección Uruguay"
const item4 = "Camiseta selección Ecuador"

let precioTotal = 0
let bandera = true

// Función menuPrincipal: muesta la lisa de artículos 

function menuPrincipal() {
    articulo = parseInt(prompt(`Seleccione los articulos de la lista que desea comprar:
        1 - ${item1} $${precio1}-
        2 - ${item2} $${precio2}.-
        3 - ${item3} $${precio3}.-
        4 - ${item4} $${precio3}.-
        5 - FINALIZAR COMPRA`))
}


//Función compra: Permite al usuario finalizar la compra. Valida que el caracter ingresado sea "s" o "n"

function compra() {
    opcion = prompt("¿Desea comprar otro artículo (S/N)")
    if (opcion.toLowerCase() == "s") {
        menuPrincipal()
    } else if (opcion.toLowerCase() == "n") {
        console.log(`TOTAL DE LA COMPRA: $${precioTotal}`)
        alert("¡Muchas gracias por su compra!")
        bandera = false
    } else if (opcion.toLowerCase() <= "s" || opcion.toLowerCase() <= "n"){
        alert("Por favor veridique la opción ingresada")
        compra()

    }

}


// Cominenzo de código. Se puede visualizar el estado parcial y total de la compra desde la consola del navegador

alert(`¡Bienvenido a Mundo Mundial Camisetas Qatar 2022!`)

menuPrincipal()

while (bandera) {
    
    while (isNaN(articulo)){
        alert("Por favor verifique la opción ingresada")
        menuPrincipal()
    }

    if (articulo == 5) {
        console.log(`TOTAL DE LA COMPRA: $${precioTotal}`)
        alert("¡Muchas gracias por su compra!")
        bandera = false

    } else if (articulo == 1) {
        precioTotal = precioTotal + precio1
        console.log(`${item1} $${precio1}- Subtotal $${precioTotal}`)
        compra()

    } else if (articulo == 2) {
        precioTotal = precioTotal + precio2
        console.log(`${item2} $${precio2}- Subtotal $${precioTotal}`)
        compra()

    } else if (articulo == 3) {
        precioTotal = precioTotal + precio3
        console.log(`${item3} $${precio3}- Subtotal $${precioTotal}`)
        compra()

    } else if (articulo == 4) {
        precioTotal = precioTotal + precio3
        console.log(`${item4} $${precio3}-Subtotal $${precioTotal}`)
        compra()

    } else if (articulo < 1 || articulo > 5) {
        alert("Por favor verifique el dato ingresado")
        menuPrincipal()
    }
}