import { ruta } from '../utils/ruta'

const categorias = {
  warframes: { id: 1, nombre: 'Warframes' },
  armas: { id: 2, nombre: 'Armas' },
  mods: { id: 3, nombre: 'Mods' },
  platinum: { id: 4, nombre: 'Platinum' },
  recursos: { id: 5, nombre: 'Recursos' },
}

export const categoriasMock = Object.values(categorias)

export const productosMock = [
  { id: 1, nombre: 'Rhino', descripcion: 'Warframe tanque con gran resistencia y habilidades de control de masas.', precio: 180, stock: 12, imagen: ruta('imagenes/logo.webp'), categoria: categorias.warframes },
  { id: 2, nombre: 'Volt', descripcion: 'Warframe eléctrico, veloz y versátil para principiantes.', precio: 90, stock: 25, imagen: ruta('imagenes/logo.webp'), categoria: categorias.warframes },
  { id: 3, nombre: 'Soma Prime', descripcion: 'Rifle automático de cadencia altísima y gran precisión.', precio: 60, stock: 18, imagen: ruta('imagenes/fih.jpg'), categoria: categorias.armas },
  { id: 4, nombre: 'Braton Prime', descripcion: 'Rifle clásico mejorado, confiable en cualquier misión.', precio: 40, stock: 30, imagen: ruta('imagenes/fih.jpg'), categoria: categorias.armas },
  { id: 5, nombre: 'Serration', descripcion: 'Mod que aumenta el daño de los rifles.', precio: 20, stock: 50, imagen: ruta('imagenes/1_OrokittyGlyph.jpg'), categoria: categorias.mods },
  { id: 6, nombre: 'Vitality', descripcion: 'Mod que incrementa la salud máxima del Warframe.', precio: 25, stock: 40, imagen: ruta('imagenes/1_OrokittyGlyph.jpg'), categoria: categorias.mods },
  { id: 7, nombre: 'Ranura de Warframe', descripcion: 'Una ranura adicional para guardar otro Warframe.', precio: 20, stock: 100, imagen: ruta('imagenes/logo.webp'), categoria: categorias.platinum },
  { id: 8, nombre: 'Ranura de Arma', descripcion: 'Una ranura adicional para tu arsenal.', precio: 12, stock: 100, imagen: ruta('imagenes/logo.webp'), categoria: categorias.platinum },
  { id: 9, nombre: 'Célula Orokin', descripcion: 'Recurso raro necesario para construir y mejorar equipamiento.', precio: 15, stock: 60, imagen: ruta('imagenes/Resource_Orange.jpg'), categoria: categorias.recursos },
  { id: 10, nombre: 'Paquete de Ferrita', descripcion: 'Lote de ferrita para fabricar armas y Warframes.', precio: 10, stock: 80, imagen: ruta('imagenes/Resource_Orange.jpg'), categoria: categorias.recursos },
]
