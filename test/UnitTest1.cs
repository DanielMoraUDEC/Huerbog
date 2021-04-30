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
            200 OK                     La solicitud ha tenido �xito. El significado de un �xito var�a dependiendo del m�todo HTTP:
            201 Created                La solicitud ha tenido �xito y se ha creado un nuevo recurso como resultado de ello. �sta es t�picamente la respuesta enviada despu�s de una petici�n PUT.
            202 Accepted               La solicitud se ha recibido, pero a�n no se ha actuado. Es una petici�n "sin compromiso", lo que significa que no hay manera en HTTP que permite enviar una respuesta as�ncrona que indique el resultado del procesamiento de la solicitud. Est� pensado para los casos en que otro proceso o servidor maneja la solicitud, o para el procesamiento por lotes.
            203 Non-Authoritative Information  La petici�n se ha completado con �xito, pero su contenido no se ha obtenido de la fuente originalmente solicitada, sino que se recoge de una copia local o de un tercero. Excepto esta condici�n, se debe preferir una respuesta de 200 OK en lugar de esta respuesta.
            204 No Content (en-US)     La petici�n se ha completado con �xito pero su respuesta no tiene ning�n contenido, aunque los encabezados pueden ser �tiles. El agente de usuario puede actualizar sus encabezados en cach� para este recurso con los nuevos valores.
            205 Reset Content (en-US)  La petici�n se ha completado con �xito, pero su respuesta no tiene contenidos y adem�s, el agente de usuario tiene que inicializar la p�gina desde la que se realiz� la petici�n, este c�digo es �til por ejemplo para p�ginas con formularios cuyo contenido debe borrarse despu�s de que el usuario lo env�e.
            206 Partial Content        La petici�n servir� parcialmente el contenido solicitado. Esta caracter�stica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simult�neamente.
            207 Multi-Status (WebDAV (en-US))  Una respuesta Multi-Estado transmite informaci�n sobre varios recursos en situaciones en las que varios c�digos de estado podr�an ser apropiados. El cuerpo de la petici�n es un mensaje XML.
            208 Multi-Status (WebDAV (en-US))  El listado de elementos DAV ya se notific� previamente, por lo que no se van a volver a listar.
            226 IM Used (HTTP Delta encoding)  El servidor ha cumplido una petici�n GET para el recurso y la respuesta es una representaci�n del resultado de una o m�s manipulaciones de instancia aplicadas a la instancia actual.

            300 Multiple Choice (en-US)       Esta solicitud tiene m�s de una posible respuesta. User-Agent o el usuario debe escoger uno de ellos. No hay forma estandarizada de seleccionar una de las respuestas.
            301 Moved Permanently       Este c�digo de respuesta significa que la URI  del recurso solicitado ha sido cambiado. Probablemente una nueva URI sea devuelta en la respuesta.
            302 Found                   Este c�digo de respuesta significa que el recurso de la URI solicitada ha sido cambiado temporalmente. Nuevos cambios en la URI ser�n agregados en el futuro. Por lo tanto, la misma URI debe ser usada por el cliente en futuras solicitudes.
            303 See Other (en-US)       El servidor env�a esta respuesta para dirigir al cliente a un nuevo recurso solicitado a otra direcci�n usando una petici�n GET.
            304 Not Modified            Esta es usada para prop�sitos de "cach�". Le indica al cliente que la respuesta no ha sido modificada. Entonces, el cliente puede continuar usando la misma versi�n almacenada en su cach�.
            307 Temporary Redirect (en-US)    El servidor env�a esta respuesta para dirigir al cliente a obtener el recurso solicitado a otra URI con el mismo m�todo que se us� la petici�n anterior. Tiene la misma sem�ntica que el c�digo de respuesta HTTP 302 Found, con la excepci�n de que el agente usuario no debe cambiar el m�todo HTTP usado: si un POST fue usado en la primera petici�n, otro POST debe ser usado en la segunda petici�n.
            308 Permanent Redirect (en-US)    Significa que el recurso ahora se encuentra permanentemente en otra URI, especificada por la respuesta de encabezado HTTP Location:. Tiene la misma sem�ntica que el c�digo de respuesta HTTP 301 Moved Permanently, con la excepci�n de que el agente usuario no debe cambiar el m�todo HTTP usado: si un POST fue usado en la primera petici�n, otro POST debe ser usado en la segunda petici�n.

            400	solicitud incorrecta	No se puede procesar la solicitud porque tiene un formato incorrecto o es incorrecta.
            401	Sin autorizar	        La informaci�n de autenticaci�n necesaria falta o no es v�lida para el recurso.
            403	prohibido	            Se deneg� el acceso al recurso solicitado. Es posible que el usuario no tenga permisos suficientes. Importante: Si se aplican directivas de acceso condicional a un recurso, es posible que se devuelva el error HTTP 403; Forbidden error=insufficent_claims. Para obtener m�s informaci�n sobre Microsoft Graph y el acceso condicional, consulte Instrucciones para desarrolladores para el acceso condicional de Azure Active Directory.
            404	No encontrado	        El recurso solicitado no existe.
            405	M�todo no permitido 	El m�todo HTTP de la solicitud no se permite en el recurso.
            406	No aceptable	        Este servicio no admite el formato solicitado en el encabezado Accept.
            409	Conflicto	            El estado actual entra en conflicto con lo que espera la solicitud. Por ejemplo, puede que la carpeta principal especificada no exista.
            410	Eliminado           	El recurso solicitado ya no est� disponible en el servidor.
            411	Longitud requerida  	Se requiere un encabezado Content-Length en la solicitud.
            412	Error en la condici�n previa	        Una condici�n previa proporcionada en la solicitud (por ejemplo, un encabezado If-Match) no coincide con el estado actual del recurso.
            413	Entidad de solicitud demasiado grande	El tama�o de la solicitud supera el l�mite m�ximo.
            415	Tipo de medio no compatible         	El servicio no admite el formato del tipo de contenido de la solicitud.
            416	No se puede satisfacer el intervalo solicitado	El intervalo de bytes especificado no es v�lido o no est� disponible.
            422	Entidad no procesable	No se puede procesar la solicitud porque tiene un formato que no es correcto sem�nticamente.
            423	Bloqueado	            El recurso al que se va a acceder est� bloqueado.
            429	Demasiadas solicitudes	La aplicaci�n cliente se limit� y no debe intentar repetir la solicitud hasta que haya transcurrido un intervalo de tiempo.
            
            500	error interno del servidor	Se produjo un error interno del servidor al procesar la solicitud.
            501	No implementado	        La caracter�stica solicitada no est� implementada.
            503	Servicio no disponible	El servicio no est� disponible temporalmente debido a que se encuentra en mantenimiento o est� sobrecargado. Puede repetir la solicitud despu�s de un retraso, cuya longitud puede especificarse en un encabezado Retry-After.
            504	Tiempo de espera agotado para la puerta de enlace	Mientras actuaba como proxy, el servidor no recibi� ninguna respuesta puntual del servidor ascendente al que necesitaba acceder para intentar completar la solicitud. Puede producirse junto con el error 503.
            507	Almacenamiento insuficiente	Se alcanz� la cuota de almacenamiento m�xima.
            509	L�mite de ancho de banda excedido	La aplicaci�n se limit�, ya que super� el l�mite m�ximo de ancho de banda. La aplicaci�n puede volver a intentar la solicitud una vez que haya transcurrido m�s tiempo.
         */
    }
}
