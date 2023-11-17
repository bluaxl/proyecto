create database arquideco;
use arquideco;

create table Inmueble(
idInmueble int primary key auto_increment,
numPisos int not null,
estadoConstruccion varchar(20) not null,
areaConstruida int not null,
areaLote int not null,
numHabitaciones int not null,
imagenes blob not null,
numBaños int not null,
direccion varchar (50) not null,
barrio varchar(50) not null,
descripcionProyecto text not null,
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
estado boolean default 1
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

insert into inmueble(numpisos, estadoconstruccion, areaConstruida, areaLote, numHabitaciones, imagenes, numBaños, direccion ,barrio, descripcionProyecto, tipoInmueble, clasificacion)
values (1, 'Obra Negra', 120, 200, 4, '/files/imagen1.jpg', 2, 'Calle Principal 123', 'Centro', 'Hermoso edificio residencial', 'Apartamento', true),
(2, 'obra gris', 150, 250, 3, '/files/imagen2.jpg', 3, 'Avenida Principal 456', 'Barrio Norte', 'Proyecto de viviendas en desarrollo', 'Casa', true),
(1, 'terminado', 180, 300, 5, '/files/imagen3.jpg', 4, 'Calle Secundaria 789', 'Barrio Este', 'Condominio de lujo con vista al mar', 'Departamento', true);

insert into tiporeserva(nombretiporeserva)
values ("Asesoria legal"),
("Avaluo"), 
("Diseño Aquitectonico"), 
("Documentos"),
("Busqueda de inmuebles");

/*la constraseña está en SHA-256*/
INSERT INTO Usuario (nombre, apellido, correoElectronico, numIdentificacion, tipoIdentificacion, contraseña, idRolFK, estado)
VALUES ('Juan', 'Pérez', 'juan@example.com', 123456789, 'Cedula de ciudadania', 'ac1be349ec1a3cf8bf3d96d11b62c7ec015355b450093a33e79d3cc8f0b9232e', 1, true),
('María', 'Gómez', 'maria@example.com', 987654321, 'Pasaporte', '33e7183996951c46189f74338104f97e2b05f3d1a1d8d8e11de36c24f431a1d5', 2, 1),
('Carlos', 'López', 'carlos@example.com', 555555555, 'Cedula de ciudadania', '0c34ab7c7c92917a9d6cd7392185cd189ae1e6f910d65d679b8985248ac3d35f', 3, true),
('Laura', 'Martínez', 'laura@example.com', 111111111, 'Pasaporte', '343eaeac32d1259f7b0d3bfdef3fb9ea65129b6844f034ff184b25b3f130664', 1, 1),
('Ana', 'Rodríguez', 'ana@example.com', 999999999, 'Cedula de ciudadania', '13e83664ea35db30095e98492a7b0e14bbcbfadd23d7b4cb3bf6e1105b3ff54', 3, true);

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
('2023-09-07', '14:30:00', true),
('2023-09-07', '14:30:00' , false),
('2023-09-07', '14:30:00', false),
('2023-09-07', '14:30:00', false);

insert into solicitudusuario(idSolictudFK, idClienteFK, idAsesorFK)
values (1, 1, 3),
(4, 4, 5);

insert into datossolicitud(datoSolicitud,idDetalleReservaFK,idSolicitudFK)
values("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,1),
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
call sp_dispo_asesores('2023-09-07', '14:30:00');
call sp_dispo_asesores('2005-10-06', '17:00:00');
call sp_dispo_asesores('2023-11-24', '14:30:00');


/*insertar datos en la tabla solicitud*/
DELIMITER //
CREATE PROCEDURE sp_insert_solicitud(fechaReserva DATE, horaReserva TIME)
BEGIN
    INSERT INTO solicitud (fechaSolicitud, horaSolicitud)
    VALUES (fechaReserva, horaReserva);
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


call sp_consultar_solcitud('2023-09-07', '14:30:00');
call sp_consultar_solcitud('2023-12-12', '15:00:00');

DELIMITER //
CREATE PROCEDURE sp_insert_soliUsuario (IN p_idSolicitud INT, IN p_idCliente INT, IN p_idAsesor INT)
BEGIN
	insert into solicitudusuario(idsolictudFK, idClienteFK, idAsesorFK)
    values(p_idSolicitud, p_idCliente, p_idAsesor);
END;
//
DELIMITER ;

call sp_insert_soliUsuario (11,2,5)


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
CREATE PROCEDURE sp_insert_reavaluo(tipoAvaluo VARCHAR(150), catastral VARCHAR(150), libertad VARCHAR(150), idSolicitud INT)
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
SELECT distinct sol.idSolicitud, sol.FechaSolicitud, sol.HoraSolicitud, su.idClienteFK as idCliente, su.idAsesorFK as idAsesor,
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
    where sol.fechaSolicitud = fecha and sol.idAsesor = idAsesor ;
END;
//
DELIMITER ;