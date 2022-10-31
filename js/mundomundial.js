// variables globales

let subtotal = 0  
let total = 0  
const carrito = [] 
let carritoAcumulado = ""  
bandera = true

// class constructora

class camisetas {
    constructor(id, pais, talle, precio){
        this.id = id;
        this.pais = pais;
        this.talle = talle;
        this.precio = precio;
    }
    
}

// Instanciación de objetos

const camiseta1 = new camisetas(1, "ARGENTINA", "L", 13000)
const camiseta2 = new camisetas(2, "ARGENTINA", "M", 12000)
const camiseta3 = new camisetas(3, "URUGUAY", "M", 13500)
const camiseta4 = new camisetas(4, "ECUADOR", "L", 9000)
const camiseta5 = new camisetas(5, "ECUADOR", "M", 9000)
const camiseta6 = new camisetas(6, "BRASIL", "M", 12500)
const camiseta7 = new camisetas(7, "BRASIL", "L", 14000)



// Array de objetos

const stock = []
stock.push(camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6, camiseta7,)

//Funciones

//Funcion que muestra el stock existente. Recibe como pararámetro el array stock (no se utiliza for of por que muestra un alert por cada elemento)

function mostrarStock(array) {
    let menu = ""
    for (let i = 0; i < array.length; i++) {
        menu+= (`${array[i].id} - Camiseta de ${array[i].pais} / Talle ${array[i].talle} / Precio: \$${array[i].precio}\n`)
        }
        alert(`${menu}`)
        
}

// Funcion que muestra el stock existente y permite seleccionar para comprar. Recibe como parametro el array stock

function menuComprar(array){
    let menu = ""
    for (let i = 0; i < array.length; i++) {
        array[i].id = i + 1 //Asigna ID corralativos empezando por 1
        menu+= (`${array[i].id} - Camiseta de ${array[i].pais} / Talle ${array[i].talle} / Precio: \$${array[i].precio}\n`)
    }
    compra = parseInt(prompt(`${menu}0 - FINALIZAR COMPRA \n Seleccione una opción:`))
    
    
}

// Funcion que recibe como parámetro la opción de stock a comprar. Llama a la función llenarCarrito (acumula la compra).

function opcion1Comprar(opcion) {
    switch (opcion) {
            case compra: // se generan tantos "case" como items que tenga el array stock
                llenarCarrito(compra)
                console.log(carritoAcumulado)
            break
            /*case 2:
                llenarCarrito(2)
                console.log(carritoAcumulado)
            break
            case 3:
                llenarCarrito(3)
                console.log(carritoAcumulado)
            break
            case 4:
                llenarCarrito(4)
                console.log(carritoAcumulado)
            break
            case 5:
                llenarCarrito(5)
                console.log(carritoAcumulado)
            break
            case 6:
                llenarCarrito(6)
                console.log(carritoAcumulado)
            break
            case 7:
                llenarCarrito(7)
                console.log(carritoAcumulado)
            break*/
            
            default:
                alert("Verifique la opción ingresada!")
                
            break
    
        }
    }


// Función carrito. Acumula los productos y calcula el subtotal y el total de la compra (este ultimo con iva del 21%)
function llenarCarrito(indice) {
        if (indice == 0) {
            bandera = false
            alert(`Detalle de compra de camisetas:\n ${carritoAcumulado} \n TOTAL C/IVA: ${total}` )
            alert("Gracias por su compra")
        }else{
        subtotal+= stock[indice-1].precio
        total = subtotal * 1.21
        carrito.push(stock[indice-1])
        carritoAcumulado+=(`${carrito[carrito.length-1].pais} talle: ${carrito[carrito.length-1].talle} precio: ${carrito[carrito.length-1].precio}/ Subtotal: $${subtotal}\n`)
        }
}

// Funcion para eliminar un elemento del stock

function eliminarStock(array){
    alert("Seleccione un item que se muestra en consola para eliminar")
    for(let elem of array){
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
    
    for(let elem of array){
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

// Funciones para ordenar el stock

function ordenarMayorMenor(array){
    console.log(array.sort((a,b) => (b.precio - a.precio)))
}

function ordenarMenorMayor(array){
    array.sort((a, b)=>(a.precio - b.precio))
}

function ordenarAlfabeticamente(array){
    array.sort((a, b) => {
        if(a.pais == b.pais) {
            return 0; 
        }
        if(a.pais < b.pais) {
            return -1;
        }
        return 1;
    })

}

//Funciones para buscar

function buscarPais(array){
    let paisBuscado = prompt("Ingrese el pais de la camiseta a buscar:").toUpperCase()
    let busqueda = array.filter(
        (camiseta)=> camiseta.pais == paisBuscado
    )
    if(busqueda.length == 0){
        alert(`No se encontraron camisetas de ${paisBuscado}`)
    }else{
        mostrarStock(busqueda)
    }
}

function buscarTalle(array){
    let talleBuscado = prompt("Ingrese el talle a buscar (S-M-L-XL):").toUpperCase()
    if (talleBuscado == "S" || talleBuscado == "M" || talleBuscado == "L" || talleBuscado == "XL" ){
        let busqueda = array.filter(
            (camiseta)=> camiseta.talle == talleBuscado
        )
        if(busqueda.length == 0){
            alert(`No se encontraron camisetas talle ${talleBuscado}`)
        }else{
            mostrarStock(busqueda)
        }
    }else {
        alert(`Verifique el dato ingresado`)
        buscarTalle(array)
        
    }
}



// Funcion para mostrar el menu principal y sus submenus

function menuPrincipal(){

    let opcion = parseInt(prompt(`¡Bienvenido a Mundo Mundial camisetas Qatar 2022!

                        Seleccione una opción:
                        1 - Comprar camisetas
                        2 - ABM de stock
                        3 - Salir`))
    while (bandera == true) {
    switch(opcion){
        case 1:
            
            menuComprar(stock)
            opcion1Comprar(compra)

        break
        case 2:
            let opcionABM = parseInt(prompt(`Seleccione una opción

                                1 - Ver stock
                                2 - Agregar un elemento del stock
                                3 - Borar un elemento del stock
                                4 - Modificar un elemento del Stock
                                5 - Ordenar Stock
                                6 - Buscar camisetas por pais
                                7 - Buscar camisetas por talle
                                8 - Volver al menú anterior`
                                
                                ))
                                switch(opcionABM) {
                                    case 1:
                                        mostrarStock(stock)
                                    break
                                    case 2:
                                        let id = stock.length + 1
                                        let pais = prompt(`Ingrese pais de la camiseta:`).toUpperCase()
                                        let talle = prompt(`Ingrese talle de la camiseta (S-M-L-XL):`).toUpperCase()
                                        let precio = parseInt(prompt(`Ingrese precio de la camiseta:`))
                                        const camiseta = new camisetas(id, pais, talle, precio)
                                        stock.push(camiseta)
                                       
                                    break
                                    case 3:
                                        eliminarStock(stock)                                     
                                    break
                                    case 4:
                                        modificarStock(stock)
                                    break
                                    case 5:
                                        let opcionOrdenar = parseInt(prompt(`Seleccione una opcion:
                                        
                                                1 - Ordenar de menor a mayor precio
                                                2 - Ordenar de mayor a menor precio
                                                3 - Ordenar alfaético por pais`))
                                            switch(opcionOrdenar){
                                                case 1:
                                                    ordenarMenorMayor(stock)
                                                    mostrarStock(stock)
                                                break
                                                case 2:
                                                    ordenarMayorMenor(stock)
                                                    mostrarStock(stock)
                                                break
                                                case 3: 
                                                    ordenarAlfabeticamente(stock)
                                                    mostrarStock(stock)
                                                break
                                                default:
                                                    alert("Verifique la opcion ingresada")
                                                break
                                            }
                                    break       
                                    case 6:
                                        buscarPais(stock)
                                    break
                                    case 7:
                                        buscarTalle(stock)
                                    break
                                    case 8:
                                        menuPrincipal()
                                    break
                                    default:
                                        alert(`Verifique la opción ingresada`)
                                    break
                                
                                }

        break
        case 3:
            alert("Muchas gracias por su visita")
            bandera = false
        break
        default:
            alert("Verifique la opción ingresada")
            menuPrincipal()
        break;

    }}
}

// Ejecución del algortimo.

menuPrincipal()