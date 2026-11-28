export const ordenes = [
  {
    id: 1001,
    correo: 'cliente1@correo.cl',
    fecha: '2026-11-18T15:30:00Z',
    total: 500,
    detalles: [
      { productoId: 1, nombre: 'Item 1', cantidad: 2, precioUnitario: 100, subtotal: 200 },
      { productoId: 3, nombre: 'Item 3', cantidad: 1, precioUnitario: 300, subtotal: 300 },
    ],
  },
  {
    id: 1002,
    correo: 'cliente2@correo.cl',
    fecha: '2026-11-19T10:05:00Z',
    total: 600,
    detalles: [
      { productoId: 2, nombre: 'Item 2', cantidad: 3, precioUnitario: 200, subtotal: 600 },
    ],
  },
  {
    id: 1003,
    correo: 'cliente1@correo.cl',
    fecha: '2026-11-20T18:45:00Z',
    total: 300,
    detalles: [
      { productoId: 1, nombre: 'Item 1', cantidad: 1, precioUnitario: 100, subtotal: 100 },
      { productoId: 2, nombre: 'Item 2', cantidad: 1, precioUnitario: 200, subtotal: 200 },
    ],
  },
]