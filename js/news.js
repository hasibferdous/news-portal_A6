//loading the categories 
const loadCategoriesNav = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
      .then((res) => res.json())
      .then((data) => displayCategories(data.data.news_category))
      .catch((err) => console.log(err));
};
//displaying the categories 
const CategoriesNav = document.getElementById("categories-nav");
const displayCategories = (categories) => {
  categories.forEach((category) => {
    const a = document.createElement("a");
    a.innerHTML = `<p id='${category.category_id}' onclick="loadCategoriesNews('${category.category_id}', '${category.category_name}')"> ${category.category_name}</p>`;
    CategoriesNav.appendChild(a);
  });
};
//loading categories news


//displaying categories news


loadCategoriesNav();



