const CollectionItems = document.getElementById("CollectionItems");

let productsList = [];

const fillCollection = async () => {
  await fetchProducts();
  await GetProducts(productsList);
};

const GetProducts = (productsList) => {
  CollectionItems.innerHTML = "";
  productsList.forEach((product) => {
    const Item = ItemComponentGenerator(product);
    CollectionItems.appendChild(Item);
  });
};

const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  console.log(products);
  productsList = products;
};

function filterProduct(category) {
  console.log(productsList);
  if (category.toLowerCase() === "all") {
    GetProducts(productsList);
  } else {
    const updateList = productsList.filter((product) => product.category.toLowerCase() === category.toLowerCase());
    GetProducts(updateList);
  }
}

const ItemComponentGenerator = (product) => {
  const col = document.createElement("div");
  col.setAttribute("class", "col  col-xl-3 mb-5");
  star = Math.floor(product.rating.rate);
  const starChecked = `<span class="fa fa-star checked"></span> `;
  const starUnChecked = `<span class="fa fa-star "></span> `;
  const rating = `${starChecked.repeat(star)}${starUnChecked.repeat(5 - star)}`;
  console.log("ratinf ,", rating);
  const card = `  <div class="card h-100 text-center p-4 d-flex  flex-column justify-content-center align-items-center  ">
                            <img class="card-img-top item-img " height="250px" src=${product.image} alt=${
    product.title
  }>
                            <div class="card-body">
                                <h3 class="card-title mb-2 fw-bold ">${product.title.substring(0, 12)}</h3>
                                <h5 class="card-title mb-2 text-danger text-capitalize">${product.category}</h5>
                                <p class="card-text fw-bold">${rating}</p>
                                <p class="card-text fw-bold">$${product.price}</p>
                                <a href="#" class=" btn btn-outline-dark">Buy</a>
                            </div>
                        </div>
                    `;
  col.innerHTML = card;
  return col;
};
