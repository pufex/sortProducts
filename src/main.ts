import { fetchProducts } from "./fetch"
export type Product = {
  id: number,
  title: string,
  price: number,
  images: string[]
}

const setProducts = (products: Product[]): void => {

  const productsContainer = document.querySelector(".products")
  for(let i = productsContainer?.children.length!-1; i >= 0; i--){
    const childElement = productsContainer?.children[i]!
    if(childElement.classList.contains("product"))
      childElement.remove();
    
  }
    
  products.map((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product")
  
    const title = document.createElement("h1")
    title.classList.add("product-title") 
    title.innerText = product.title
    
    const price = document.createElement("div")
    price.classList.add("product-price")
    price.innerText = product.price.toString()
    
    const bottomContainer = document.createElement("div")
    bottomContainer.classList.add("bottom-container")
    bottomContainer.append(title, price)
    
    const productThumbnail = document.createElement("img")
    productThumbnail.classList.add("product-thumbnail")
    productThumbnail.setAttribute("src", product.images[0])

    productContainer.append(productThumbnail, bottomContainer);
    productsContainer?.append(productContainer)
  })

}

let products: Product[];
await fetchProducts("https://dummyjson.com/products?limit=10")
  .then((data) => {
    products = data.products;
    setProducts(products)
  })
  
 const productsContainer = document.querySelector(".products")
  
const select = document.querySelector<HTMLSelectElement>("#sort-select")!
const  btnSort = document.querySelector<HTMLButtonElement>(".btn--sort")
btnSort?.addEventListener("click", () => {
  switch(select.value){
    default: 
      console.log(products)
      setProducts(products)
      break
    case "ascending": 
      setProducts(products.slice().sort((productA, productB) => productA.price - productB.price))
      break;
    case "descending": 
      setProducts(products.slice().sort((productA, productB) => productB.price - productA.price))
      break;
  }
})
