const allButton = document.addEventListener('click', () => { handleAllButton() });
// const musicButton = document.getElementById('music-btn').addEventListener('click', () => { handleMusicButton() });

const handleAllButton = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();
    const cards = data.data;
    console.log(cards);
    displayAllCard(cards);
}

const displayAllCard = (cards) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';

    cards.forEach(card =>{
        const tubeCard = document.createElement('div');
        tubeCard.innerHTML=`
        <div class="card card-compact bg-base-100 shadow-xl w-72 h-64">
        <figure><img src="${card.thumbnail}" alt="Shoes" width="312px" height="200px"/></figure>
        <div class="card-body flex flex-row">
            <div class="w-10 h-10">
                <img src="${card.authors[0].profile_picture}" class="rounded-full mt-2" alt="Shoes"/>
            </div>
            <div>
                <h2 class="card-title">${card.title}</h2>
                    <p>${card.authors[0].profile_name} 
                        <span>${card.authors[0]?.verified} 
                        
                        </span>
                    </p>
                    <p>${card.others.views}</p>
            </div>
      </div>
        `;
        cardContainer.appendChild(tubeCard);
    })
}

const handleMusicButton = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/${categoryId}`);
    const data = await res.json();
    const musicCards = data;
    console.log(musicCards);
    // displayCard(cards);
}

const displayMusicCard = () =>{

}


handleAllButton();