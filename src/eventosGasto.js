import cargarGastos from './cargarGastos';
import cargarTotalGastado from './cargarTotalGastado';
import { abrirFormularioGasto } from "./eventoBtnFormularioGasto";

const contenedorGasto = document.getElementById('gastos');
contenedorGasto.addEventListener('click', (e) => {
    const gasto = e.target.closest('.gasto');

    // Comprobamos si estamos haciendo click en un gasto.
    if (gasto) {
        if(gasto.scrollLeft > 0){;
            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        } else {
            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest',
            });
        }
    }

    // Editar gasto
    if (e.target.closest('[data-accion="editar-gasto"]')) {
        // Obtener el id del gasto que queremos editar.
        const id = gasto.dataset.id;
        
        // Obtener los gastos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let precio = '';
        let descripcion = '';
        
        // Comprobamos si hay gastos guardados.
        if(gastosGuardados && gastosGuardados.length > 0){
            gastosGuardados.forEach((gasto) => {
                if(gasto.id === id) {
                    precio = gasto.precio;
                    descripcion = gasto.descripcion
                }
            });

            // Le ponemos la descripcion y el precio a los inputs del formulario.
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = precio;
            document.querySelector('#formulario-gasto').dataset.id = id;

            abrirFormularioGasto('editarGasto');
            
        }        
    }

    // Borrar gasto
    if(e.target.closest('[data-accion="eliminar-gasto"]')){
        // Obtener el id del gasto que queremos eliminar.
        const id = e.target.closest('.gasto').dataset.id;

        // Obtener los gastos guardados 
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        
        if(gastosGuardados) {
            const nuevosGastos = gastosGuardados.filter((gasto) => {
                if(gasto.id !== id){
                    return gasto;
                }
            });

            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        cargarGastos();
        cargarTotalGastado();
    }
});