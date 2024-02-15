require('colors');
/* importar el módulo 'fs' (sistema de archivos) en Node.js. 
La función require es utilizada en Node.js para cargar módulos 
de Node.js, y 'fs' es un módulo */

const fs = require('fs');

/* readline. Este módulo proporciona una interfaz para leer datos desde un flujo de entrada */

const readline = require('readline');
/* La función require en Node.js es utilizada para cargar módulos o archivos en tu 
programa. En este caso, el archivo datos.json es un archivo 
en formato JSON que contiene datos en su interior. */

const datosArchivos = require('./datos.json');

const directorioBackups = ('Respaldos.json');

/* Crea una interfaz de lectura mediante el método createInterface del módulo readline. */
const rl = readline.createInterface({     
    /* Establece la entrada de la interfaz de lectura como la entrada estándar del proceso  */         
    input: process.stdin,        
    /* Establece la salida de la interfaz de lectura como la salida estándar del proceso   */       
    output: process.stdout,
});


/* Una clase llamada Producto */
class Producto {

    //atributos 
        #codigoProducto;
    ///atributos    
        #nombreProducto;
    //atributos    
        #inventarioProducto;
    //atributos
        #precioProducto;

        //funcion constructora 
        constructor() { 
            //string
            this.#codigoProducto = '';
            //string
            this.#nombreProducto = '';
             //number
            this.#inventarioProducto = 0;
             //number
            this.#precioProducto = 0;
        }

        // set almacenar valores únicos de cualquier tipo

        setCodigoProducto(value) {
            this.#codigoProducto = value;
        }

        /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto. */


        getCodigoProducto() {
            return this.#codigoProducto;
        }
        // set almacenar valores únicos de cualquier tipo

        setNombreProducto(value) {
            this.#nombreProducto = value;
        }

        /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto. */

        getNombreProducto() {
            return this.#nombreProducto;
        }
        // set almacenar valores únicos de cualquier tipo

        setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }
        /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto. */


        getInventarioProducto() {
            return this.#inventarioProducto;
        }
        // set almacenar valores únicos de cualquier tipo

        setPrecioProducto(value) {
            this.#precioProducto = value;
        }
        /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto. */


        getPrecioProducto() {
            return this.#precioProducto;
        }

    }

    //Nueva clase llamada Productotienda 

    class ProductoTienda {
        //atributo 
        #listaProductos;
        
        //funcion constructora 

        constructor() {   
            //[] para unos datos                       
            this.#listaProductos = [];
            
        }
        /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto. */

        getListaProductos() {
            return this.#listaProductos;
        }

//un metodo llamado pausa utilizando la sintaxis de función de flecha 

         pausa = ()=> {
/* Crea una nueva promesa, la promesa se utilizará para manejar
la asincronía del código */
            return new Promise(resolve =>{
/* Asigna el objeto rl (la interfaz de lectura creada con readline.
createInterface) a la variable read  */               
                const read = rl
// Muestra un mensaje en la consola pidiendo al usuario que presione Enter para continuar.
                read.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, () =>{
            //Resuelve la promesa una vez que el usuario ha presionado Enter.
                    resolve();
    //vuelve a la funcion menu principal                 
                    MenuPrincipal();
                }) 
    
            })
               
    };

        cargaArchivosProductos() {
            let contador = 0;
//esta deserialisando
/*es el proceso de convertir el estado de un objeto en un formato que 
se pueda almacenar o transportar.*/
            if (datosArchivos.length > 0) {  
/* forEach Toma una función como argumento y llama a esa función 
una vez por cada elemento en la matriz en el orden ascendente de los índices. */                               
                datosArchivos.forEach((objeto) => {
                    contador++;     
/* crea una nueva instancia de un objeto utilizando el constructor Producto. 
El uso de new junto con un nombre de función se utiliza para crear nuevas 
instancias de objetos */                    

                    let producto = new Producto();
/*Se establece el código del producto utilizando el valor almacenado en 
la propiedad codigoProducto del objeto objeto*/
                    producto.setCodigoProducto(objeto.codigoProducto); 
/* Se establece el nombre del producto utilizando el valor almacenado en 
la propiedad nombreProducto del objeto objeto*/                  
                    producto.setNombreProducto(objeto.nombreProducto);
/* Se establece el inventario del producto utilizando el valor almacenado
 en la propiedad inventarioProducto del objeto objeto*/
                    producto.setInventarioProducto(objeto.inventarioProducto);
/* Se establece el precio del producto utilizando el valor almacenado
 en la propiedad precioProducto del objeto objeto*/
                    producto.setPrecioProducto(objeto.precioProducto);

/*La instancia de Producto con sus propiedades configuradas se agrega al array 
#listaProductos de la instancia actual (this).*/
                    this.#listaProductos.push(producto);
                });     
               //imprime el total de productos cargados, con un            
                console.log(`total de productos cargados ===>`.red + ` ${contador}`);
                
            } else {

               //imprime error si no contiene datos                 
                console.log(`ERROR, el archivo datos.json no contiene datos\n`);
            }
            
        }
//un nuevo metodo grabararchivoproducto
        grabaArchivoProducto() {
/* map se utiliza para aplicar algunos cambios en los elementos 
en este caso convierte la clase objetos que tiene atributos metodos y nombre 
y toma solo los atributos  */

            const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
                return {  
/*el método map en la propiedad #listaProductos de la instancia actual 
(representada por this). El propósito de este código es crear un nuevo array 
 llamado instanciaClaseAObjetos*/ 
 
//Extrae el código del producto utilizando el método getCodigoProducto() del objeto producto.
                    codigoProducto: producto.getCodigoProducto(),
//Extrae el nombre del producto utilizando el método getNombreProducto() del objeto producto.
                    nombreProducto: producto.getNombreProducto(),
//Extrae el inventario del producto utilizando el método getInventarioProducto() del objeto producto.
                    inventarioProducto: producto.getInventarioProducto(),
// Extrae el precio del producto utilizando el método getPrecioProducto() del objeto producto.
                    precioProducto: producto.getPrecioProducto(),
                };
            });
/* objeto que se está convirtiendo a una cadena JSON. El segundo argumento,
null, es un reemplazador opcional y el tercer argumento, 2,
es el espacio de indentación que se utiliza para formatear la cadena JSON resultante */
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
/* simplemente declara una variable  llamada nombreArchivo y 
le asigna el valor de la cadena de texto 'datos.json'. */            
            const nombreArchivo = 'datos.json';
/* utiliza para escribir o sobrescribir datos en un archivo de texto.
Aquí, se está utilizando el módulo fs de Node.js, que proporciona una API
para interactuar con el sistema de archivos   */                   
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`);
        };
//nuevo metodo mostrar productos  
        mostrarProductos() {
/* esta dentro de una clase llamada producto. La notación #listaProductos indica que 
listaProductos es un campo privado de la clase. El método forEach se está utilizando 
aquí para iterar sobre los elementos de la lista listaProductos. */ 

/* forEach no crea un nuevo array, sino que simplemente itera sobre los elementos existentes 
y aplica una función proporcionada a cada uno de ellos */
            this.#listaProductos.forEach((producto) => {                
                console.log(
 //imprime los getter  que ya estan guardados en datos.json con un diseño                                     
                    `|    `.red +
                    producto.getCodigoProducto() +
//imprime los getter  que ya estan guardados en datos.json con un diseño
                    `      |`.red + `   ` +
                    producto.getNombreProducto() +
//imprime los getter  que ya estan guardados en datos.json con un diseño
                    `      |`.red + `    ` +
                    producto.getInventarioProducto() +
//imprime los getter  que ya estan guardados en datos.json con un diseño
                    `       |`.red + `  ` +
                    producto.getPrecioProducto() +
                    `      |`.red
                );
            });
        }

 //nuevo metodo agregar nuevo producto        
    agregarNuevoProducto() {        

            function preguntas(){
/* solicita al usuario que ingrese el código del nuevo producto
La respuesta del usuario se captura en la variable codigo*/
                rl.question('Ingrese el código del nuevo producto: '.red, (codigo) => {  
/*solicita al usuario que ingrese el nombre del nuevo producto, La respuesta del
 usuario se captura en la variable nombre*/                                     
                rl.question('Ingrese el nombre del nuevo producto: '.red, (nombre) => {  
/*Solicita al usuario que ingrese el inventario del nuevo producto,
 La respuesta se captura en la variable inventario*/                  
                rl.question('Ingrese el inventario del nuevo producto: '.red, (inventario) => {    
/*Solicita al usuario que ingrese el precio del nuevo producto,
 La respuesta se captura en la variable precio*/                                   
                rl.question('Ingrese el precio del nuevo producto: '.red, (precio) => {
/*Se crea una nueva instancia de la clase Producto*/
            const nuevoProducto = new Producto();
/*Se establece el código del producto utilizando el valor ingresado por el usuario*/ 
                        nuevoProducto.setCodigoProducto(codigo);
/*Se establece el nombre del producto utilizando el valor ingresado por el usuario*/                        
                        nuevoProducto.setNombreProducto(nombre);
/* Se establece el inventario del producto utilizando el valor ingresado por el usuario.
 La función parseInt se utiliza para convertir la entrada del usuario a un número entero*/                        
                        nuevoProducto.setInventarioProducto(parseInt(inventario));
/*Se establece el precio del producto utilizando el valor ingresado por el usuario. 
La función parseFloat se utiliza para convertir la entrada del usuario a un número decimal*/                        
                        nuevoProducto.setPrecioProducto(parseFloat(precio));

/* Se agrega la nueva instancia de Producto al array de productos de la tienda. 
productosTienda es una instancia de un objeto que tiene un método getListaProductos()
 para obtener la lista de productos*/                                        
                        productosTienda.getListaProductos().push(nuevoProducto);
/*se llama a un método grabaArchivoProducto() en productosTienda, 
para guardar la información del producto en los archivos*/                        
                        productosTienda.grabaArchivoProducto();
//llama al metodo pregunta para volverte hacer la preguntas
                        pregunta(); 

                            });
                        });
                    });
                });
          };
//Llama inicialmente a la función pregunta() para comenzar el flujo de preguntas
          pregunta();

          function pregunta(){
/*Hace una pregunta al usuario y espera su respuesta, 
La respuesta se captura en la variable respuesta*/            
            rl.question('¿Deseas agregar un producto? (Si/No): ', (respuesta) => {  
/*Si el usuario responde "si" ignorando mayúsculas/minúsculas, entonces llama
 a la función preguntas(). Esta función, según el código previo que proporcionaste,
  solicitará información sobre un nuevo producto y lo agregará a la lista*/                
                if(respuesta.toLowerCase() === 'si') {
                    preguntas();   
/*Si el usuario responde "no" ignorando mayúsculas/minúsculas,
 entonces llama a la función MenuPrincipal()*/                                         
                }else if(respuesta.toLowerCase() === 'no') {
                    MenuPrincipal();                        
                }else {
/*Si la respuesta del usuario no es "si" ni "no", imprime un mensaje de error 
y vuelve a llamar a la función pregunta()*/                    
                    console.log("Por favor,respuesta 'Si' o 'No' .");
                    pregunta();
                }
            });
        }

       }

        borrarProducto() {
//llama a un método mostrarProductos() de la instancia actual            
        this.mostrarProductos();
        function preguntaBorrar(){
/*Se define una función llamada preguntaBorrar que utiliza rl.question para
 preguntar al usuario si desea borrar un producto. Dependiendo de la respuesta,
  se realiza una acción diferente*/            
        rl.question('¿Deseas borrar un producto? (Si/No): ', (respuesta) => {  
 /*Si el usuario responde "si" ignorando mayúsculas/minúsculas,
  entonces llama a la función Borrar()*/                              
            if(respuesta.toLowerCase() === 'si') {
                Borrar();  
/*Si el usuario responde "no" ignorando mayúsculas/minúsculas,
 entonces llama a la función MenuPrincipal()*/                       
            }else if(respuesta.toLowerCase() === 'no') {
                MenuPrincipal();                        
            }else {
/*Si la respuesta del usuario no es "si" ni "no", imprime un 
mensaje de error y vuelve a llamar a la función preguntaBorrar()*/                
                console.log("Por favor,respuesta 'Si' o 'No' .");
                preguntaBorrar();
            }
        });
    }
/*Llama inicialmente a la función preguntaBorrar() para 
iniciar el flujo de preguntas sobre borrar un producto.*/    
    preguntaBorrar();

    function Borrar ( ) {
/* Se define una función llamada Borrar que utiliza rl.question
 para preguntar al usuario qué producto desea eliminar.*/        
        rl.question('¿Qué producto desea eliminar? ', (codigo) => {
/*Convierte la respuesta del usuario (codigo) a un número entero y
 resta 1 para obtener el índice del producto a borrar*/            
          const indice =parseInt(codigo) - 1;
/* verifica si el índice es válido (no es un número, es menor que 0 o mayor
     o igual al tamaño de datosArchivos), y 
     si no es válido, imprime un mensaje de error*/
          if(isNaN(indice) || indice < 0 || indice >= datosArchivos.length) {
            console.log(`numero no esta`);
            return;
          }
/*Utiliza el método splice para eliminar el elemento en el índice especificado
 indice del array datosArchivos*/
          const objetoBorrar = datosArchivos.splice(indice, 1);

 //Se imprime en la consola el objeto que fue borrado.       
          console.log(`objeto borrado: ${JSON.stringify(objetoBorrar[0])}`);
/*Convierte el array actualizado datosArchivos a formato 
JSON con sangrías para facilitar la lectura.*/          
          const nuevContenidoJSON = JSON.stringify(datosArchivos, null , 2);
//Escribe el nuevo contenido JSON en el archivo datos.json          
          fs.writeFileSync(`datos.json`, nuevContenidoJSON , `utf-8`);
//Llama al método pausa() de la instancia productosTienda 
          productosTienda.pausa();
   
        });      
       };
    }

    CopiarRespaldo(){
//Realiza una copia de respaldo de un archivo JSON.
     function leerArchivo (){
        try {
//Esta función intenta leer el contenido del archivo 'datos.json'
// de forma síncrona utilizando fs.readFileSync()
          const datos = fs.readFileSync('datos.json', 'utf8');
//ue es una función del módulo fs de Node.js. Si la lectura es exitosa,
//convierte los datos leídos de JSON a un objeto JavaScript y los devuelve          
          return JSON.parse(datos);
          } catch (error) {
//Si ocurre algún error durante la lectura, imprime un mensaje de error
// en la consola y devuelve null            
          console.error('Error al leer el archivo JSON:', error.message);
          return null;
        }
      };
      
    function escribirArchivoDeRespaldo  (datos)  {
        try {
//Esta función recibe los datos a respaldar como parámetro. 
//Primero, genera una marca de tiempo actual en formato ISO y la usa
//para crear un nombre de archivo de respaldo único.            
          const fecha = new Date().toISOString().replace(/:/g, '-');
          const nombreArchivoRespaldo = `respaldo_${fecha}.json`;
//escribe los datos en un nuevo archivo utilizando fs.writeFileSync()          
          fs.writeFileSync(nombreArchivoRespaldo, JSON.stringify(datos, null, 2), 'utf8');
          console.log(`Respaldo exitoso en ${nombreArchivoRespaldo}`);
        } catch (error) {
//Si hay un error durante la escritura, se imprime un mensaje de error en la consola.            
          console.error('Error al escribir el archivo de respaldo:', error.message);
        }
      };
//Esta función principal se encarga de coordinar la operación de copia de respaldo
// Primero, llama a leerArchivo() para obtener los datos del archivo JSON principal
// Si la lectura es exitosa y se obtienen datos, llama a escribirArchivoDeRespaldo() 
//para crear el archivo de respaldo.
        function realizarCopiaDeRespaldo () {
// Llama a una función llamada leerArchivo() y 
//guarda el resultado en una variable llamada datos            
        const datos = leerArchivo();
//Comprueba si datos tiene un valor, lo que significa que la lectura del 
//archivo fue exitosa y no es nulo, indefinido o vacío.        
        if (datos) {
// llama a una función llamada escribirArchivoDeRespaldo pasando los datos
//  como argumento. Esto probablemente escribirá el contenido de los datos
// en algún otro archivo como respaldo.
          escribirArchivoDeRespaldo(datos);
        } else {
//se imprime un mensaje de error en la consola indicando que no se pudo 
//realizar la copia de respaldo
          console.log('No se pudo realizar la copia de respaldo debido a un error  en la lectura del archivo JSON.');
        }
      };
//Llama a la función realizarCopiaDeRespaldo      
      realizarCopiaDeRespaldo();
    }


    recuperarDatos(){
// Lee de forma síncrona el contenido del directorio especificado en 
//la variable directorioBackups utilizando la función readdirSync 
//del módulo fs de Node.js.
    const backups = fs.readdirSync(directorioBackups);

// Mostrar las opciones de respaldo disponibles
console.log('Copias de respaldo disponibles:');
//Simplemente imprime un mensaje en la consola indicando que se van a
// mostrar las copias de respaldo disponibles.
backups.forEach((backup, index) => {
//tera sobre la lista de copias de respaldo disponibles (backups)
// utilizando un bucle forEach y muestra cada una de ellas en la consola
// junto con su índice.    
  console.log(`${index + 1}. ${backup}`);
});
// Utiliza la interfaz readline (rl) para hacer una pregunta al usuario 
//en la consola, solicitando que seleccione el número de la copia de respaldo
// que desea restaurar.
rl.question('Selecciona el número de la copia de respaldo que deseas restaurar: ', (indice) => {
//Convierte la respuesta del usuario a un número entero utilizando parseInt y 
//resta 1 para ajustar el índice al estilo del lenguaje, donde los índices
// generalmente comienzan en 0.    
  const indiceBackup = parseInt(indice) - 1;
  //Verifica si el índice seleccionado por el usuario es válido. 
  //Si no lo es (por ejemplo, si no es un número o está fuera de los límites de 
  //las copias de respaldo disponibles), muestra un mensaje de error y cierra 
  //la interfaz readline.
  if (isNaN(indiceBackup) || indiceBackup < 0 || indiceBackup >= backups.length) {
    console.error('Selección no válida. Saliendo.');
    rl.close();
  } else {
const nombreArchivo = 'datos.json';
    try {
      // Leer el contenido del archivo de respaldo y requerirlo
      const indiceBackup = fs.readFileSync(nombreArchivo, 'utf-8');
      const datosRestaurados = require(indiceBackup);

      // Hacer algo con los datos restaurados, por ejemplo, imprimirlos
      console.log('Datos restaurados:');
      console.log(datosRestaurados);

      console.log(`Copia de respaldo "${backups[indiceBackup]}" restaurada con éxito.`);
    } catch (error) {
//Intenta realizar algunas operaciones dentro de un bloque try, y maneja
// cualquier error que pueda ocurrir en el bloque catch. El bloque finally se
// ejecutará independientemente de si se produce un error o no        
      console.error(`Error al restaurar la copia de respaldo: ${error.message}`);
    } finally {
      rl.close();
    }
  }
   });
    }

};

//una clase llamada producto carrito 
class ProductoCarrito extends Producto {
    //atributos
    #codigoProducto;
    //atributos
    #nombreProducto;
    //atributos
    #cantidadProducto;
    //atributos
    #TotalProducto;
    //atributos 
    #documentoCliente;
    //atributos 
    #nombreCliente;
    //atributos 
    #direccionCliente;
 //funcion constructora 
    constructor(){
        super();
        //string
        this.#codigoProducto = '';
        //string
        this.#nombreProducto = '';
        //number
        this.#cantidadProducto = 0;
        //number
        this.#TotalProducto = this.#cantidadProducto * this.getPrecioProducto;
        //string
        this.#documentoCliente = '';
        //string
        this.#nombreCliente = '';
        //string
        this.#direccionCliente = '';
    }
 // set almacenar valores únicos de cualquier tipo
    set setCodigoProducto(value){
        this.#codigoProducto = value;
    }
    /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto */

    get getCodigoProducto(){
        return this.#codigoProducto;
    }
 // set almacenar valores únicos de cualquier tipo
    set setNombreProducto(value){
        this.#nombreProducto = value;
    }
    /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto */

    get getNombreProducto(){
        return this.#nombreProducto;
    }
 // set almacenar valores únicos de cualquier tipo
    set setCantidadProducto(value){
        this.#cantidadProducto = value;
    }
    /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto */
    get getCantidadProducto(){
        return this.#cantidadProducto;   
    }
 // set almacenar valores únicos de cualquier tipo
    set setSubTotalProducto(value){
        this.#TotalProducto = 0;
    }
    /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto*/
    get getSubTotalProducto(){
        return this.#TotalProducto;
    }
 // set almacenar valores únicos de cualquier tipo
    set setDocumentoCliente(value){
        this.#documentoCliente = value;
    }
/*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto*/
    get getDocumentoCliente(){
        return this.#documentoCliente;
    }
 // set almacenar valores únicos de cualquier tipo
    set setNombreCliente(value){
        this.#nombreCliente = value;
    }
/*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto */
    get getnombreCliente(){
        return this.#nombreCliente;
    }
 // set almacenar valores únicos de cualquier tipo
    set setDireccionCliente(value){
        this.#direccionCliente = value;
    }
    /*  Al utilizar la palabra get antes de un método, 
puedes definir este método como un getter en el objeto */

    get getDireccionCliente(){
        return this.#direccionCliente;
    }


    async comprarProductos() {
//Imprime un mensaje en la consola indicando que se van a mostrar los
// productos disponibles para comprar
        console.log('Productos disponibles para comprar:');
        productosTienda.mostrarProductos();
// Utiliza la interfaz readline (rl) para hacer una pregunta al usuario
//en la consola, solicitando que ingrese el código del producto que desea comprar       
    
        rl.question('Ingrese el código del producto que desea comprar: ', (codigo) => {
//Verifica si el usuario ha ingresado "cancelar". Si es así, llama al método
// menuPrincipal() (que no se muestra en el código
// proporcionado) y devuelve, saliendo de la función       
            if (codigo.toLowerCase() === 'cancelar') {
                this.menuPrincipal();
                return;
            }
//Busca el producto correspondiente al código ingresado por el usuario en la 
//lista de productos disponibles utilizando el método find(). Si se encuentra,
//el producto se almacena en la variable productoAComprar    
            const productoAComprar = productosTienda.getListaProductos().find((producto) => producto.getCodigoProducto() === codigo);
            
// Verifica si se encontró un producto con el código ingresado por el usuario  
            if (productoAComprar) {
//Imprime el nombre del producto seleccionado                
                console.log(`Producto seleccionado: ${productoAComprar.getNombreProducto()}`);
//Pregunta al usuario cuántas unidades del producto desea comprar
//La respuesta se pasa como argumento a una función de callback             
                rl.question('¿Cuántas unidades desea comprar?: ', (cantidad) => {
//Convierte la cantidad ingresada por el usuario a
// un número entero utilizando parseInt().                    
                    const unidades = parseInt(cantidad);
 //Verifica si hay suficientes unidades disponibles del producto para la compra.                   
                    if (unidades <= productoAComprar.getInventarioProducto()) {
                        productoAComprar.setInventarioProducto(productoAComprar.getInventarioProducto() - unidades);
                        productosTienda.grabaArchivoProducto();
  //le pide al usuario que dijite su nombre completo   
                        rl.question('Ingrese tu nombre completo: '.red, (nombre) => {       
                            //pide su documento              
                            rl.question('Ingrese tu documento: '.red, (Documento) => {   
                            //su direccion                      
                               rl.question('Ingrese tu direccion: '.red, (Dirrecion) => { 
// Asigna el valor de la variable nombre a la propiedad privada #nombreCliente 
//del objeto actual  y asi igual con todas                     
                                this.#nombreCliente = nombre;
                                this.#documentoCliente = Documento;
                                this.#direccionCliente = Dirrecion;
                                this.#codigoProducto = codigo;
                                this.#cantidadProducto = cantidad;  

// Finalmente, muestra los productos disponibles nuevamente y pausa la ejecución 
//(esto puede ser para permitir al usuario realizar más acciones o para esperar 
//antes de finalizar el programa)                            
                                productosTienda.mostrarProductos();
                                productosTienda.pausa();              
                
                                });
                            });
                         });
                    } else {
                        //sale un comentario si no hay suficientes unidades
                        console.log('No hay suficientes unidades disponibles para comprar.');
                    }

                });
            } else {
//imprime un comentario si pone un codigo que no esta 
                console.log(`No se encontró un producto con el código ${codigo}.`);
                this.comprarProductos(); 
    // Volvemos a pedir el código si no se encontró el producto.
            }
            
      });
    }

   

      
        
  //metodo mostrar factura       
          mostrarDetallesFactura() {
/*estoy imprimiendo todo lo que compre en la tienda
y imprime los tados del cliente el producto que lleva 
cantidad y el precio con su total  */
            console.log('***** Datos cliente ******\n')
            console.log(`Cliente: ${this.#nombreCliente}`);
            console.log(`Documento: ${this.#documentoCliente}`);
            console.log(`Dirección: ${this.#direccionCliente}\n`);
            console.log('***** Datos Compra ******\n')
            console.log(`Nombre Producto: ${this.getNombreProducto}`)
            console.log(`Codigo producto: ${this.#codigoProducto}`)
            console.log(`numero de productos Comprados: ${this.#cantidadProducto}\n`)
            console.log(`Total apagar: ${this.#TotalProducto}`)
          }   
        };
//esta haciendo una nueva instancia a ProducTotienda 
/*asigna esta instancia a la variable productosTienda. Esto significa que
 productosTienda ahora hace referencia a un objeto que es una instancia
  de la clase ProductoTienda*/
   let productosTienda = new ProductoTienda();
   //igual con este
   let cliente = new ProductoCarrito();



    function MenuPrincipal(){
// Limpia la consola para una presentación más limpia del menú.        
        console.clear();
/* Utiliza la interfaz readline (rl) para hacer una pregunta al 
usuario en la consola, solicitando que seleccione una opción del menú. */        
        rl.question(` 
        *********************************
        *    1.Cargar Datos             *
        *    2.Copia de Respaldo        *
        *    3.Reparacion de Datos      *
        *    4.grabar nuevos Productos  *
        *    5.Borrar Producto          *
        *    6.Comprar Producto         *
        *    7.Imprimir Factura         *
        *    0.Cerrar App               *
        ********************************* `.green + `
        
            Selecciona una opcion:`.yellow, (opcion) =>{

 // Evalúa la opción ingresada por el usuario y ejecuta el código
 // correspondiente según la opción seleccionada.       
    switch (opcion) {
/*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/        
        case `1`: 
            mostrarDatos();
            break;
/*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/            
        case `2`:
            mostrarCopiaRespaldo();
            break   
/*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/            
        case `3` :
            mostrarReparacionDatos();
            break;   
 /*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/            
        case `4`:
            mostrarAgregarProducto();
            break;
 /*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/           
         case `5`:
            mostrarBorrarProducto();
            break;
 /*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/           
        case `6`:
            MostrarCompraProducto();
            break;
 /*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/           
        case `7`:
            MostrarFactura();
            break;
 /*corresponde a una opción del menú. Si el usuario selecciona 
una opción válida, se ejecutará el código asociado a esa opción.*/           
        case `0`:
                rl.close();
            break;        
        default:
 /* se imprimirá un mensaje indicando que la opción no
  es válida y se llamará a MenuPrincipal() nuevamente */           
         console.log(`opcion no valido, por favor seleccione una opcion valida`);
         MenuPrincipal();
            break;
       }
    }

)}

    function mostrarDatos(){
        //limpia la consola
        console.clear();
           console.log(`********************************`.blue);
           console.log(`*           productos         **`.blue);
           console.log(`********************************\n`.blue);
           //llamo al metodo cargar archivos productos 
           productosTienda.cargaArchivosProductos();
           //llamo al metodo pausa que se encuentra en la clase producto tienda
           productosTienda.pausa();     
    };

    function mostrarCopiaRespaldo(){
        //limpia la consola
        console.clear();
           console.log(`********************************`.blue);
           console.log(`*       copia respaldo        **`.blue);
           console.log(`********************************\n`.blue);
           //llama al metodo copiarespaldo 
           productosTienda.CopiaRespaldo();
           //llamo al metodo pausa que se encuentra en la clase producto tienda
           productosTienda.pausa();     
    };

    function mostrarReparacionDatos(){
        //limpia la consola
        console.clear();
        console.log(`***********************************`);
        console.log(`*          Reparar datos         **`);
        console.log(`***********************************`);
        //llama al metodo recuperardatos
        productosTienda.recuperarDatos();
    }

    function mostrarAgregarProducto()  {
        //limpia la consola    
        console.clear();
        console.log(`***********************************`);
        console.log(`*         productos aguardar     **`);
        console.log(`***********************************`);
        //llama al metodo mostrarproducto
        productosTienda.mostrarProductos();
        //llama al metodo agregar nuevo producto 
        productosTienda.agregarNuevoProducto();

};

      function mostrarBorrarProducto()  { 
        //limpia la consola   
      console.clear();
      console.log(`***********************************`);
      console.log(`*         Borrar producto        **`);
      console.log(`***********************************`);
      //llama al metodo borrar producto 
      productosTienda.borrarProducto();
};

    function MostrarCompraProducto (){
        //limpia la consola
    console.clear();
    console.log(`***********************************`);
    console.log(`*         Compra producto        **`);
    console.log(`***********************************`);
    //llama al metodo comprarproducto 
    cliente.comprarProductos();
}

function MostrarFactura(){
    //limpia la consola
    console.clear();
    console.log(`***********************************`);
    console.log(`*         Compra producto        **`);
    console.log(`***********************************`);
    //llama al metodo mostrar detalles factura 
    cliente.mostrarDetallesFactura();
}



function main(){
    //limpia la consola
    console.clear();
    //llama la funcion menu 
    MenuPrincipal()
}
//Llama a la función main(), que inicia el programa. 
//Esto hace que se limpie la consola y se muestre el menú principal.
main();








