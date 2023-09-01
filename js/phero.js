const handleCategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;

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
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const videos = data.data;

    const emptyContainer = document.getElementById('empty-container');

    if (videos.length === 0) {
        emptyContainer.classList.remove('hidden');
    }
    else {
        emptyContainer.classList.add('hidden');
    }

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl w-72 h-64">
        <figure><img src="${video.thumbnail}" alt="Shoes" width="312px" height="200px"/>
        <div class="absolute">
            <p class="absolute top-14 left-20 right-10 pr-10 px-2 bg-black rounded-xl text-white text-xs">${video?.others?.posted_date}</>
        <div>
        </figure>
        <div class="card-body flex flex-row">
            <div class="w-10 h-10">
                <img src="${video.authors[0].profile_picture}" class="rounded-full mt-2 w-10 h-10"/>
            </div>
            <div>
                <h2 class="card-title">${video.title}</h2>
                    <div class="flex">
                        <p class="inline-block pr-2">${video.authors[0].profile_name} </p>
                        <p class="mt-1 mr-24"> ${video.authors[0].verified ? '<img src="verified.svg" alt="Verified" width="14px" height="14px">' : ''} </p>
                    </div>
                    <p>${video.others.views}</p>
            </div>
      </div>
        `;
        cardContainer.appendChild(videoCard);
    });

    document.getElementById('sort-btn').addEventListener('click', () => { handleSort(videos) });
}

const handleSort = (videos) => {
    videos.sort((a, b) => {
        const viewsA = parseFloat(a.others.views.replace('K', '')) * 1000;
        const viewsB = parseFloat(b.others.views.replace('K', '')) * 1000;
        return viewsB - viewsA;
    });

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl w-72 h-64">
        <figure><img src="${video.thumbnail}" alt="Shoes" width="312px" height="200px"/></figure>
        <div class="card-body flex flex-row">
            <div class="w-10 h-10">
                <img src="${video.authors[0].profile_picture}" class="rounded-full mt-2 w-10 h-10"/>
            </div>
            <div>
                <h2 class="card-title">${video.title}</h2>
                    <div class="flex">
                        <p class="inline-block pr-2">${video.authors[0].profile_name} </p>
                        <p class="mt-1 mr-24"> ${video.authors[0].verified ? '<img src="verified.svg" alt="Verified" width="14px" height="14px">' : ''} </p>
                    </div>
                    <p>${video.others.views}</p>
            </div>
      </div>
        `;
        cardContainer.appendChild(videoCard);
    });
};

const handleTime = () => {

}


handleCategory();
handleLoadVideos(1000);
