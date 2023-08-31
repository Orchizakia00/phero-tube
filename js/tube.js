const allButton = document.addEventListener('click', () => { handleAllButton() });

const handleAllButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();
    const cards = data.data;
    console.log(cards);
    displayCard(cards);
}

const displayCard = (cards) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';

    cards.forEach(card =>{
        const tubeCard = document.createElement('div');
        tubeCard.innerHTML=`
        <div class="card card-compact bg-base-100 shadow-xl">
        <figure><img src="${card.thumbnail}" alt="Shoes" width="312px" height="200px"/></figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
        `;
        cardContainer.appendChild(tubeCard);
    })
}

handleAllButton();