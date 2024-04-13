import type { Product } from "./main";

export async function fetchProducts(url: string){
    try{
        const res = await fetch(url)
        const products = await res.json();
        return products
    }catch(error: any){
        console.error("Failed to fetch data:", error.message)
    }
}