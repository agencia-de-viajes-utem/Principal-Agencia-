import Buscador from "../Pages/PagBuscador/Buscador";
import PagBusqueda from "../Pages/PagBusqueda/PagBusqueda";
import PagDetalle from "../Pages/PagDetalle/PagDetalle";

export const routes = [
   { path: '/', component: Buscador },
   { path: '/Busqueda', component: PagBusqueda },
   { path: '/Detalle', component: PagDetalle }
];