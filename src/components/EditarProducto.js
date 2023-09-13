import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {editarProductoAction} from '../actions/productoActions'
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // nuevo state de producto
    const [producto, guardarProducto] = useState({
        producto: '',
        precio: ''
    })

    
    // Obtener el state
    const productoEditar = useSelector(state => (state.productos.productoeditar))
    
    const {nombre, precio} = producto
    
    // Producto a editar
    const submitEditarProducto = e => {
        e.preventDefault()

        dispatch(editarProductoAction(producto))
        navigate('/')
    }

    // Llenar el state automáticamente
    useEffect(() => {
        guardarProducto(productoEditar)
    }, [productoEditar])

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: Number(e.target.value)
        })
    }

    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Editar Producto</h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => onChangeFormulario(e)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name='precio'
                                    value={precio}
                                    onChange={e => onChangeFormulario(e)}
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default EditarProducto;