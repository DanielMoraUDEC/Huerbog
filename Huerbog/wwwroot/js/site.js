// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var url = "https://localhost:44325/api/Usuario";


function get() {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("divlista").innerHTML = "";
        for (i = 0; i < data.length; i++) {
            let divElement = document.createElement("div");
            divElement.innerHTML = data[i].nombre;
            document.getElementById("divlista").appendChild(divElement);
        }

    })
}