CREATE TABLE cd_infomedica(

id_InfoMedica INT PRIMARY KEY AUTO_INCREMENT,

diagnostico VARCHAR (200),

tratamiento VARCHAR (100)


)

  

  

  

CREATE TABLE cd_paciente(

  

id_Paciente INT PRIMARY KEY AUTO_INCREMENT,

Nombre_p VARCHAR(20) NOT NULL,

Apellido_Pp VARCHAR(20) NOT NULL,

Apellido_Mp VARCHAR(20) NOT NULL,

id_Infomedica INT,

  

FOREIGN KEY (id_InfoMedica) REFERENCES cd_infomedica(id_InfoMedica),
FOREIGN KEY (id_Cita) REFERENCES cd_citas(id_Cita)

  

)

  

CREATE TABLE cd_citas(

  

id_Cita INT PRIMARY KEY AUTO_INCREMENT,

nro_Cita INT,

fecha_Cita VARCHAR (15),

ultima_Cita VARCHAR (15)

)