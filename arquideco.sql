create database arquideco;
use arquideco;

create table Inmueble(
idInmueble int primary key auto_increment,
numPisos int not null,
estadoConstruccion varchar(20) not null,
areaTerreno varchar(10) not null,
areaConstruida varchar(10) not null,
numHabitaciones int not null,
imagenes blob not null,
numBaños int not null,
direccion varchar (50) not null,
barrio varchar(50) not null,
precio Long not null,
descripcionProyecto text null,
tipoInmueble varchar(20) not null,
clasificacion boolean not null
);

create table Rol(
idRol int primary key auto_increment,
nombreRol varchar(30) not null
);

create table TipoReserva(
idTipoReserva int primary key auto_increment,
nombreTipoReserva varchar(50) not null
);

create table Usuario(
idUsuario int primary key auto_increment,
nombre varchar(30) not null,
apellido varchar(30) not null,
correoElectronico varchar(40) not null,
numIdentificacion int not null,
tipoIdentificacion varchar (30),
telefono Long,
contraseña varchar(100) not null,
estado boolean,
idRolFK int not null,
foreign key(idRolFK) references Rol (idRol)
);

create table usuarioInmueble(
idUsuarioInmueble int primary key auto_increment,
idUsuarioFK int not null,
foreign key (idUsuarioFK) references Usuario (idUsuario),
idInmuebleFK int not null,
foreign key (idInmuebleFK) references Inmueble(idInmueble)
);


create table Solicitud(
idSolicitud int primary key auto_increment,
FechaSolicitud date not null,
HoraSolicitud time not null,
estado boolean
);

create table detalleTipoReserva(
idDetalleReserva int primary key auto_increment,
datoDetTipoReserva varchar(50) not null,
idTipoReservaFK int not null,
foreign key (idTipoReservaFK) references TipoReserva (idTipoReserva)
);

create table SolicitudUsuario(
idSolicitudUsuario int primary key auto_increment,
idSolictudFK int not null,
foreign key (idSolictudFK) references Solicitud (idSolicitud),
idClienteFK int not null,
foreign key (idClienteFK) references Usuario (idUsuario),
idAsesorFK int not null,
foreign key (idAsesorFK) references Usuario (idUsuario)
);

create table DatosSolicitud(
idDatosSolicitud int primary key auto_increment,
datoSolicitud text not null,
idDetalleReservaFK int not null,
foreign key (idDetalleReservaFK) references detalleTipoReserva (idDetalleReserva),
idSolicitudFK int not null,
foreign key (idSolicitudFK) references Solicitud (idSolicitud)
);

insert into Rol(idRol,nombreRol)
values (1,"cliente"),
(2,"administrador"),
(3,"asesor");

insert into tiporeserva(nombretiporeserva)
values ("Asesoria legal"),
("Avaluo"), 
("Diseño Aquitectonico"), 
("Documentos"),
("Busqueda de inmuebles");

/*la constraseña está en SHA-256*/
INSERT INTO Usuario (nombre, apellido, correoElectronico, numIdentificacion,telefono, tipoIdentificacion, contraseña, idRolFK, estado)
VALUES ('Juan', 'Pérez', 'loreingp@hotmail.com', 123456789, 3103480318, 'Cedula de ciudadania', 'ac1be349ec1a3cf8bf3d96d11b62c7ec015355b450093a33e79d3cc8f0b9232e', 1, true),
('María', 'Gómez', 'loreingp@hotmail.com', 987654321,3103480318, 'Pasaporte', '33e7183996951c46189f74338104f97e2b05f3d1a1d8d8e11de36c24f431a1d5', 2, false),
('Carlos', 'López', 'loreingp@hotmail.com', 555555555,3103480318, 'Cedula de ciudadania', '0c34ab7c7c92917a9d6cd7392185cd189ae1e6f910d65d679b8985248ac3d35f', 3, true),
('Laura', 'Martínez', 'loreingp@hotmail.com', 111111111,3103480318, 'Pasaporte', '343eaeac32d1259f7b0d3bfdef3fb9ea65129b6844f034ff184b25b3f130664', 1, false),
('Ana', 'Rodríguez', 'loreingp@hotmail.com', 999999999,3103480318, 'Cedula de ciudadania', '13e83664ea35db30095e98492a7b0e14bbcbfadd23d7b4cb3bf6e1105b3ff54', 3, true),
 ('Luis', 'Hernández', 'loreingp@hotmail.com', 777777777, 3103480318, 'Cedula de ciudadania', '4a2e3bb4f24a36052933bf7aee2a5a1e17ef510d3d32e02bf2d195f60b7f66db', 1, true),
('Diana', 'Ramírez', 'loreingp@hotmail.com', 888888888, 3103480318, 'Pasaporte', '9d55c028a2b0e5718ce7f36de99ea7684dbef1d751a81bb3c6e63519b961731f', 1, true),
('Roberto', 'García', 'loreingp@hotmail.com', 666666666, 3103480318, 'Cedula de ciudadania', '6b82e4c86487dd01d13e15ad1d52f96311c2764a35d086b8d76e1e5b6e4e6410', 1, true),
('Sofía', 'Fernández', 'loreingp@hotmail.com', 444444444, 3103480318, 'Pasaporte', '28d75893b24ac7c112b6b32a0807633c2a1a1d3e387a9d4ed94eb64c9ec41b2d', 1, true),
('Eduardo', 'Gómez', 'loreingp@hotmail.com', 222222222, 3103480318, 'Cedula de ciudadania', '8e235bb9521bb70254c6c23fc1e0bf6841e9a193508b1b856c2f7ebcb5cd80de', 1, true);
    
insert into detalletiporeserva(datoDetTipoReserva, idTipoReservaFK)
values ("Descripcion",1),
("tipo avaluo",2),
("certificación catastral",2),
("certificado de libertad",2),
("Descripcion",3),
("tipo documento",4),
("descripcion",5);

INSERT INTO Solicitud (FechaSolicitud, HoraSolicitud, estado)
VALUES ('2023-09-07', '14:30:00', true),
('2023-09-07', '15:00:00', true),
('2023-09-07', '16:00:00' , false),
('2023-09-07', '17:00:00', true),
('2023-09-07', '18:00:00', false),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', false),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', true),
('2023-09-07', '18:00:00', true);

insert into solicitudusuario(idSolictudFK, idClienteFK, idAsesorFK)
values (1, 1, 3),
(4, 4, 3),
(5, 4, 3),
(6, 4, 3),
(7, 4, 3),
(8, 4, 3),
(9, 4, 3),
(10, 4, 3),
(11, 4, 3),
(12, 4, 3),
(13, 4, 3)
;

insert into datossolicitud(datoSolicitud,idDetalleReservaFK,idSolicitudFK)
values("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,1),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,5),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,6),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,7),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,8),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,9),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,10),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,11),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,12),
("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,13),
("Para venta",2,4),
("image1.jpg",3,4),
("image2.jpg",4,4);

select * from inmueble;
select * from rol;
select * from usuario;
select * from solicitud;
select * from solicitudusuario;
select * from tiporeserva;
select * from detalletiporeserva;
select * from datossolicitud;


/*Trae asesores sin reservas a esa fecha y hora, puedes probar con call sp_dispo_asesores('2023-09-07', '15:00:00') trae a ana*/
DELIMITER //
CREATE PROCEDURE sp_dispo_asesores(fechaReserva DATE, horaReserva TIME)
BEGIN
    SELECT distinct u.idUsuario, u.nombre, u.idRolFK
    FROM usuario u
    LEFT JOIN solicitudusuario s ON u.idUsuario = s.idAsesorFK
    LEFT JOIN solicitud sol ON s.idSolictudFK = sol.idSolicitud
    WHERE (sol.FechaSolicitud IS NULL 
        OR (sol.FechaSolicitud <> fechaReserva AND sol.HoraSolicitud <> horaReserva))
        AND u.idRolFK = 3;
END;
//
DELIMITER ;

/*insertar datos en la tabla solicitud*/
DELIMITER //
CREATE PROCEDURE sp_insert_solicitud(fechaReserva DATE, horaReserva TIME)
BEGIN
    INSERT INTO solicitud (fechaSolicitud, horaSolicitud, estado)
    VALUES (fechaReserva, horaReserva, 1);
END;
//
DELIMITER ;


/*Consultar id solicitud creada anteriormente*/
DELIMITER //
CREATE PROCEDURE sp_consultar_solcitud (fechaReserva DATE, horaReserva TIME)
BEGIN
	SELECT DISTINCT MAX(sol.idSolicitud) as ultimoIdSolicitud
FROM solicitud sol
WHERE sol.FechaSolicitud = fechaReserva
      AND sol.horaSolicitud BETWEEN horaReserva AND ADDTIME(horaReserva, '01:00:00') and sol.estado =1;
END;
//
DELIMITER ;

/*Insertar datos en la tabla solicitudUsuario*/
DELIMITER //
CREATE PROCEDURE sp_insert_soliUsuario (p_idSolicitud INT, p_idCliente INT, p_idAsesor INT)
BEGIN
	insert into solicitudusuario(idSolictudFK, idClienteFK, idAsesorFK)
    values(p_idSolicitud, p_idCliente, p_idAsesor);
END;
//
DELIMITER ;

/*Insertar Datos solicitud de documentos*/
DELIMITER //
CREATE PROCEDURE sp_insert_redocumento (tipoDocumento VARCHAR(50), idSolicitud INT)
BEGIN
	insert into datossolicitud(datoSolicitud, idDetalleReservaFK, idSolicitudFK)
	values (tipoDocumento, 6, idSolicitud);
END;
//
DELIMITER ;

/*Insertar Datos solicitud asesoria legal*/
DELIMITER //
CREATE PROCEDURE sp_insert_reasesoria (Descripcion TEXT, idSolicitud INT)
BEGIN
	insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
    values (Descripcion, 1, idSolicitud);
END;
//
DELIMITER ;

/*Insertar Datos solicitud avalúo*/
DELIMITER //
CREATE PROCEDURE sp_insert_reavaluo(tipoAvaluo VARCHAR(50), catastral VARCHAR(50), libertad VARCHAR(50), idSolicitud INT)
BEGIN
	insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
    values(tipoAvaluo, 2, idSolicitud);
    insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
    values(catastral, 3, idSolicitud);
    insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
    values(libertad, 4, idSolicitud);
END;
//
DELIMITER ;

/*Insertar Datos solicitud diseño Arquitectónico*/
DELIMITER //
CREATE PROCEDURE sp_insert_rediseño(Descripcion TEXT, idSolicitud INT)
BEGIN
	insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
	values (Descripcion,5,idSolicitud);
END;
//
DELIMITER ;

/*Insertar Datos Busqueda de inmuebles*/
DELIMITER //
CREATE PROCEDURE sp_insert_rebusqueda (Descripcion TEXT, idSolicitud INT)
BEGIN
	insert into datossolicitud (datoSolicitud, idDetalleReservaFK, idSolicitudFK)
	values(Descripcion,7,idSolicitud);
END;
//
DELIMITER ;

/*Vista de todas las solicitudes de reserva*/
CREATE VIEW view_sol_reserva AS
SELECT distinct sol.idSolicitud, u.correoElectronico, sol.FechaSolicitud, sol.HoraSolicitud, su.idClienteFK as idCliente, su.idAsesorFK as idAsesor,
u.nombre AS nombreCliente, tr.nombreTipoReserva, ds.datoSolicitud, sol.estado FROM Solicitud sol
    JOIN SolicitudUsuario su ON sol.idSolicitud = su.idSolictudFK
    JOIN Usuario u ON su.idClienteFK = u.idUsuario
    JOIN DatosSolicitud ds ON sol.idSolicitud = ds.idSolicitudFK
    JOIN detalleTipoReserva dtr ON ds.idDetalleReservaFK = dtr.idDetalleReserva
    JOIN TipoReserva tr ON dtr.idTipoReservaFK = tr.idTipoReserva;
    
select * from view_sol_reserva;

/*Consultar todas las reservas, con el estado miramos si son solicitudes o las fijas*/
DELIMITER //
CREATE PROCEDURE sp_all_reservas(estado boolean, idAsesor INT)
BEGIN
	select * from view_sol_reserva solis
    where solis.estado = estado and solis.idAsesor = idAsesor;
END;
//
DELIMITER ;


/*Ver cada reserva Individualmente. Si llamas call sp_ver_reserva(4) 
salen 3 resultados, es relevante ya que es para un avalúo el cual
tiene 3 datos diferentes que consultar, los demás solo devuelven 1*/
DELIMITER //
CREATE PROCEDURE sp_ver_reserva(idSolicitud INT)
BEGIN
	select distinct * from view_sol_reserva solis
    where solis.idSolicitud = idSolicitud;
END;
//
DELIMITER ;

/*Ver las reservas en el calendario, las reservas del día*/
DELIMITER //
CREATE PROCEDURE sp_reserva_dia(fecha DATE, idAsesor INT)
BEGIN
	select distinct idCliente, nombreCliente, horaSolicitud, fechaSolicitud
    from view_sol_reserva sol
    where sol.fechaSolicitud = fecha and sol.idAsesor = idAsesor and sol.estado = 0;
END;
//
DELIMITER ;

/*Aceptar Solicitudes*/
DELIMITER //
CREATE PROCEDURE sp_update_request(IN p_idSolicitud INT)
BEGIN
   UPDATE solicitud
   SET estado = 0
   WHERE idSolicitud = p_idSolicitud;

END;
//
DELIMITER ;

/*Rechazar solicitudes*/
DELIMITER //
CREATE PROCEDURE sp_delete_request(IN p_idSolicitud INT)
BEGIN
 DELETE FROM solicitud where idSolicitud = p_idSolicitud;
 DELETE FROM datossolicitud where idSolicitudFK = p_idSolicitud;
   DELETE FROM solicitudusuario where idSolicitudUsuario = p_idSolicitud;
END;
//
DELIMITER ;

/*Seleccionar todas las reservas de ese usuario*/
DELIMITER //
CREATE PROCEDURE sp_consult_reservations(IN p_idUsuario INT)
BEGIN
	select s.idSolicitud from solicitud s 
    inner join solicitudusuario su on su.idSolictudFK = s.idSolicitud
    where su.idClienteFK = p_idUsuario;
END;
//
DELIMITER ;

/*Borrar todas las reservas de ese usuario*/
DELIMITER //
CREATE PROCEDURE sp_delete_request(IN p_idSolicitud INT)
BEGIN
    -- Desactivar la verificación de clave foránea
    SET FOREIGN_KEY_CHECKS = 0;

	DELETE FROM solicitudusuario where idSolicitudUsuario = p_idSolicitud;
	DELETE FROM datossolicitud where idSolicitudFK = p_idSolicitud;
	DELETE FROM solicitud where idSolicitud = p_idSolicitud;

    -- Volver a activar la verificación de clave foránea
    SET FOREIGN_KEY_CHECKS = 1;
END;
//
DELIMITER ;

/*Vista para traer info de los usuarios, casi igualita a la tabla usuarios pero de paso trae
el tipo de usuario*/
CREATE VIEW view_usuario AS
SELECT distinct u.idUsuario, u.nombre, u.apellido,u.telefono , u.correoElectronico, u.numIdentificacion
,u.tipoIdentificacion, u.estado, r.idRol, r.nombreRol FROM usuario u
    JOIN rol r ON r.idRol = u.idRolFK;

select * from view_usuario;



/*Estadística de cantidad de reservas y solicitudes realizadas*/
DELIMITER //
CREATE PROCEDURE sp_contar_reservas(IN p_estado INT)
BEGIN
	 SELECT COUNT(DISTINCT idSolicitud) AS cantidad
    FROM view_sol_reserva
    WHERE estado = p_estado;
END;
//
DELIMITER ;

/*Estadística de cantidad de reservas y solicitudes realizadas por rango de fechas*/

DELIMITER //
CREATE PROCEDURE sp_contar_reservas_con_fecha(IN p_estado INT, IN p_fecha_inicio DATE, IN p_fecha_fin DATE)
BEGIN
    SELECT COUNT(DISTINCT idSolicitud) AS cantidad
    FROM view_sol_reserva
    WHERE estado = p_estado
        AND fechaSolicitud BETWEEN p_fecha_inicio AND p_fecha_fin;
END;
//
DELIMITER ;

/*Estadística de cantidad de usuarios activos*/
DELIMITER //
CREATE PROCEDURE sp_contar_usuarios()
BEGIN
    SELECT COUNT(DISTINCT idUsuario) AS cantidad
    FROM view_usuario
    WHERE estado = 1;
END;
//
DELIMITER ;

/*estadistica mayor cantidad de reservas por asesor*/
DELIMITER //
CREATE PROCEDURE sp_asesor_mas_reservas()
BEGIN
    SELECT idAsesor, COUNT(DISTINCT idSolicitud) AS cantidadReservas
    FROM view_sol_reserva
    WHERE estado = 0
    GROUP BY idAsesor
    ORDER BY cantidadReservas DESC
    LIMIT 1;
END;
//
DELIMITER ;

/*estadistica cantidad de inmuebles*/
DELIMITER //
CREATE PROCEDURE sp_contar_inmuebles()
BEGIN
    SELECT COUNT(DISTINCT idInmueble) AS cantidad
    FROM inmueble
    WHERE clasificacion = 1;
END;
//
DELIMITER ;

/*Procedimiento Insertar Inmuebles*/
DELIMITER //
CREATE PROCEDURE sp_insert_inmueble(p_numPisos INT, p_estadoConstruccion VARCHAR(20), p_areaTerreno VARCHAR(10), p_areaConstruida  VARCHAR(10), p_numHabitaciones INT, p_imagenes BLOB, p_numBaños INT, p_direccion VARCHAR(50), p_barrio VARCHAR(50), p_precio LONG, p_tipoInmueble VARCHAR(20))
BEGIN
   insert into inmueble(numPisos, estadoConstruccion, areaTerreno, areaConstruida , numHabitaciones, imagenes, numBaños, direccion, barrio, precio, tipoInmueble, clasificacion)
   values(p_numPisos, p_estadoConstruccion,  p_areaTerreno, p_areaConstruida , p_numHabitaciones, p_imagenes, p_numBaños, p_direccion,  p_barrio, p_precio, p_tipoInmueble, true);
END;
//
DELIMITER ;


/*Procedimiento Insertar proyectos*/
DELIMITER //
CREATE PROCEDURE sp_insert_proyecto(p_numPisos INT, p_estadoConstruccion VARCHAR(20), p_areaTerreno VARCHAR(10), p_areaConstruida  VARCHAR(10), p_numHabitaciones INT, p_imagenes BLOB, p_numBaños INT, p_direccion VARCHAR(50), p_barrio VARCHAR(50), p_precio LONG, p_tipoInmueble VARCHAR(20), p_descripcionProyecto TEXT)
BEGIN
   insert into inmueble(numPisos, estadoConstruccion, areaTerreno, areaConstruida , numHabitaciones, imagenes, numBaños, direccion, barrio, precio, descripcionProyecto, tipoInmueble, clasificacion)
   values(p_numPisos, p_estadoConstruccion,  p_areaTerreno, p_areaConstruida , p_numHabitaciones, p_imagenes, p_numBaños, p_direccion,  p_barrio, p_precio, p_descripcionProyecto, p_tipoInmueble, false);
END;
//
DELIMITER ;

call sp_insert_proyecto(1,3,3,3,3,3,3,3,3,3,3,3);

/*Actualizar Inmueble*/

DELIMITER //
CREATE PROCEDURE sp_update_inmueble(p_numPisos INT, p_estadoConstruccion VARCHAR(20), p_areaTerreno VARCHAR(10), p_areaConstruida  VARCHAR(10), p_numHabitaciones INT, p_imagenes BLOB, p_numBaños INT, p_direccion VARCHAR(50), p_barrio VARCHAR(50), p_precio LONG, p_tipoInmueble VARCHAR(20), p_idInmueble INT)
BEGIN
    UPDATE Inmueble
    SET
		numpisos = IFNULL(p_numPisos, numpisos),
        estadoconstruccion = IFNULL(p_estadoConstruccion, estadoconstruccion),
        areaTerreno = IFNULL(p_areaTerreno, areaTerreno),
        areaConstruida = IFNULL(p_areaConstruida, areaConstruida),
        numHabitaciones = IFNULL(p_numHabitaciones, numHabitaciones),
        imagenes = IFNULL(p_imagenes, imagenes),
        numBaños = IFNULL(p_numBaños, numBaños),
        direccion = IFNULL(p_direccion, direccion),
        barrio = IFNULL(p_barrio, barrio),
        precio = IFNULL(p_precio, precio),
        tipoInmueble = IFNULL(p_tipoInmueble, tipoInmueble)
    WHERE
        idInmueble = p_idInmueble;
END //

DELIMITER ;

/*Procedimiento para actualizar los proyectos*/
DELIMITER //
CREATE PROCEDURE sp_update_proyecto(p_numPisos INT, p_estadoConstruccion VARCHAR(20), p_areaTerreno VARCHAR(10), p_areaConstruida  VARCHAR(10), p_numHabitaciones INT, p_imagenes BLOB, p_numBaños INT, p_direccion VARCHAR(50), p_barrio VARCHAR(50), p_precio LONG, p_tipoInmueble VARCHAR(20), p_descripcionProyecto TEXT, p_idInmueble INT)
BEGIN
    UPDATE Inmueble
    SET
		numpisos = IFNULL(p_numPisos, numpisos),
        estadoconstruccion = IFNULL(p_estadoConstruccion, estadoconstruccion),
        areaTerreno = IFNULL(p_areaTerreno, areaTerreno),
        areaConstruida = IFNULL(p_areaConstruida, areaConstruida),
        numHabitaciones = IFNULL(p_numHabitaciones, numHabitaciones),
        imagenes = IFNULL(p_imagenes, imagenes),
        numBaños = IFNULL(p_numBaños, numBaños),
        direccion = IFNULL(p_direccion, direccion),
        barrio = IFNULL(p_barrio, barrio),
        precio = IFNULL(p_precio, precio),
        descripcionProyecto = IFNULL(p_descripcionProyecto, descripcionProyecto),
        tipoInmueble = IFNULL(p_tipoInmueble, tipoInmueble)
    WHERE
        idInmueble = p_idInmueble;
END //

DELIMITER ;

/*Procedimiento para actualizar usuarios*/
DELIMITER //
CREATE PROCEDURE sp_update_user(p_correoElectronico VARCHAR(40), p_telefono LONG, p_idUsuario INT)
BEGIN
    UPDATE usuario
    SET
		correoElectronico = ifnull(p_correoElectronico, correoElectronico),
        telefono = ifnull(p_telefono, telefono)
    WHERE
        idUsuario = p_idusuario;
END //
DELIMITER ;

