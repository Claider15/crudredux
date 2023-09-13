import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch sirve para mandar a ejecutar las acciones que tengamos y useSelector es una forma en la que vas a acceder al state dentro del componente

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import {mostrarAlerta, ocultarAlertaAction} from '../actions/alertaActions'

const NuevoProducto = () => {
    let navigate = useNavigate()

    // State adel componente
    const [nombre, guardarNombre] = useState('')
    const [precio, guardarPrecio] = useState(0)

    // utilizar useDispatch y te crea una función
    const dispatch = useDispatch()

    //Acceder al state del store
    const cargando = useSelector(state => state.productos.loading) // useSelector se usa para acceder al state
    const error = useSelector(state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta)

    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto)) // dispatch se va a utilizar para mandar a llamar las funciones (actions). Los actions son las funciones

    // Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()

        // validar formulario
        if(nombre.trim() === '' || precio <= 0) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p-3'
            }
            dispatch(mostrarAlerta(alerta))

            return 
        }

        // revisar si no hay errores
        dispatch(ocultarAlertaAction()) // independientemente de que el state tenga o no un objeto de errores, lo vamos a cambiar a null

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        //Redireccionar a Home
        navigate('/')
    }


    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Agregar Nuevo Producto</h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
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
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >
                                Agregar
                            </button>
                        </form>

                        {cargando ? <p>cargando...</p> : null}
                        {error ? <p className='alert alert-danger p-2 mt-4 text-center'>Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default NuevoProducto;