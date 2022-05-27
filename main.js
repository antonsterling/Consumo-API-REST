const API = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
});

API.defaults.headers.common['x-api-key'] = 'ade3c69c-00cb-4e95-a7c0-ebf301af2663';

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=ade3c69c-00cb-4e95-a7c0-ebf301af2663';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_DELETE_FAVORITES = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = `https://api.thedogapi.com/v1/images/upload`;

/* fetch(URL)
    .then(response => response.son())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }); */

const spanError = document.getElementById('error')



async function loadRandomDogs() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;


    const saveBoton1 = document.getElementById('f1');
    const saveBoton2 = document.getElementById('f2');
    const saveBoton3 = document.getElementById('f3');
    const saveBoton4 = document.getElementById('f4');
    saveBoton1.onclick = () => saveFavoritesDogs(data[0].id);
    saveBoton2.onclick = () => saveFavoritesDogs(data[1].id);
    saveBoton3.onclick = () => saveFavoritesDogs(data[2].id);
    saveBoton4.onclick = () => saveFavoritesDogs(data[3].id);
}

const changeBoton = document.getElementById('changeButtton');
changeBoton.onclick = loadRandomDogs;

loadRandomDogs();


async function loadFavoritesDogs() {
    const response = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'x-api-key': 'ade3c69c-00cb-4e95-a7c0-ebf301af2663'
        },
    });

    const data = await response.json();
    if(response.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }
    else
    {
        console.log('favorites');
        console.log(data);
        const section = document.getElementById('favoritesDogs');
        section.innerHTML = "";
        data.forEach(dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const boton = document.createElement('button');
            const botonText = document.createTextNode('⛔ Eliminar perrito');
            
            boton.appendChild(botonText);
            boton.className = 'boton'
            img.src = dog.image.url;
            img.className = 'main-img';
            article.appendChild(img);
            article.appendChild(boton);
            section.appendChild(article);
            section.className = 'container-favoritesDogs';
            boton.onclick = () => deleteFavoritesDogs(dog.id);
        })
    }    
}
loadFavoritesDogs();

async function saveFavoritesDogs(id) {
    const {data, status} = await API.post('/favourites', {image_id: id})
    loadFavoritesDogs();


   /*  const response = await fetch(API_URL_FAVORITES, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'ade3c69c-00cb-4e95-a7c0-ebf301af2663',
            },
            body: JSON.stringify({
                image_id: id,
            })
        });
    const data = await response.json();
    
    if(response.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }
    else
    {
        console.log('favorites');
        console.log(data);
        loadFavoritesDogs();
    }    */ 
}

async function deleteFavoritesDogs(id) {
    const response = await fetch(API_URL_DELETE_FAVORITES(id), 
        {
            method: 'DELETE',
            headers: {
                'x-api-key': 'ade3c69c-00cb-4e95-a7c0-ebf301af2663',
            }
            
        });
    const data = await response.json();
    if(response.status !== 200)
    {
        spanError.innerHTML = "Hubo un error: " + response.status;
    }
    else
    {
        loadFavoritesDogs();
        console.log('DOG eliminado de favoritos');
        console.log(data);
    }    
}


//Esta función no se terminó de arreglar.
async function uploadPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    const res = await fetch(API_URL_UPLOAD, {
        method : 'POST',
        headers: {
            'x-api-key' : 'ade3c69c-00cb-4e95-a7c0-ebf301af2663',
        },
        body: formData,
    });

    const data = await res.json();
    if ( res.status  !== 200 ){
        spanError.innerText = "Hubo un error: " + res.status + " "  + data.message
    }else{
        console.log("Perrito cargado correctamente");
        console.log({data});
        console.log(data.url);
    }

    console.log(formData.get('file'));
    console.log('estoyAqui');

}
