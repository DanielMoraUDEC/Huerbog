using Huerbog;
using Huerbog.Controllers.API_Controller;
using Huerbog.Controllers.MVC_Controller;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1PurbaMetodoDelete()//este metodo realiza un test a eliminar post, asegurarse de enviar el id correcto
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
        public void test()
        {
            //arrange/ preparar el ambiente de nuestra prueba
            AdminController test1 = new AdminController();

            //act/ ejecucion de nuestro metodo prueba
            var resultado = test1.viewUser(1);

            //asert/ validacion de nuestro metodo
            Assert.IsNull(resultado.Value);
        }
    }
}
