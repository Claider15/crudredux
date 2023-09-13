// import { type } from '@testing-library/user-event/dist/type'
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
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
// import Productos from '../components/Productos'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        // console.log(producto) // producto es lo que tenemos en el componente (NuevoProducto) o en la vista se pasa al 
        // action que es donde se realizan las consultas a la BD y también se manda ejecutar el reducer para modificar
        // el state
        dispatch(agregarProducto())

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto) // esto es lo que le pasas hacia la API

            // Sti todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto)) // esto es lo que le pasas al state

            // Alerta (Sweetealert2)
            Swal.fire(
                'Correcto', 'El producto se agregó correctamente', 'success'
            )

        } catch (error) {
            console.log(error)
            // Si hay un error, cambiar el state
            dispatch(agregarProductoError(true))

            // Alerta Error (Sweetealert2)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, inténta de nuevo'
            })
        }
    }
} // en esta parte es donde se inserta en la BD y también se manda a ejecutar el reducer para modificar el state

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// payload sería la parte que va a modificar los datos (modificar el state). Si solamente le diciendo que vamos
// a agregar un producto, propablemente no tengamos ningún payload (no es obligatorio que se use)

// siempre que tienes una función  en este archivo (AGREGAR_PRODUCTO en productoActions), también tienes que definirlo
// en tu reducer (productosReducer) que sería el que modificaría el state


// si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
}) // se usa payload porque como es un éxito y los datos ya se guardaron en la BD, se va a modificar el state

// si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// Función que descarga los productos de la BD
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductoError(true))
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error, inténta de nuevo'
                })
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = Productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: Productos
})

const descargaProductoError = estado => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            // Si se elimina, mostrar alerta             
            Swal.fire(
                'Eliminado!',
                'Tu archivo se eliminó correctamente.',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError= () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la API y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO // no cambia nada el state
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto // producto editado para modificar el state y se muestre el producto editado
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})