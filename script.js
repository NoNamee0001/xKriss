const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const downloadBtn = document.getElementById('downloadBtn');
const secretMsg = document.getElementById('secretMsg');
const typeText = document.getElementById('typeText');
const music = document.getElementById('bgMusic');

let musicStarted = false;
music.volume = 0;


const texto = `Si estás leyendo esto es porque nunca dejé de sentirlo. Cada palabra aquí, cada recuerdo,
cada emoción, eres tú. Y aunque el tiempo pase, hay cosas que simplemente no se olvidan.`;


function escribirTexto() {
    let i = 0;
    typeText.innerHTML = "";

    const intervalo = setInterval(() => {
        typeText.innerHTML += texto[i];
        i++;

        if (i >= texto.length) {
            clearInterval(intervalo);

            
            downloadBtn.classList.add('show');
        }
    }, 30);
}



function fadeInMusic() {
    const startTime = 207; 
    music.currentTime = startTime;
    music.volume = 0;

   
    music.play().then(() => {
        let volume = 0;
        const targetVolume = 0.6; 
        const duration = 5000; 
        const intervalTime = 100; 
        const step = targetVolume / (duration / intervalTime);

        const fadeInterval = setInterval(() => {
            if (music.volume < targetVolume) {
                volume += step;
                music.volume = Math.min(volume, targetVolume);
            } else {
                clearInterval(fadeInterval);
            }
        }, intervalTime);
    }).catch(error => {
        console.log("El audio requiere interacción previa.");
        musicStarted = false; 
    });
}


const misFotos = ['foto1.jpeg', 'foto2.jpeg', 'foto3.jpeg', 'foto4.jpeg', 'foto5.jpeg', 'foto6.jpeg', 'foto7.jpeg', 'foto8.jpeg', 'foto9.jpeg', 'foto10.jpeg', 'foto11.jpeg', 'foto12.jpeg', 'foto13.jpeg', 'foto14.jpeg']; 

function crearParticulas() {
    setInterval(() => {
        const p = document.createElement('div');
        
        const esFoto = Math.random() < 0.3; 

        if (esFoto) {
            p.classList.add('particle', 'mini-photo-particle');
            const fotoAleatoria = misFotos[Math.floor(Math.random() * misFotos.length)];
            p.style.backgroundImage = `url('${fotoAleatoria}')`;
            
            const size = Math.random() * 20 + 55 + 'px';
            p.style.width = size;
            p.style.height = size;
        } else {
            p.classList.add('particle');
            p.innerHTML = Math.random() > 0.5 ? '❤️' : '🌸';
            p.style.fontSize = Math.random() * 15 + 15 + 'px';
        }

        p.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 4 + 's';
        p.style.animation = `floatUp ${duration} linear forwards`;

        document.body.appendChild(p);

        setTimeout(() => p.remove(), 7000);
    }, 450); 
}



document.addEventListener('dblclick', () => {
    secretMsg.classList.add('show');
});


downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'X.pdf'; 
    link.download = 'Carta_MMI.pdf'; 
    link.click();
});
document.addEventListener('click', (e) => {
    if (!musicStarted && e.target.closest(".envelope-wrapper")) {
        fadeInMusic();
        musicStarted = true;
    }

    if (e.target.closest(".heart")) {
        if (!envelope.classList.contains("disable-envelope")) {
            envelope.classList.toggle('flap');
        }
    }

    if (e.target.closest(".letter") && envelope.classList.contains("flap")) {
        if (!letter.classList.contains('opened')) {
            letter.classList.add("letter-opening");
            setTimeout(() => {
                letter.classList.remove('letter-opening');
                letter.classList.add('opened');
                escribirTexto();
                crearParticulas();
            }, 500);
            envelope.classList.add("disable-envelope");
        }
    }
});