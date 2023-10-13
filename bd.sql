create database arquideco;
use arquideco;

create table Inmueble(
idInmueble int auto_increment primary key, 
barrio varchar(150) not null,
direccion varchar(150) not null,
areaConstruida varchar(150) not null, 
areaLote varchar(150) not null,
dimensiones varchar(150) not null, 
estadoConstruccion varchar(150) not null,
numPisos int not null,
numHabitaciones int not null,
numBaños int not null,
estrato int not null, 
garaje enum("si", "no") not null,
imagen blob not null,
estado enum("activo", "inactivo") default "activo" 
);

select * from inmueble;


create table proyecto(
idProyecto int auto_increment primary key, 
barrio varchar(150) not null,
direccion varchar(150) not null,
areaConstruida varchar(150) not null, 
areaLote varchar(150) not null,
dimensiones varchar(150) not null, 
estadoConstruccion varchar(150) not null,
numPisos int not null,
numHabitaciones int not null,
numBaños int not null,
estrato int not null, 
garaje enum("si", "no") not null,
descripcion varchar(250) not null, 
imagen blob not null,
estado enum("activo", "inactivo") default "activo" 
);

create table Usuario(
idUsuario int primary key auto_increment,
nombre varchar(30) not null,
apellido varchar(30) not null,
numIdentificacion int not null,
tipoIdentificacion varchar (30),
correoElectronico varchar(40) not null,
numero int not null, 
contraseña varchar(30) not null,
rol enum("admin","user") default "user"
);

insert into Usuario (nombre,apellido,numIdentificacion,tipoIdentificacion,correoElectronico,numero,contraseña) values("axl", "rodriguez", 1029141798, "ti", "sapo@gmail.com", 0214012452, "mucho");
select* from usuario;
select * from inmueble;