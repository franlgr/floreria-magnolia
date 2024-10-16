

    function agregarRosa() {
        // Obtener el carrito actual del localStorage (o un array vacío si no existe)
        const colorSeleccionado = document.getElementById('colorSelectRosa').value || 'rojo'; 
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const producto = {
            imagen: './img/rosa.jpg', // Imagen de ejemplo
            titulo: 'Rosa',
            color: colorSeleccionado,
            precio: 2000,
            cantidad: 1,
          };

        // Buscar si el producto ya existe en el carrito (basado en su título y color)
        const productoExistente = carrito.find(
            (item) => item.titulo === producto.titulo && item.color === producto.color
        );

        if (productoExistente) {
            // Si el producto ya está en el carrito, aumentamos la cantidad
            productoExistente.cantidad += producto.cantidad;
            productoExistente.precio += producto.precio;
        } else {
            // Si no existe, lo agregamos al carrito
            carrito.push(producto);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // alert('Producto agregado al carrito');
        }

        function agregarSanVicente() {
            // Obtener el carrito actual del localStorage (o un array vacío si no existe)
            const colorSeleccionado = document.getElementById('colorSelectSanVicente').value || 'rojo'; 
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
            const producto = {
                imagen: './img/san-vicente.jpg', // Imagen de ejemplo
                titulo: 'San Vicente',
                color: colorSeleccionado,
                precio: 1000,
                cantidad: 1,
              };
    
            // Buscar si el producto ya existe en el carrito (basado en su título y color)
            const productoExistente = carrito.find(
                (item) => item.titulo === producto.titulo && item.color === producto.color
            );
    
            if (productoExistente) {
                // Si el producto ya está en el carrito, aumentamos la cantidad
                productoExistente.cantidad += producto.cantidad;
                productoExistente.precio += producto.precio;
            } else {
                // Si no existe, lo agregamos al carrito
                carrito.push(producto);
            }
    
            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
    
            // alert('Producto agregado al carrito');
            }

            function agregarAstromelia() {
                // Obtener el carrito actual del localStorage (o un array vacío si no existe)
                const colorSeleccionado = document.getElementById('colorSelectAstromelia').value || 'rojo'; 
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
                const producto = {
                    imagen: './img/astromelias.jpg', // Imagen de ejemplo
                    titulo: 'Astromelia',
                    color: colorSeleccionado,
                    precio: 1000,
                    cantidad: 1,
                  };
        
                // Buscar si el producto ya existe en el carrito (basado en su título y color)
                const productoExistente = carrito.find(
                    (item) => item.titulo === producto.titulo && item.color === producto.color
                );
        
                if (productoExistente) {
                    // Si el producto ya está en el carrito, aumentamos la cantidad
                    productoExistente.cantidad += producto.cantidad;
                    productoExistente.precio += producto.precio;
                } else {
                    // Si no existe, lo agregamos al carrito
                    carrito.push(producto);
                }
        
                // Guardar el carrito actualizado en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));
        
                // alert('Producto agregado al carrito');
                }

                function agregarGirasol() {
                    // Obtener el carrito actual del localStorage (o un array vacío si no existe)
                    const colorSeleccionado = document.getElementById('colorSelectGirasol').value || 'rojo'; 
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
                    const producto = {
                        imagen: './img/girasol.jpg', // Imagen de ejemplo
                        titulo: 'Girasol',
                        color: colorSeleccionado,
                        precio: 3000,
                        cantidad: 1,
                      };
            
                    // Buscar si el producto ya existe en el carrito (basado en su título y color)
                    const productoExistente = carrito.find(
                        (item) => item.titulo === producto.titulo && item.color === producto.color
                    );
            
                    if (productoExistente) {
                        // Si el producto ya está en el carrito, aumentamos la cantidad
                        productoExistente.cantidad += producto.cantidad;
                        productoExistente.precio += producto.precio;
                    } else {
                        // Si no existe, lo agregamos al carrito
                        carrito.push(producto);
                    }
            
                    // Guardar el carrito actualizado en localStorage
                    localStorage.setItem('carrito', JSON.stringify(carrito));
            
                    // alert('Producto agregado al carrito');
                    }



        // Llamar a la función para agregar el producto
        // agregarAlCarrito(productoEjemplo);