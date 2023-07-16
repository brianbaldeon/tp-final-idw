const apiKey = "85fa3a15d5ac4c438b7af23a62f9c99d"

const tema = "Universidad Argentina 2023"


const url = `https://newsapi.org/v2/everything?q=${tema}&language=es&sortBy=relevancy&pageSize=8&apiKey=${apiKey}`




fetch(url).then(response => {if (response.ok) {return response.json()}}).then(datos => {
    const contenedorNoticias = document.getElementById("galeria")
    datos.articles.forEach(element => {
        //console.log(element)
        const article = document.createElement("article");
        article.classList.add("card", "col-12", "col-lg-4", "col-xl-3");
        

        const imagen = document.createElement("img");
        imagen.setAttribute("src", `${element.urlToImage}`)
        imagen.setAttribute("alt", "imagenNoticia")
        imagen.classList.add("card-img-top")

        article.appendChild(imagen)
        
        const divBody = document.createElement("div")
        divBody.classList.add("card-body")

        const titulo = document.createElement("h5")
        titulo.classList.add("card-title")
        titulo.appendChild(document.createTextNode(element.title))

        const descripcion = document.createElement("p")
        descripcion.classList.add("card-text");
        descripcion.appendChild(document.createTextNode(element.description))

        const linkNoticia = document.createElement("a")
        linkNoticia.setAttribute("href", `${element.url}`)
        linkNoticia.setAttribute("target", "__blank")
        linkNoticia.classList.add("btn", "btn-primary")
        linkNoticia.appendChild(document.createTextNode("Ver Noticia"))

        divBody.appendChild(titulo);
        divBody.appendChild(descripcion);
        divBody.appendChild(linkNoticia)

        article.appendChild(divBody)

        contenedorNoticias.appendChild(article)

    });
})

