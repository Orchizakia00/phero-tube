const handleCategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    // console.log(categories);

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
    // console.log(videos);

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

        // handleSort(videos);
    });

    document.getElementById('sort-btn').addEventListener('click', () => { handleSort(videos) });
}
const handleSort = (videos) => {
    console.log(videos);
    // const views = videos.others.views;
    // console.log(views);
    // console.log('btn sort');

    const viewsArray = [];

    videos.forEach(video => {
        const views = video.others.views;
        // console.log(views);
        viewsArray.push(views);
    });

    console.log(viewsArray);

    const convertViews = (viewsArrayString) => {
        const viewNum = parseFloat(viewsArrayString);

        if (viewsArrayString.includes('K')) {
            return viewNum * 1000;
        } 
        else {
            return viewNum;
        }
    };

    const viewsArrayNum = viewsArray.map(convertViews);

    console.log(viewsArrayNum);

    // sorting
    const sortedViews = viewsArrayNum.sort((a, b) => b - a);

    console.log(sortedViews);


}


handleCategory();
handleLoadVideos(1000);

// 

