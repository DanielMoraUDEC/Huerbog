using Huerbog;
using Huerbog.Controllers.API_Controller;
using Huerbog.Controllers.MVC_Controller;
using Huerbog.Models;
using Huerbog.Models.ForoList;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestDeletePost()//este metodo realiza un test a eliminar post, asegurarse de enviar el id correcto
        {
            //arrange/ preparar el ambiente de nuestra prueba
            AdminController test1 = new AdminController();

            //act/ ejecucion de nuestro metodo prueba
            var resultado = test1.deletePost(12);//aqui se envia el id

            //asert/ validacion de nuestro metodo
            Assert.IsTrue(resultado.IsCompletedSuccessfully);
        }

        [TestMethod]
        public void testDeleteUser()
        {
            //arrange/ preparar el ambiente de nuestra prueba
            AdminController test1 = new AdminController();

            //act/ ejecucion de nuestro metodo prueba
            var resultado = test1.deleteUser(7);//aqui se envia el id

            //asert/ validacion de nuestro metodo
            Assert.IsTrue(resultado.IsCompletedSuccessfully);
        }

        [TestMethod]
        public void testViewUser()
        {
            //arrange/ preparar el ambiente de nuestra prueba
            AdminController test1 = new AdminController();

            //act/ ejecucion de nuestro metodo prueba
            var resultado = test1.viewUser(1);

            //asert/ validacion de nuestro metodo
            Assert.IsNotNull(resultado.Result);
        }
        [TestMethod]
        public void testGetReportedPost()
        {
            //arrange/ preparar el ambiente de nuestra prueba
            AdminController reportadas = new AdminController();
            //act/ ejecucion de nuestro metodo prueba
            var  resultado = reportadas.getReportedPost();

            //asert/ validacion de nuestro metodo
            var respuesta = resultado as StatusCodeResult;
            Assert.IsNull(respuesta.StatusCode);
        }
        /*Codigos de estado de respuesta HTTP
         * 
         * 
            200 OK                     La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP:
            201 Created                La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. Ésta es típicamente la respuesta enviada después de una petición PUT.
            202 Accepted               La solicitud se ha recibido, pero aún no se ha actuado. Es una petición "sin compromiso", lo que significa que no hay manera en HTTP que permite enviar una respuesta asíncrona que indique el resultado del procesamiento de la solicitud. Está pensado para los casos en que otro proceso o servidor maneja la solicitud, o para el procesamiento por lotes.
            203 Non-Authoritative Information  La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada, sino que se recoge de una copia local o de un tercero. Excepto esta condición, se debe preferir una respuesta de 200 OK en lugar de esta respuesta.
            204 No Content (en-US)     La petición se ha completado con éxito pero su respuesta no tiene ningún contenido, aunque los encabezados pueden ser útiles. El agente de usuario puede actualizar sus encabezados en caché para este recurso con los nuevos valores.
            205 Reset Content (en-US)  La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el agente de usuario tiene que inicializar la página desde la que se realizó la petición, este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe.
            206 Partial Content        La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente.
            207 Multi-Status (WebDAV (en-US))  Una respuesta Multi-Estado transmite información sobre varios recursos en situaciones en las que varios códigos de estado podrían ser apropiados. El cuerpo de la petición es un mensaje XML.
            208 Multi-Status (WebDAV (en-US))  El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar.
            226 IM Used (HTTP Delta encoding)  El servidor ha cumplido una petición GET para el recurso y la respuesta es una representación del resultado de una o más manipulaciones de instancia aplicadas a la instancia actual.

            300 Multiple Choice (en-US)       Esta solicitud tiene más de una posible respuesta. User-Agent o el usuario debe escoger uno de ellos. No hay forma estandarizada de seleccionar una de las respuestas.
            301 Moved Permanently       Este código de respuesta significa que la URI  del recurso solicitado ha sido cambiado. Probablemente una nueva URI sea devuelta en la respuesta.
            302 Found                   Este código de respuesta significa que el recurso de la URI solicitada ha sido cambiado temporalmente. Nuevos cambios en la URI serán agregados en el futuro. Por lo tanto, la misma URI debe ser usada por el cliente en futuras solicitudes.
            303 See Other (en-US)       El servidor envía esta respuesta para dirigir al cliente a un nuevo recurso solicitado a otra dirección usando una petición GET.
            304 Not Modified            Esta es usada para propósitos de "caché". Le indica al cliente que la respuesta no ha sido modificada. Entonces, el cliente puede continuar usando la misma versión almacenada en su caché.
            307 Temporary Redirect (en-US)    El servidor envía esta respuesta para dirigir al cliente a obtener el recurso solicitado a otra URI con el mismo método que se usó la petición anterior. Tiene la misma semántica que el código de respuesta HTTP 302 Found, con la excepción de que el agente usuario no debe cambiar el método HTTP usado: si un POST fue usado en la primera petición, otro POST debe ser usado en la segunda petición.
            308 Permanent Redirect (en-US)    Significa que el recurso ahora se encuentra permanentemente en otra URI, especificada por la respuesta de encabezado HTTP Location:. Tiene la misma semántica que el código de respuesta HTTP 301 Moved Permanently, con la excepción de que el agente usuario no debe cambiar el método HTTP usado: si un POST fue usado en la primera petición, otro POST debe ser usado en la segunda petición.

            400	solicitud incorrecta	No se puede procesar la solicitud porque tiene un formato incorrecto o es incorrecta.
            401	Sin autorizar	        La información de autenticación necesaria falta o no es válida para el recurso.
            403	prohibido	            Se denegó el acceso al recurso solicitado. Es posible que el usuario no tenga permisos suficientes. Importante: Si se aplican directivas de acceso condicional a un recurso, es posible que se devuelva el error HTTP 403; Forbidden error=insufficent_claims. Para obtener más información sobre Microsoft Graph y el acceso condicional, consulte Instrucciones para desarrolladores para el acceso condicional de Azure Active Directory.
            404	No encontrado	        El recurso solicitado no existe.
            405	Método no permitido 	El método HTTP de la solicitud no se permite en el recurso.
            406	No aceptable	        Este servicio no admite el formato solicitado en el encabezado Accept.
            409	Conflicto	            El estado actual entra en conflicto con lo que espera la solicitud. Por ejemplo, puede que la carpeta principal especificada no exista.
            410	Eliminado           	El recurso solicitado ya no está disponible en el servidor.
            411	Longitud requerida  	Se requiere un encabezado Content-Length en la solicitud.
            412	Error en la condición previa	        Una condición previa proporcionada en la solicitud (por ejemplo, un encabezado If-Match) no coincide con el estado actual del recurso.
            413	Entidad de solicitud demasiado grande	El tamaño de la solicitud supera el límite máximo.
            415	Tipo de medio no compatible         	El servicio no admite el formato del tipo de contenido de la solicitud.
            416	No se puede satisfacer el intervalo solicitado	El intervalo de bytes especificado no es válido o no está disponible.
            422	Entidad no procesable	No se puede procesar la solicitud porque tiene un formato que no es correcto semánticamente.
            423	Bloqueado	            El recurso al que se va a acceder está bloqueado.
            429	Demasiadas solicitudes	La aplicación cliente se limitó y no debe intentar repetir la solicitud hasta que haya transcurrido un intervalo de tiempo.
            
            500	error interno del servidor	Se produjo un error interno del servidor al procesar la solicitud.
            501	No implementado	        La característica solicitada no está implementada.
            503	Servicio no disponible	El servicio no está disponible temporalmente debido a que se encuentra en mantenimiento o está sobrecargado. Puede repetir la solicitud después de un retraso, cuya longitud puede especificarse en un encabezado Retry-After.
            504	Tiempo de espera agotado para la puerta de enlace	Mientras actuaba como proxy, el servidor no recibió ninguna respuesta puntual del servidor ascendente al que necesitaba acceder para intentar completar la solicitud. Puede producirse junto con el error 503.
            507	Almacenamiento insuficiente	Se alcanzó la cuota de almacenamiento máxima.
            509	Límite de ancho de banda excedido	La aplicación se limitó, ya que superó el límite máximo de ancho de banda. La aplicación puede volver a intentar la solicitud una vez que haya transcurrido más tiempo.
         */
    }
}
