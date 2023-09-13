import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'

// Cada reducer tiene su propio state (el state siempre es un objeto)
const initialState = {
    productos: [], // el arreglo es el tipo de datos adecuado cuando vas a tener un listado (cuando se haga la consulta)
    error: null,
    loading: false, // puede ser que la API tarde un poco en descargar todos los productos. Cuando comencemos a hacer la consulta, va a cambiar a true (vamos a mostrar un mensaje que diga "cargando...")
    productoeliminar: null,
    productoeditar: null
}

export default function productosReducer(state = initialState, action) {
    switch (action.type) { // todo el reducer es un switch
        // los case van a describir lo que pasa en nuestra aplicación y van cambiando de acuerdo al state con base al payload
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO: // en caso de que se esté ejecutando AGREGAR_PRODUCTO, vamos a retornar una copia del state como esté y cuando comienzas a gregar un producto; el loading(en initialState) va a pasar de false a true
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false, // como ya se guardó en la BD, loading ya vuelve a ser false
                productos: [...state.productos, action.payload]
            }
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null 
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoeditar: action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto =>producto.id === action.payload.id ? 
                    producto = action.payload : producto)
            }

        default:
            return state;
    }
} // el store le pasa el state y la acción que va a ejecutar. Si no se le pasa nada, inicial con el initialState