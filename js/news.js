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
    a.innerHTML = `<h6 id='${category.category_id}' onclick="loadCategoriesNews('${category.category_id}', '${category.category_name}')"> ${category.category_name}</h6>`;
    CategoriesNav.appendChild(a);
  });
};

//loading categories news
const loadCategoriesNews = (id, category) => {
document.querySelectorAll('#categories-nav a p').forEach(item=>{
    item.classList.remove('text-primary');
    item.classList.remove('fw-bold');
    })
document.getElementById(`${id}`).classList.add('text-primary');
document.getElementById(`${id}`).classList.add('fw-bold');
    
toggleLoader(true);
    
fetch(` https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayCategoriesNews(data.data, category))
    .catch((err) => console.log(err));
};
    
//spinner loader function 
const toggleLoader=(isLoading)=> {
    if (isLoading) {
        document.getElementById("loader").classList.remove("d-none");
    } else {
        document.getElementById("loader").classList.add("d-none");
        }
    }
//displaying categories news 

const displayCategoriesNews = (data,category) => {
    if (data.length >= 0) {
      document.getElementById("item-found").classList.remove("d-none");
      document.getElementById("item-found").innerHTML = `<h3>${data.length} News found in ${category}</h3>`;} 
    else {
      document.getElementById("item-found").classList.add("d-none");
    }
const NewsSection = document.getElementById("news-container");
NewsSection.innerHTML=``;

const newNews= data.sort((a,b)=>{
return b.total_view-a.total_view
    })
  
    newNews.forEach((item) => {  
      const NewsDiv = document.createElement("div");
      NewsDiv.innerHTML = `
     <div class="row g-0 p-2">
     <div class="col-md-2">
       <img src="${item.thumbnail_url}" class=" w-100 img-fluid rounded-start" alt="...">
     </div>
     <div class="col-md-10  p-2">
     <div class="card-body">
         <h4 class="card-title">${item.title}</h4>
         <p class="card-text">${item.details.slice(0,300)}......</p>
         
     <div  class="d-flex justify-content-between align-items-center flex-md-row flex-column">
           
        <div class="d-flex justify-content-center"> 
            <img width="45" height="45" class=" me-2 mt-5 border rounded-circle" src="${item.author.img}" alt="" srcset="">         
             
                <div class="me-5 mt-5">
                      <p class="card-text" > <strong><small> ${item.author.name ? item.author.name : "No author"} </small> </strong> <br> <small>${item.author.published_date.slice(0,10)}</small></p>
                </div>
        </div>
           <div class="me-5 mt-5">
              <p class="card-text"> <span> <i class="fa-solid fa-eye"></i></span> ${item.total_view?item.total_view:'No view'}</p> 
           </div>  
           <div class=" me-5 mt-5">
               <span class="card-text" ><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></span></p> 
           </div>
           <div class="me-5 mt-5">
               <button onclick="loadDetails('${item._id}')" id="item-details" type="submit" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
           </div>
        </div>
        </div>
      </div>
     </div>
     `;
    NewsDiv.classList.add("card");
    NewsDiv.classList.add("mb-3");
    NewsSection.appendChild(NewsDiv);
    });
    toggleLoader(false);
  };
// loading details of news 
const loadDetails=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data[0]))
    .catch((err) => console.log(err));
}
//displaying details of news
const displayDetails= data=>{
    const modalTitle= document.getElementById('exampleModalLabel');
    modalTitle.innerText=data.title;

    const modalBodyParagraph= document.getElementById('news-details');
    modalBodyParagraph.innerText=data.details;
    
    document.getElementById('author').innerHTML=`
    <img width="45" height="45" class=" me-2 border rounded-circle" src=${data.author.img} alt="" srcset="">         
                  
    <div class="me-5">
        <p class="card-text" > <strong><small> ${data.author.name ? data.author.name : "No author"} </small> </strong> <br> <small>${data.author.published_date.slice(0,10)}</small></p>
          
    </div> `;

    document.getElementById('news-image').setAttribute('src', data.image_url);
}

loadCategoriesNav();



