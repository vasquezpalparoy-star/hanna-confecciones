# HANNA · Confecciones y Creaciones

Catálogo con textos e imágenes editables y WhatsApp.

GitHub Pages sirve `docs/` desde `main`. Dominio: `hanna.grafiplotvasquez.com`.

Para cambiar el diseño: `npm install`, `npm run build` y sube los cambios incluyendo `docs/`.

Para editar textos e imágenes: pulsa el logo, introduce HANNA y guarda con Google usando `vasquezpalparoy@gmail.com`. El contenido se comparte con la web anterior en Firebase Realtime Database, `/sites/hanna`.

La contraseña del panel es una barrera visual de esta web estática. Firebase controla los permisos reales: solo la cuenta verificada del propietario puede escribir.

DNS: CNAME `hanna` hacia `vasquezpalparoy-star.github.io`, solo DNS. Firebase Authentication debe autorizar `hanna.grafiplotvasquez.com`.

## Seguimiento privado de pedidos

- El botón **Estado de pedido** abre el acceso de clientes con usuario y contraseña.
- En el logo HANNA, abre Configuraciones con la contraseña del panel y entra con Google usando `vasquezpalparoy@gmail.com`. Pulsa **Administrar pedidos y clientes**.
- **Crear acceso de cliente** registra un usuario de 3–40 caracteres y una contraseña de al menos 8 caracteres. Entrega esos datos por un canal privado; la contraseña no se guarda en Realtime Database.
- Selecciona el cliente, pulsa **Nuevo pedido**, completa los datos y marca tareas. Pulsa **Guardar avance del pedido**. Cada cliente puede tener varios pedidos.
- La muestra física es opcional y solo cuenta para el avance cuando se activa en ese pedido. Las seis etapas y sus subtareas se calculan a partir de las casillas guardadas.
- La vista del cliente consulta Firebase cada 20 segundos mientras está abierta, además del botón Actualizar.
- Authentication debe tener habilitado Correo electrónico/contraseña. Los usuarios se representan internamente con una dirección técnica `usuario@clientes.hanna.invalid`; no se usa para enviar correos. La recuperación de accesos requiere administración en Firebase, no un correo automático.
- Los datos privados están en `/hannaOrders/{uid}`; los textos públicos siguen en `/sites/hanna`. Publica `firebase.database.rules.json` para mantener el aislamiento. Solo el propietario verificado puede escribir pedidos; el cliente únicamente lee su nodo.
- Si crear el acceso falla después del registro en Auth, vuelve a intentarlo con el mismo usuario y contraseña para completar el perfil sin duplicarlo.
