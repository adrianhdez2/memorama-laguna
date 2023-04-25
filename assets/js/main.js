window.addEventListener('load', () => {
  const contenedor = document.querySelector('.contenedor-loader')
  contenedor.style.opacity = 0;
  contenedor.style.visibility = "hidden";
});

document.addEventListener('DOMContentLoaded', () => {

    
    init();
    //Optiones de cartas
    const cardArray = [
      {
        name: 'item_1',
        img: 'assets/img/item1.jpg'
      },
      {
        name: 'item_2',
        img: 'assets/img/item2.jpg'
      },
      {
        name: 'item_3',
        img: 'assets/img/item3.png'
      },
      {
        name: 'item_4',
        img: 'assets/img/item4.jpg'
      },
      {
        name: 'item_5',
        img: 'assets/img/item5.png'
      },
      {
        name: 'item_6',
        img: 'assets/img/item6.png'
      },
      {
        name: 'item_1',
        img: 'assets/img/item1.jpg'
      },
      {
        name: 'item_2',
        img: 'assets/img/item2.jpg'
      },
      {
        name: 'item_3',
        img: 'assets/img/item3.png'
      },
      {
        name: 'item_4',
        img: 'assets/img/item4.jpg'
      },
      {
        name: 'item_5',
        img: 'assets/img/item5.png'
      },
      {
        name: 'item_6',
        img: 'assets/img/item6.png'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())

    var gameOver = new Audio();
    gameOver.src = "assets/effects/game-over.wav";

    var levelComplete = new Audio();
    levelComplete.src = "assets/effects/level-complete.wav";

    
  
    const grid = document.querySelector('.container')
    const resultDisplay = document.querySelector('#score')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //Crear el tablero
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'assets/img/back.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //Checar las coincidencias
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'assets/img/back.png')
        cards[optionTwoId].setAttribute('src', 'assets/img/back.png')
        
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        //acierto de pareja
        cards[optionOneId].setAttribute('src', 'assets/img/front.png')
        cards[optionTwoId].setAttribute('src', 'assets/img/front.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneId].setAttribute('src', 'assets/img/back.png')
        cards[optionTwoId].setAttribute('src', 'assets/img/back.png')
        //desacierto de pareja
        
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length

      puntaje = cardsWon.length
      if  (cardsWon.length === cardArray.length/2) {
        parar();
        alerta();
        //Encontrar todo antes de tiempo
        levelComplete.play();
      }
    }
  
    //Voltear carta
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()

    // Cronometro
    function init(){
      document.querySelector(".btnStart").addEventListener("click", modal);
      document.querySelector(".start").addEventListener("click",cronometrar);
      m = 1;
      s = 29;
      document.getElementById("crono-time").innerHTML="01:30";
    }

    function cronometrar(){
        modal();
        escribir();
        id = setInterval(escribir,1000);
        document.querySelector(".start").removeEventListener("click",cronometrar);
    }

    function escribir(){
        var mAux, sAux;

        if (s < 10){sAux = "0" + s;}else{sAux = s;}

        if (m < 10){mAux = "0" + m;}else{ mAux = m;}

        document.getElementById("crono-time").innerHTML = mAux + ":" + sAux; 

        if (s == 0){
            if ((m == 0) && (s == 0)){
                parar();
                alertaBad();
                //Se termina el tiempo
                gameOver.play();
            }

            s = 60;
            if (m > 0){
                m--;
            }
        }
        
        s--;
        
    }

    function parar(){
        clearInterval(id);
        document.querySelector(".start").addEventListener("click",cronometrar);
    }

    function alerta(){
      const alerta = document.querySelector('.finish');
      const scoreF = document.querySelector('.scoreF')
      alerta.classList.add('display');
      alerta.style.opacity="1"
      alerta.style.zIndex="0"
      scoreF.innerHTML = puntaje;
    }

    function alertaBad(){
      const alerta = document.querySelector('.finish-bad');
      const scoreFB = document.querySelector('.scoreFB')
      alerta.classList.add('display');
      alerta.style.opacity="1"
      alerta.style.zIndex="0"
      scoreFB.innerHTML = puntaje;
    }

    function modal(){
      const welcome = document.querySelector('.welcome');
      welcome.classList.remove("displayN");
      welcome.style.opacity="0";
      welcome.style.zIndex="-1";
    }

    /*function loader(){
      setTimeout(function(){
        const contenedor = document.querySelector('.contenedor-loader')
        contenedor.style.opacity = 0;
        contenedor.style.visibility = "hidden";
    }, 4000)
    }*/
  })
  
