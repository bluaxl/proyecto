create database home;
use home;

create table users(
	IdUser int auto_increment primary key,
    Pass varchar(80) not null,
    TypeDoc varchar(255) not null,
    NumDoc int unsigned unique not null,
    NameUser varchar(255) not null,
	BirthDate date not null,
    Phone int unsigned not null,
    Email varchar(255) not null,
    NumHouse tinyint unsigned not null,
	RoleUser varchar(255) not null,
	StatusUser boolean not null,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Survey(
	IdSurvey int auto_increment primary key,
    ProposalSurvey varchar(255) not null,
    DescriptionSurvey varchar(255) not null,
    DateStartSurvey date not null,
    DateEndSurvey date not null,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Vote(
	IdVote int auto_increment primary key,
	OptionVote varchar(255),
    DateHourVote datetime not null,
	Idvoting int not null, foreign key(Idvoting) references Survey (IdSurvey),
    IdUser int not null, foreign key(IdUser) references users (IdUser)
);


create table PayAdmin(
	IdPayAdmin int auto_increment primary key,
    IdUser int not null, foreign key(IdUser) references users (IdUser),
    RegistDate date not null,
    StatusPayAdmin boolean not null,
    FIlePayAdmin blob not null,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table CommonArea(
	IdCommonArea int auto_increment primary key,
    NameCommonArea varchar(255) not null,
    status boolean not null default 1,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Rent(
	IdUser int not null, foreign key(IdUser) references users (IdUser),
	IdCommonArea int not null, foreign key(IdCommonArea) references CommonArea (IdCommonArea),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Vehicle(
	Plate varchar(255) primary key,
    StatusVehicle boolean not null,
    TypeVehicle varchar(255) not null,
	IdUser int not null, foreign key(IdUser) references users (IdUser),
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Slot(
	IdSlot tinyint auto_increment primary key,
    TypeSlot varchar(255) not null,
	StatusSlot boolean not null default 1,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Parking(
	IdSpace tinyint not null, foreign key(IdSpace) references Slot (IdSlot),
	Plate varchar(255) not null, foreign key(Plate) references Vehicle (Plate),
    status boolean not null default 1,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (Pass,TypeDoc, NumDoc, NameUser, BirthDate, Phone, Email, NumHouse, RoleUser, StatusUser)
VALUES
  ( 'iijtpbp841/*','DNI' ,12345678, 'Juan Pérez', '1990-05-15', 987654321, 'juan.perez@example.com', 25, 'Usuario Normal', true),
  ('$irnvpe845198/','Carnet de Extranjería', 87654321, 'María Gómez', '1985-11-30', 987654321, 'maria.gomez@example.com', 10, 'Administrador', true),
  ( 'andexfognwp54981','Pasaporte', 54321678, 'Pedro Martínez', '1988-07-20', 987654321, 'pedro.martinez@example.com', 30, 'Usuario Normal', false),
  ( '/prtjboinmorn51965165*' ,'DNI', 98765432, 'Laura Fernández', '1995-02-10', 987654321, 'laura.fernandez@example.com', 15, 'Usuario Normal', true);


INSERT INTO PayAdmin (IdUser, RegistDate, StatusPayAdmin, FIlePayAdmin)
VALUES
  (1, '2023-05-10', true, 'datos_binarios_del_archivo1'),
  (2, '2023-05-09', true, 'datos_binarios_del_archivo2'),
  (3, '2023-05-11', false, 'datos_binarios_del_archivo3'),
  (4, '2023-05-08', true, 'datos_binarios_del_archivo4');
  
INSERT INTO CommonArea (NameCommonArea)
VALUES
  ('Sala de Reuniones'),
  ('Piscina'),
  ('Gimnasio'),
  ('Área de BBQ');
  
INSERT INTO Rent (IdUser, IdCommonArea)
VALUES
	(1, 2),
	(2, 3),
	(3, 4),
	(4, 1);

INSERT INTO Vehicle(Plate, StatusVehicle, TypeVehicle, IdUser)
VALUES
  (12345, true, 'Automóvil', 1),
  (67890, true, 'Motocicleta', 2),
  (24680, false, 'Automóvil', 3),
  (13579, true, 'Bicicleta', 4);

INSERT INTO Slot (TypeSlot)
VALUES
  ('Parqueadero'),
  ('Parqueadero'),
  ('Parqueadero');

INSERT INTO Parking (IdSpace, Plate)
VALUES
	(1, 12345),
	(2, 24680),
	(3, 67890);

-- Insertar datos en la tabla "Votaciones"
INSERT INTO Survey (ProposalSurvey, DescriptionSurvey, DateStartSurvey, DateEndSurvey)
VALUES
  ('Aprobación de Cuota Mensual', 'Votación para aprobar la cuota mensual de mantenimiento', '2023-05-15', '2023-05-20');


INSERT INTO Vote (OptionVote, DateHourVote, Idvoting, IdUser)
VALUES
  ('Aprobar', '2023-05-16 10:30:00', 1, 1),
  ('No aprobar', '2023-05-17 09:45:00', 1, 2),
  ('Aprobar', '2023-05-18 14:20:00', 1, 3),
  ('Aprobar', '2023-05-19 16:00:00', 1, 4);

-- visualizar datos
select * from users;
select * from PayAdmin;
select * from Rent;
select * from commonarea;

select * from Slot;
select * from Parking;
select * from vehicle;

select * from Survey;
select * from vote;

-- Usuarios con parqueadero
SELECT park.IdSpace, vehi.Plate, user.NameUser, user.NumHouse FROM users user INNER JOIN Vehicle vehi ON vehi.IdUser = user.IdUser INNER JOIN Parking park on vehi.Plate = park.Plate;

-- Usuarios sin parqueadero
SELECT u.NameUser, u.NumHouse, v.Plate FROM users u JOIN PayAdmin pa ON u.IdUser = pa.IdUser LEFT JOIN Vehicle v ON u.IdUser = v.IdUser LEFT JOIN Parking sp ON v.Plate = sp.Plate WHERE pa.StatusPayAdmin = 1 AND (v.Plate IS NULL OR sp.IdSpace IS NULL);

-- UPDATE CommonArea SET NameCommonArea = IFNULL(?,NameCommonArea), status = IFNULL(?,status) WHERE IdCommonArea = 1;
-- UPDATE Slot SET TypeSlot = IFNULL(?,TypeSlot),  StatusSlot = IFNULL(?,StatusSlot) WHERE IdSlot = 1;