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
HoraSolicitud time not null
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
values(1, 'Obra Negra', 120, 200, 4, '/files/imagen1.jpg', 2, 'Calle Principal 123', 'Centro', 'Hermoso edificio residencial', 'Apartamento', true),
(2, 'obra gris', 150, 250, 3, '/files/imagen2.jpg', 3, 'Avenida Principal 456', 'Barrio Norte', 'Proyecto de viviendas en desarrollo', 'Casa', true),
(1, 'terminado', 180, 300, 5, '/files/imagen3.jpg', 4, 'Calle Secundaria 789', 'Barrio Este', 'Condominio de lujo con vista al mar', 'Departamento', true);

insert into tiporeserva(nombretiporeserva)
values
("Asesoria legal"),
("Avaluo"), 
("Diseño Aquitectonico"), 
("Documentos"),
("Busqueda de inmuebles");

/*la constraseña está en SHA-256*/

INSERT INTO Usuario (nombre, apellido, correoElectronico, numIdentificacion, tipoIdentificacion, contraseña, idRolFK)
VALUES
('Juan', 'Pérez', 'juan@example.com', 123456789, 'Cedula de ciudadania', 'ac1be349ec1a3cf8bf3d96d11b62c7ec015355b450093a33e79d3cc8f0b9232e', 1),
('María', 'Gómez', 'maria@example.com', 987654321, 'Pasaporte', '33e7183996951c46189f74338104f97e2b05f3d1a1d8d8e11de36c24f431a1d5', 2),
('Carlos', 'López', 'carlos@example.com', 555555555, 'Cedula de ciudadania', '0c34ab7c7c92917a9d6cd7392185cd189ae1e6f910d65d679b8985248ac3d35f', 3),
('Laura', 'Martínez', 'laura@example.com', 111111111, 'Pasaporte', '343eaeac32d1259f7b0d3bfdef3fb9ea65129b6844f034ff184b25b3f130664', 1),
('Ana', 'Rodríguez', 'ana@example.com', 999999999, 'Cedula de ciudadania', '13e83664ea35db30095e98492a7b0e14bbcbfadd23d7b4cb3bf6e1105b3ff54', 3);

insert into detalletiporeserva(datoDetTipoReserva, idTipoReservaFK)
values ("Descripcion",1),
("tipo avaluo",2),
("certificación catastral",2),
("certificado de libertad",2),
("Descripcion",3),
("tipo documento",4),
("descripcion",5);

INSERT INTO Solicitud (FechaSolicitud, HoraSolicitud)
VALUES
('2023-09-07', '14:30:00'),
('2023-09-07', '15:00:00'),
('2023-09-07', '16:00:00'),
('2023-09-07', '17:00:00'),
('2023-09-07', '18:00:00');

insert into solicitudusuario(idSolictudFK, idClienteFK, idAsesorFK)
values (1, 1, 3),
(3, 4, 3);

insert into datossolicitud(datoSolicitud,idDetalleReservaFK,idSolicitudFK)
values("solicitar acompañamiento en el proceso de prestamo de $5'000.000 de pesos",1,1),
("Para venta",2,4),
("image1.jpg",3,4),
("image2.jpg",4,4);


select * from inmueble;
select * from rol;
select * from tiporeserva;
select * from usuario;
select * from detalletiporeserva;
select * from solicitud;
select * from solicitudusuario;
select * from datossolicitud;

DELIMITER //

CREATE PROCEDURE spdispoasesores (fechaReserva date, horaReserva time)
BEGIN
    SELECT u.idUsuario, u.nombre, u.idRolFK
    FROM solicitudusuario s 
    INNER JOIN usuario u ON s.idAsesorFK = u.idUsuario 
    INNER JOIN solicitud sol ON sol.idSolicitud = s.idSolictudFK
    WHERE sol.FechaSolicitud = fechaReserva AND sol.HoraSolicitud BETWEEN horaReserva AND ADDTIME(horaReserva, '01:00:00');
END;

//

DELIMITER ;

/*Debe de llamar por lo menos a un asesor, a carlos en este caso, pero solo es un ejemplo*/
call spdispoasesores('2023-09-07', '15:00:00');
