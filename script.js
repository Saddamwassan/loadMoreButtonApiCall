const productsContainer = document.querySelector(".products");
const loadMoreBtn = document.querySelector(".loadMore");
let currentStage = 0;
async function fetchProducts(currentStep){
    try{
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentStep === 0?0:currentStep * 10 }`);
        const result = await response.json();
        console.log(result);
        if(result && result.products){
            showProducts(result.products);
        }
    }catch(e){
        console.log(e);
    }
}
function showProducts(productList){
productList.forEach((product)=>{
    // console.log(product);
    const productWrapper = document.createElement("div");
    const prodTitle = document.createElement("h3");
    const prodThumbnail = document.createElement("img");
    const  prodDesc= document.createElement("p");
    const prodPrice = document.createElement("p");
    // assigning values 
    prodTitle.textContent = product.title;
    prodThumbnail.src = product.thumbnail;
    prodDesc.textContent = product.description;
    prodPrice.textContent = " Only $"+product.price;

    // appending to parent div 
    productWrapper.append(prodThumbnail);
    productWrapper.append(prodTitle);
    productWrapper.append(prodDesc);
    productWrapper.append(prodPrice);
    // appending to product container 
    productsContainer.append(productWrapper);
    // assigning classes for styling 
    productWrapper.classList.add('item');
    prodThumbnail.classList.add("thumbnail");
    prodTitle.classList.add("title");
    prodDesc.classList.add("description");


})
if(productsContainer.children.length == 40){
    loadMoreBtn.setAttribute('disabled',true);
}
}
fetchProducts(currentStage);
// load more btn 
loadMoreBtn.addEventListener("click",()=>{
    fetchProducts(currentStage += 1);
})
