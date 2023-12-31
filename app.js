require('colors');
const fs = require('fs');
const readline = require('readline');

const datosArchivos = require('./datos.json');

const main = async () => {
    console.clear();
    console.log('*****************************');
    console.log('**     PROYECTO CLASES     **');
    console.log('*****************************\n');

    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor() {
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        setCodigoProducto(value) {
            this.#codigoProducto = value;
        }

        getCodigoProducto() {
            return this.#codigoProducto;
        }

        setNombreProducto(value) {
            this.#nombreProducto = value;
        }

        getNombreProducto() {
            return this.#nombreProducto;
        }

        setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }

        getInventarioProducto() {
            return this.#inventarioProducto;
        }

        setPrecioProducto(value) {
            this.#precioProducto = value;
        }

        getPrecioProducto() {
            return this.#precioProducto;
        }
    }

    class ProductoTienda {
        #listaProductos;

        constructor() {
            this.#listaProductos = [];
        }

        getListaProductos() {
            return this.#listaProductos;
        }

        cargaArchivosProductos() {
            let contador = 0;
            if (datosArchivos.length > 0) {
                datosArchivos.forEach((objeto) => {
                    contador++;
                    let producto = new Producto();
                    producto.setCodigoProducto(objeto.codigoProducto);
                    producto.setNombreProducto(objeto.nombreProducto);
                    producto.setInventarioProducto(objeto.inventarioProducto);
                    producto.setPrecioProducto(objeto.precioProducto);
                    this.#listaProductos.push(producto);
                });
            } else {
                console.log(`ERROR, el archivo datos.json no contiene datos\n`);
            }
            console.log(`total de productos cargados ===>`.red + ` ${contador}`);
        }

        grabaArchivoProducto() {
            const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
                return {
                    codigoProducto: producto.getCodigoProducto(),
                    nombreProducto: producto.getNombreProducto(),
                    inventarioProducto: producto.getInventarioProducto(),
                    precioProducto: producto.getPrecioProducto(),
                };
            });

            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`);
        }

        mostrarProductos() {
            this.#listaProductos.forEach((producto) => {
                console.log(
                    `|    `.red +
                    producto.getCodigoProducto() +
                    `      |`.red +
                    `|    ` +
                    producto.getNombreProducto() +
                    `      |`.red +
                    `|    ` +
                    producto.getInventarioProducto() +
                    `       |`.red +
                    `|    ` +
                    producto.getPrecioProducto() +
                    `      |`.red
                );
            });
        }

        agregarNuevoProducto() {
        
        
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const productoDienda= this;

            function pregunta(){
                rl.question('¿Deseas agregar un nuevo producto? (Si/No): ', (respuesta) => {
                    if(respuesta.toLowerCase() === 'si') {
                        preguntas();
                    }else if(respuesta.toLowerCase() === 'no') {
                        rl.close();
                    }else {
                        console.log("Por favor,respuesta 'Si' o 'No' .");
                        pregunta();
                    }
                });
            }
            
            pregunta();

            function preguntas(){
               rl.question('Ingrese el código del nuevo producto: ', (codigo) => {
                rl.question('Ingrese el nombre del nuevo producto: ', (nombre) => {
                    rl.question('Ingrese el inventario del nuevo producto: ', (inventario) => {
                        rl.question('Ingrese el precio del nuevo producto: ', (precio) => {


                                const nuevoProducto = new Producto();

                                nuevoProducto.setCodigoProducto(codigo);
                                nuevoProducto.setNombreProducto(nombre);
                                nuevoProducto.setInventarioProducto(parseInt(inventario));
                                nuevoProducto.setPrecioProducto(parseFloat(precio));

                                productosTienda.getListaProductos().push(nuevoProducto);
                                productosTienda.grabaArchivoProducto();
            
                                

                                rl.close();
                            });
                        });
                    });
                });
          };
       }
    }            

    let productosTienda = new ProductoTienda();

    productosTienda.cargaArchivosProductos();

    console.log(`DATOS APERTURA TIENDA`);
    
    productosTienda.mostrarProductos();
    
    productosTienda.getListaProductos().forEach((producto) => {
        producto.setInventarioProducto(Math.floor(Math.random() * (20 - 1) + 1));
    });
    
    console.log(`DATOS CIERRE TIENDA`);
    productosTienda.mostrarProductos();
    
    productosTienda.grabaArchivoProducto();

    productosTienda.agregarNuevoProducto();
}

main();
