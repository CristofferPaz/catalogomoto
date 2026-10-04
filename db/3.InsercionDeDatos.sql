\connect "catalogoMotos"

/* La contraseña corresponde a sabino007232 y fue generada con bcrypt, 8 saltos. */
INSERT INTO administrador (usuario, contrasena)
VALUES ('sabino007', '$2b$08$rEvAwvuxiOlBjwo4FPLHu.XpoS4fRxECvleVKNrPOGeT3gD/4Z4om'), 
       ('feresdev', '$2b$08$EOeZPOsEyuokysrQU1sOH.yMX9F.cKbmxwL5vIiMjFUq9ibopPv6');

INSERT INTO moto
    (modelo, marca, categoria, cilindrada, precio, imagenlink, stock, descripcion)
VALUES
    ('BROZZ-250', 'Power Motorcycle', 'Aventura', 250, 21200.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/brozz-250.webp', 8, 'Motocicleta de aventura de 250 cc, ideal para recorridos urbanos y de carretera.'),
    ('FOX RS-250', 'Power Motorcycle', 'Deportiva', 250, 25100.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/fox-rs-250-1.webp', 6, 'Motocicleta deportiva de 250 cc con diseño dinámico y conducción ágil.'),
    ('NXR-250', 'Power Motorcycle', 'Aventura', 250, 24800.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/nxr-250.webp', 5, 'Modelo versátil de 250 cc preparado para ciudad y caminos de aventura.'),
    ('LIBERTY-200', 'Power Motorcycle', 'Deportiva', 200, 17100.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/liberty-200.webp', 10, 'Motocicleta deportiva de 200 cc para desplazamientos cómodos y eficientes.'),
    ('BIT-150', 'Power Motorcycle', 'Automaticas', 150, 17500.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/bit-150.webp', 12, 'Motocicleta automática de 150 cc, económica y funcional para uso diario.'),
    ('CGL-150', 'Power Motorcycle', 'utilitarias', 150, 14800.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150.webp', 9, 'Motocicleta utilitaria de 150 cc con mantenimiento sencillo.'),
    ('CGL-150E', 'Power Motorcycle', 'utilitarias', 150, 12900.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cgl-150-e-1.webp', 7, 'Versión mejorada de 150 cc, pensada para recorridos urbanos.'),
    ('CB1-150', 'Power Motorcycle', 'utilitarias', 150, 14700.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/cb1-150.webp', 6, 'Motocicleta utilitaria compacta de 150 cc para conducción urbana.'),
    ('BLITZ-135', 'Power Motorcycle', 'Scoter', 135, 12900.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/blitz-135.webp', 11, 'Scooter de 135 cc, ágil y práctico para la movilidad cotidiana.'),
    ('BIS-135', 'Power Motorcycle', 'Scoter', 135, 12900.00, 'https://www.powermotorcycle.com.bo/assets/img/motos/bis-135.webp', 10, 'Scooter compacto de 135 cc con consumo eficiente y manejo sencillo.');
