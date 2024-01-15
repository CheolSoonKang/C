const img = document.createElement('img');

img.src = `public/img/${Math.ceil(Math.random() * 18)}.jpg`;

//document.body.appendChild(img);

document.body.style.backgroundImage = `url(public/img/${Math.ceil(
    Math.random() * 18
)}.jpg)`;
