import React, {Fragment, useEffect} from 'react'
import Producto from './Producto';

import { useDispatch, useSelector } from 'react-redux'; // useSelector es la forma en que obtienes el state
import {obtenerProductosAction} from '../actions/productoActions'

const Productos = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Consultar la API
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
        //eslint-disable-next-line
    }, [])

    // Obtener el state
    const productos = useSelector(state => state.productos.productos)
    const error = useSelector(state => state.productos.error)
    const cargando = useSelector(state => state.productos.loading)

    return ( 
        <Fragment>
            <h2 className='text-center my-5'>Listado de Productos</h2> 

            {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Hubo un error</p> : null}

            {cargando ? <p className='text-center'>Cargando...</p> : null}

            <table className='table table-striped'>
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.length === 0 ? 'No hay Productos' : (
                        productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Productos;