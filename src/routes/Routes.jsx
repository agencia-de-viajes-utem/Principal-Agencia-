import Buscador from "../pages/PagBuscador/Buscador";
import PagBusqueda from "../pages/PagBusqueda/PagBusqueda";
import PagDetalle from "../pages/PagDetalle/PagDetalle";

export const routes = [
   { path: '/', component: Buscador },
   { path: '/Busqueda', component: PagBusqueda },
   { path: '/Detalle', component: PagDetalle }
];