const form = document.getElementById('form');

const getapi = async (event) => {
    event.preventDefault();
    const input = document.getElementById('input').value;

    if(input === ""){
        alert('Preencha o campo!')
    }

    const url = `https://www.omdbapi.com/?apikey=d899dac5&s=${input}`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Filme não encontrado.')
        }

        const data = await response.json();

        if(data.Response === "True" && data.Search && data.Search.length > 0){
            const movieDetails = await fetch(`https://www.omdbapi.com/?apikey=d899dac5&i=${data.Search[0].imdbID}`);
            const movieData = await movieDetails.json();
            showData(movieData);
        }else if (data.Response === "True" && data.Search && data.Search.length === 0) {
            alert('Filme não encontrado.');
        } else {
            alert('Filme não encontrado.');
        }
    }catch(error){
        alert(error.message);
    }
}

function showData(usuario) {
    const imgResult = document.getElementById('imgResult');
    const Title = document.getElementById('Title');
    const plot = document.getElementById('plot');
    const Genre = document.getElementById('Genre');
    const Year = document.getElementById('Year');
    const Runtime = document.getElementById('Runtime');
    const Director = document.getElementById('Director');
    const resultDiv = document.getElementById('resultDiv');

    if (imgResult && Title && plot && Genre && Year && Runtime && Director && resultDiv) {
        imgResult.src = usuario.Poster;
        Title.textContent = `Title: ${usuario.Title}`;
        plot.textContent = `About: ${usuario.Plot}`;
        Genre.textContent = `Genre: ${usuario.Genre}`;
        Year.textContent = `Year: ${usuario.Year}`;
        Runtime.textContent = `Runtime: ${usuario.Runtime}`;
        Director.textContent = `Director: ${usuario.Director}`;
        resultDiv.classList.add('active');

        const contentElements = document.querySelectorAll('.content h2, .content p');
        contentElements.forEach(element => {
            element.classList.add('active');
        });
    } else {
        alert('Elementos do resultado não encontrados no HTML.');
    }
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão do Enter
        form.dispatchEvent(new Event('submit')); // Dispara o evento de envio do formulário
    }
});

form.addEventListener('submit',getapi);