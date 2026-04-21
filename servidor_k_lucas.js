//Escribe un comentario explicando para qué sirve http
// http sirve para crear un servidor web  y responder solicitudes del navegador
import http from 'http';
//Escribe un comentario explicando para qué sirve fs
//fs sirve para leer archivos, como paginas html
import fs from 'fs';


    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
       
      
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //Escribe qué significa el 500 
           //500 significa error interno del servidor 
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        //Escribe qué significa el 200
        //200 significa que todo salio bien
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }
function mostrarUsuarios(req, res) {
  fs.readFile('usuarios.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Oh no!!!! Error interno del servidor');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}

    //Esta función deberá enviar un json con los datos de los usuarios
    function getUsuarios(req, res) {
        //Esto representa un objeto JSON de un usuario
        //Agrega otro usuario
        const usuarios = [
            {
            "nombre": "Punk",
            "saldo": "0"
          },
          { "nombre": "Lucas",
             "saldo": "100"
          },
          {
            "nombre": "Andrea",
            "saldo": "250"
          }
        ]
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      //Escribe qué hace la función stringify y por qué la tenemos que usar
      //stringify convierte un objeto de Javascripit en texto JSON para poder enviarlo al navegador
      res.end(JSON.stringify(usuarios));
    }

  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

     
      function mostrarMovimientos(req, res) {
        //Construye una página básica movimientos.html
        fs.readFile('movimientos.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }
function mostrarEquipo(req, res) {
  fs.readFile('equipo.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Oh no!!!! Error interno del servidor');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}
function mostrarOpinion(req, res) {
  fs.readFile('opinion.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Oh no!!!! Error interno del servidor');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}
function getMovimientos(req, res) {
  const movimientos = [
    {
      tipo: "Depósito",
      cantidad: 500
    },
    {
      tipo: "Retiro",
      cantidad: 100
    }
  ];

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(movimientos));
}

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //Cambia el mensaje por algo más divertido
      res.end('ERRrpRprPRoroRroORORoroROorOROro.');
    }

    //incluye el enlace a la documentación de createServer
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
      } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
      } 
      else if (url === '/usuarios') {
        mostrarUsuarios(req, res);
      } 
      else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
      } 
      else if (url === '/perfil') {
  mostrarPerfil(req, res);
}else if (url === '/equipo') {
  mostrarEquipo(req, res);
}
else if (url === '/opinion') {
  mostrarOpinion(req, res);
}
      //Agrega una ruta /equipo y su función correspondiente para que muestre el equipo del proyecto
      //Haz una página equipo.html correspondiente
      //Escribe el nombre completo y una cualidad que valores en esa persona de tu equipo
      //Trata de agregar una imagen a equipo.html
      //Explica si la puedes ver, en caso negativo ¿qué crees que pase?

      //Agrega una ruta /opinion
      //Haz una página opinion.html
      // Lee el siguiente artículo y responde ¿Crees que el colonialismo digital es un riesgo para tu carrera profesionl? ¿Para tu vida persona?
      //¿Qué es el freedombox?
      //https://www.aljazeera.com/opinions/2019/3/13/digital-colonialism-is-threatening-the-global-south
      
      
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html