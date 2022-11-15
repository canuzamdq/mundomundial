// variables globales

let subtotal = 0
let total = 0
let carrito = []


class camisetas {
    constructor(id, pais, talle, precio, imagen) {
        this.id = id;
        this.pais = pais;
        this.talle = talle;
        this.precio = precio;
        this.imagen = imagen;
    }

}

// Instanciación de objetos

const camiseta1 = new camisetas(1, "ARGENTINA", "L", 13000, "argentina.webp")
const camiseta2 = new camisetas(2, "ARGENTINA", "M", 12000, "argentina.webp")
const camiseta3 = new camisetas(3, "URUGUAY", "M", 13500, "uruguay.webp")
const camiseta4 = new camisetas(4, "ECUADOR", "L", 9000, "ecuador.webp")
const camiseta5 = new camisetas(5, "ECUADOR", "M", 9000, "ecuador.webp")
const camiseta6 = new camisetas(6, "BRASIL", "M", 12500, "brasil.webp")
const camiseta7 = new camisetas(7, "BRASIL", "L", 14000, "brasil.webp")
const camiseta8 = new camisetas(8, "ALEMANIA", "S", 15000, "alemania.webp")
const camiseta9 = new camisetas(9, "ALEMANIA", "M", 15000, "alemania.webp")
const camiseta10 = new camisetas(10, "FRANCIA", "S", 12500, "francia.webp")
const camiseta11 = new camisetas(11, "FRANCIA", "S", 12500, "francia.webp")
const camiseta12 = new camisetas(12, "FRANCIA", "S", 12500, "francia.webp")
const camiseta13 = new camisetas(13, "ESPAÑA", "S", 12500, "espana.webp")
const camiseta14 = new camisetas(14, "ESPAÑA", "M", 12500, "espana.webp")
const camiseta15 = new camisetas(15, "ESPAÑA", "L", 12500, "espana.webp")



// Array de objetos

let stock = []

if (localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"))

} else{
    
    stock.push(camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6, camiseta7, camiseta8, camiseta9, camiseta10, camiseta11, camiseta12, camiseta13, camiseta14, camiseta15)
    localStorage.setItem("stock", JSON.stringify(stock))
}

// Captura DOM

let divProductos = document.getElementById("productos") // Funcion mostrarStockDOM
let btnNuevaCamiseta = document.getElementById("btnNuevaCamiseta") // Funcnion nuevaCamiseta
let coincidencia = document.getElementById("coincidencia") // Funcion buscarCamiseta
let buscador = document.getElementById("buscador") // Funcion buscarCamiseta
let ordenar = document.getElementById("filtro") // Funcion ordenar
let modalCarrito = document.getElementById("modalBody") //Funcion mostrarCarrito
let modalFooter = document.getElementById("modalFooter") // Funcion calcularTotal





//Funciones

//Funcion que muestra mediante cards el stock existente. Recibe como pararámetro el array stock.

function mostrarStockDOM(array) {
    divProductos.innerHTML = "" // antes de recorrer el array resetea el div
    for (let producto of array) {
        let nuevaCamiseta = document.createElement("div")
        nuevaCamiseta.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")

        nuevaCamiseta.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;" id="cardCamisetas">
                                        <img src="/img/${producto.imagen}" class="card-img-top" alt="foto camiseta"> 
                                        <div class="card-body">
                                            <h5 class="card-title">${producto.pais}</h5>
                                            <p class="card-text">Camiseta de ${producto.pais} talle ${producto  .talle}</p>
                                            <p>Precio $${producto.precio}</p>
                                        <button id="btnAgregar${producto.id}" class="btn btn-primary">Agregar al Carrito</button>
                                        </div>
                                    </div>`
        divProductos.appendChild(nuevaCamiseta)
        let btnAgregado = document.getElementById(`btnAgregar${producto.id}`)
        btnAgregado.addEventListener("click", () => {agregarAlCarrito(producto)})


    }

}

function agregarAlCarrito(producto) {
    carrito.push(producto)
    modalCarrito.innerHTML = ""
    mostrarCarrito(carrito)
    alert("Producto agregado al carrito")
}

function mostrarCarrito(array) {
    for (mostrarProductos of array) {
        modalCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${mostrarProductos.id}" style="max-width: 250px;">
            <img class="card-img-top" height="auto" src="../img/${mostrarProductos.imagen}" alt="${mostrarProductos.pais}">
            <div class="card-body">
                    <p class="card-title">Camiseta de ${mostrarProductos.pais}</p>
                    <p class="card-text">Talle ${mostrarProductos.talle}</p>
                    <p class="card-text">$${mostrarProductos.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${mostrarProductos.id}"><i class="fas fa-trash-alt"></i>Eliminar</button>
            </div>    
        </div>`
        
        let btnBorrarProducto = document.getElementById(`botonEliminar${mostrarProductos.id}`)
        btnBorrarProducto.addEventListener("click", ()=>{borrarDelCarrito(array)}) 
        
    }
    
    subtotal += mostrarProductos.precio
    console.log(subtotal)
    
}

function borrarDelCarrito(carrito){
        let eliminarProducto = carrito.indexOf(mostrarProductos)
        carrito.splice(eliminarProducto, 1)
        alert("Producto Eliminado del carrito")
        modalCarrito.innerHTML = ""
        mostrarCarrito(carrito)
    
}   


//Funcion para buscar

function buscarCamiseta(camisetaBuscada, array) {

    let busqueda = array.filter(
        (camiseta) => camiseta.pais.toLowerCase().includes(camisetaBuscada.toLowerCase()) || camiseta.pais.toLowerCase().includes(camisetaBuscada.toLowerCase())
    )
    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        divProductos.innerHTML = ""
        let divNuevo = document.createElement("div")
        divNuevo.innerHTML = `<p>No se encontraron camisetas de "${camisetaBuscada}". A continuación podrá ver nuestro stock de camisetas vigente:</p>`
        coincidencia.appendChild(divNuevo)
        mostrarStockDOM(array)
    } else {
        coincidencia.innerHTML = ""
        mostrarStockDOM(busqueda)
    }
}


// Funcion para ordenar el stock

function ordenarStock(array) {
    divProductos.innerHTML = ""
    if (ordenar.value == "ordenAlfabetico") {
        array.sort((a, b) => {
            if (a.pais == b.pais) {
                return 0;
            }
            if (a.pais < b.pais) {
                return -1;
            }
            return 1;
        })
        mostrarStockDOM(array)

    } else if (ordenar.value == "precioMayor") {
        array.sort((a, b) => (b.precio - a.precio))
        mostrarStockDOM(array)
    } else if (ordenar.value == "precioMenor") {
        array.sort((a, b) => (a.precio - b.precio))
        mostrarStockDOM(array)
    } else {
        mostrarStockDOM(array)
    }

}


// Funcion para Agregar camisetas al stock

function nuevaCamiseta(array) {
    let nuevoPais = document.getElementById("nuevoPais")
    let nuevoTalle = document.getElementById("nuevoTalle")
    let nuevoPrecio = document.getElementById("nuevoPrecio")
    let id = stock.length + 1
    const camiseta = new camisetas(id, nuevoPais.value, nuevoTalle.value, nuevoPrecio.value, "generica.jpg")
    array.push(camiseta)
    localStorage.setItem("stock", JSON.stringify(array))
    //Reset inputs
    nuevoPais.value = ""
    nuevoTalle.value = ""
    nuevoPrecio.value = ""
    mostrarStockDOM(array)
}
// Eventos

btnNuevaCamiseta.addEventListener("click", () => {
    nuevaCamiseta(stock)
})
buscador.addEventListener("input", () => {
    buscarCamiseta(buscador.value, stock)
})
ordenar.addEventListener("change", () => {
    ordenarStock(stock)
})

mostrarStockDOM(stock)






/*// CODIGO ANTERIOR

// Función carrito. Acumula los productos y calcula el subtotal y el total de la compra (este ultimo con iva del 21%)
function llenarCarrito(indice) {
    if (indice == 0) {
        bandera = false
        alert(`Detalle de compra de camisetas:\n ${carritoAcumulado} \n TOTAL C/IVA: ${total}`)
        alert("Gracias por su compra")
    } else {
        subtotal += stock[indice - 1].precio
        total = subtotal * 1.21
        carrito.push(stock[indice - 1])
        carritoAcumulado += (`${carrito[carrito.length-1].pais} talle: ${carrito[carrito.length-1].talle} precio: ${carrito[carrito.length-1].precio}/ Subtotal: $${subtotal}\n`)
    }
}

// Funcion para eliminar un elemento del stock

function eliminarStock(array) {
    alert("Seleccione un item que se muestra en consola para eliminar")
    for (let elem of array) {
        console.log(`${elem.id} - ${elem.pais} - ${elem.talle} - ${elem.precio}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))
    //mapeamos para tener un array con los indices
    let indices = array.map(camiseta => camiseta.id)
    //indexOf para buscar ese ID en el array de indices y devolvernos la posición
    let indice = indices.indexOf(idEliminar)
    //con la posición del elemento aplico splice al array de objetos
    array.splice(indice, 1)
}

// Funcion para modificar el stock

function modificarStock(array) {
    alert("Seleccione un elemento del stock mostrado por consola para modificar")

    for (let elem of array) {
        console.log(`${elem.id} - ${elem.pais} - ${elem.talle} - ${elem.precio}`)
    }
    let idModificar = parseInt(prompt("Ingrese el id a modificar"))
    //Mapeo de array para obtener los indices
    let indices = array.map(camiseta => camiseta.id)
    //indexOf para buscar ese ID en el array de indices 
    let indice = indices.indexOf(idModificar)
    //Ingreso de los nuevos datos
    pais = prompt(`Ingrese el pais de la camiseta:`).toUpperCase()
    talle = prompt(`Ingrese talle de la camiseta (S-M-L-XL):`).toUpperCase()
    precio = parseInt(prompt(`Ingrese precio de la camiseta:`))
    //con la posición del elemento y los datos ingresados modificamos el array
    array[indice].pais = pais
    array[indice].talle = talle
    array[indice].precio = precio
}





function buscarTalle(array) {
    let talleBuscado = prompt("Ingrese el talle a buscar (S-M-L-XL):").toUpperCase()
    if (talleBuscado == "S" || talleBuscado == "M" || talleBuscado == "L" || talleBuscado == "XL") {
        let busqueda = array.filter(
            (camiseta) => camiseta.talle == talleBuscado
        )
        if (busqueda.length == 0) {
            alert(`No se encontraron camisetas talle ${talleBuscado}`)
        } else {
            mostrarStock(busqueda)
        }
    } else {
        alert(`Verifique el dato ingresado`)
        buscarTalle(array)

    }
}
*let bontonBuscar = document.getElementById("botonBuscar")
let buscador = document.getElementById("buscador")
bontonBuscar.addEventListener("click", respuestaClick)

function respuestaClick() {
    alert(`Buscando ${buscador.value}...`)
}*/


// Ejecución del algortimo.

