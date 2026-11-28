import { ruta } from '../utils/ruta'

export const productos = [
  {
    id: 1,
    nombre: 'Item 1',
    precio: 100,
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    stock: 10,
    categoria: { id: 1, nombre: 'Recursos' },
    imagen: ruta('imagenes/Resource_Orange.jpg'),
  },
  {
    id: 2,
    nombre: 'Item 2',
    precio: 200,
    descripcion: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    stock: 5,
    categoria: { id: 2, nombre: 'Accesorios' },
    imagen: ruta('imagenes/1_OrokittyGlyph.jpg'),
  },
  {
    id: 3,
    nombre: 'Item 3',
    precio: 300,
    descripcion: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    stock: 8,
    categoria: { id: 3, nombre: 'Criaturas' },
    imagen: ruta('imagenes/fih.jpg'),
  },
]