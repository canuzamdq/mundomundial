// variables globales

let subtotal = 0
let total = 0
let productoRepetido = 0
let carrito = []



class camisetas {
    constructor(id, pais, talle, precio, imagen, cantidad) {
        this.id = id;
        this.pais = pais;
        this.talle = talle;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }

}

// Captura DOM

let divProductos = document.getElementById("productos") // Funcion mostrarStockDOM
let btnNuevaCamiseta = document.getElementById("btnNuevaCamiseta") // Funcnion nuevaCamiseta
let coincidencia = document.getElementById("coincidencia") // Funcion buscarCamiseta
let buscador = document.getElementById("buscador") // Funcion buscarCamiseta
let ordenar = document.getElementById("filtro") // Funcion ordenar
let modalCarrito = document.getElementById("modalBody") //Funcion mostrarCarrito
let modalFooter = document.getElementById("modalFooter") // Footer del carrito donde se muestra el valor de la compra
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra") // Botaon finalizar compra del Carrito



// Array de objetos - Carga asincronica de datos desde archivo json

let stock = []

const cargarStock = async () => {
    const response = await fetch("camisetas.json")
    const data = await response.json()
    for (let camiseta of data) {
        let nuevaCamiseta = new camisetas(camiseta.id, camiseta.pais, camiseta.talle, camiseta.precio, camiseta.imagen, camiseta.cantidad)
        stock.push(nuevaCamiseta)
    }
    localStorage.setItem("stock", JSON.stringify(stock))
    mostrarStockDOM(stock)
}

if (localStorage.getItem("stock")) {
    stock = JSON.parse(localStorage.getItem("stock"))

} else {
    cargarStock()
}


// Array de objetos con los productos del Carrito de compras

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    modalCarrito.innerHTML = ""
    mostrarCarrito(carrito)


} else {

    modalCarrito.innerHTML = ""
    mostrarCarrito(carrito)
}





//Funciones

//Funcion que muestra mediante cards el stock existente. Recibe como pararámetro el array stock.

function mostrarStockDOM(array) {
    divProductos.innerHTML = "" // antes de recorrer el array resetea el div
    for (let producto of array) {
        let nuevaCamiseta = document.createElement("div")
        nuevaCamiseta.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")

        nuevaCamiseta.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;" id="cardCamisetas">
                                        <img src="./img/${producto.imagen}" class="card-img-top" alt="foto camiseta"> 
                                        <div class="card-body">
                                            <h5 class="card-title">${producto.pais}</h5>
                                            <p class="card-text">Camiseta de ${producto.pais} talle ${producto.talle}</p>
                                            <p>Precio $${producto.precio}</p>
                                        <button id="btnAgregar${producto.id}" class="btn btn-primary">Agregar al Carrito</button>
                                        </div>
                                    </div>`
        divProductos.appendChild(nuevaCamiseta)
        let btnAgregado = document.getElementById(`btnAgregar${producto.id}`)
        btnAgregado.addEventListener("click", () => {
            comparaCarrito(producto)
        })


    }

}

// Funcion que compara si el prducto agregado ya existe mediante su ID. Si existe agrega +1 en cantidad.

function comparaCarrito(producto) {
    for (let indice of carrito) {
        if (indice.id == producto.id) {
            productoRepetido = indice.id
            precioTotal = indice.precio

        }

    }

    if (productoRepetido == producto.id) {
        producto.precio = precioTotal + producto.precio
        producto.cantidad = producto.cantidad + 1
        console.log("cantidad" + producto.cantidad + "precio " + producto.precio)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        swal.fire({
            title: "Producto agregado!",
            text: `Se agrego camiseta de ${producto.pais} al carrito`,
            icon: "success",
            confirmButtonText: 'Aceptar',
            timer: 3000
        })


    } else {
        agregarAlCarrito(producto)
    }
    modalCarrito.innerHTML = ""
    mostrarCarrito(carrito)
}


// Funcion que agrega productos al carrito

function agregarAlCarrito(producto) {
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito)) // Almacena los productos del Carrito en localStorage
    swal.fire({
        title: "Producto agregado!",
        text: `Se agrego camiseta de ${producto.pais} al carrito`,
        icon: "success",
        confirmButtonText: "Aceptar",
        timer: 3000,

    });

    modalCarrito.innerHTML = ""
    mostrarCarrito(carrito)

}



// Función para mostrar los productos del carrito

function mostrarCarrito(array) {
    modalCarrito.innerHTML = ""
    if (array.length == 0) {
        modalCarrito.innerHTML = "<p>No hay productos en el carrito</p>"
    } else {
        for (mostrarProductos of array) {
            modalCarrito.innerHTML += `
        <div class="card" id ="productoCarrito${mostrarProductos.id}" style="width: 18rem;" id=cardCarrito>
            <img class="card-img-top" height="auto" src="./img/${mostrarProductos.imagen}" alt="${mostrarProductos.pais}">
            <div class="card-body">
                    <p class="card-title">Camiseta de ${mostrarProductos.pais}</p>
                    <p class="card-text">Talle ${mostrarProductos.talle}</p>
                    <p class="card-text">$${mostrarProductos.precio}</p>
                    <p class="card-text">${mostrarProductos.cantidad}</p>
                    <button onCLick = "eliminarDelCarrito(${mostrarProductos.id})"class= "btn btn-danger" id="botonEliminar${mostrarProductos.id}"><i class="fas fa-trash-alt"></i>Eliminar</button>
            </div>    
        </div>`

        }
    }

    totalCarrito(array)
}


// Función que acumula el valor total de los productos en el carrito + IVA del 21%

function totalCarrito(array) {
    let acumulador = 0
    acumulador = array.reduce((acum, producto) => acum + producto.precio, 0)
    if (acumulador == 0) {
        modalFooter.innerHTML = ""
    } else {
        modalFooter.innerHTML = `<h5>Subtotal $${acumulador}</h5>
                                 <h5>IVA (21%): $${acumulador*0.21}</h5>
                                 <h5>Total: $${acumulador*1.21}</h5>`
    }
}


// Función para eliminar productos del carrito. Recibe como parametro el ID de producto proviniente de la función mostrarcarrito()

function eliminarDelCarrito(id) {
    const producto = carrito.find((producto) => producto.id == id);
    swal.fire({
        title: "Eliminar del Carrito",
        text: `¿Desea eliminar la camiseta ${producto.pais}?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Producto Eliminado del Carrito',
                'success'
            );
            carrito.splice(carrito.indexOf(producto), 1);
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Elimina el producto en localStorage
            subtotal = subtotal - producto.precio;
            modalFooter.innerHTML = "";
            modalFooter.innerHTML = `<p>Subtotal $${subtotal}</p><p>TOTAL C/IVA $${subtotal * 1.21}`;
            console.log(subtotal);
            modalCarrito.innerHTML = "";
            mostrarCarrito(carrito);

        }
    });


}



// Funcion para buscar

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


// Funcion para Agregar camisetas al stock. Valida que los datos estén ingresados.

function nuevaCamiseta(array) {
    let nuevoPais = document.getElementById("nuevoPais")
    let nuevoTalle = document.getElementById("nuevoTalle")
    let nuevoPrecio = document.getElementById("nuevoPrecio")
    let id = stock.length + 1
    if (nuevoPais.value.length != 0 && (nuevoTalle.value.toUpperCase() == "S" || nuevoTalle.value.toUpperCase() == "M" || nuevoTalle.value.toUpperCase() == "L" || nuevoTalle.value.toUpperCase() == "XL") && nuevoPrecio.length != 0) { // Valida que los input no estén vacíos y controla que los talles ingresados sean correctos
        const camiseta = new camisetas(id, nuevoPais.value, nuevoTalle.value, parseInt(nuevoPrecio.value), "generica.jpg", 1)
        array.push(camiseta)
        localStorage.setItem("stock", JSON.stringify(array))
        swal.fire({
            title: "Producto agregado!",
            text: `Se agrego camiseta de ${camiseta.pais} al stock`,
            icon: "success",
            confirmButtonText: 'Aceptar',
            timer: 3000
        });
        //Reset inputs
        nuevoPais.value = ""
        nuevoTalle.value = ""
        nuevoPrecio.value = ""
        mostrarStockDOM(array)
    } else {
        swal.fire({
            title: "Error",
            text: "Verifique que todos los campos estén completos y talle (S-M-L-XL)",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
       


    }
}

// Función para finalizar compra. Si no hay productos en el carrito muestra un mensaje de alerta.

function finalizarCompra() {
    if (carrito.length < 1) {
        swal.fire({
            title: "Finalizar compra",
            text: `No hay productos en el carrito`,
            icon: "error",
            confirmButtonText: "Aceptar",
        })

    } else {
        swal.fire({
            title: "Finalizar compra",
            text: `¿Desea finalizar su compra?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Compra realizada!",
                    text: "Muchas gracias por utilizar el simulador de compras de camisetas",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                })
            }
            carrito = []
            localStorage.removeItem("carrito")
        })
    }
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

btnFinalizarCompra.addEventListener("click", () => {
    finalizarCompra()
})



mostrarStockDOM(stock)

