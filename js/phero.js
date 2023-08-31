const handleCategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    console.log(categories);
    // displayAllCard(cards);

    const tabContainer = document.getElementById('tab-container');
    categories.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab btn normal-case">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    })
}

handleCategory();