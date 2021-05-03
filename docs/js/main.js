// buttons
const AtomAniBtn = document.getElementById('AtomAniBtn');
const M152Btn = document.getElementById('M152Btn');
// divs
const welcomeDiv = document.getElementById('welcome');
const AtomAniDiv = document.getElementById('AtomAni');
const M152Div = document.getElementById('M152');

AtomAniBtn.addEventListener('click', () => {
    AtomAniDiv.classList.toggle('hidden');
    M152Div.classList.add('hidden');
    toggelMainDiv();
});

M152Btn.addEventListener('click', () => {
    M152Div.classList.toggle('hidden');
    AtomAniDiv.classList.add('hidden');
    toggelMainDiv();
});

function toggelMainDiv() {
    if (AtomAniDiv.classList.contains('hidden') && M152Div.classList.contains('hidden')) {
        welcomeDiv.classList.remove('hidden');
    } else {
        welcomeDiv.classList.add('hidden');
    }
}

function loadHighResBG() {
    let bg = new Image();
    bg.onload = () => {
        document.getElementsByTagName('body')[0].style.backgroundImage = `url('${bg.src}')`;
    }
    bg.src = '../img/bg.jpg';
}

loadHighResBG();