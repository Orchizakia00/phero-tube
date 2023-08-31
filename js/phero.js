const handleCategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    console.log(categories);

    const tabContainer = document.getElementById('tab-container');
    categories.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideos('${category.category_id}')" class="tab btn normal-case">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
};

const handleLoadVideos = async (categoryId) => {
    // console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const videos = data.data;
    console.log(videos);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';

    videos.forEach(card =>{
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
    });
}


handleCategory();