'use client'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Products } from './generated/prisma';

export default function Home(){
const [products, setProduct] = useState<Products[]>([])

 useEffect(() => {
(async() => {
    const products = await axios.get('/api/products')
    if(products.data.data){
      setProduct(products.data.data)
    }
})()

 }, [])


  return (
    <>
      <Head>
        <title>ShopEase - Home</title>
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Shop</a>
            <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
          </nav>
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen">
        <section className="bg-blue-100 text-center py-16">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Welcome to ShopEase</h2>
          <p className="text-lg text-blue-700">Your one-stop shop for everyday essentials</p>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
                <h4 className="mt-4 text-xl font-semibold">{product.name}</h4>
                                <h2 className="text-md font-md">{product.description}</h2>
                <p className="text-blue-600 font-bold">{product.price} บาท</p>
                <p className="mt-4 px-4 py-2 bg-blue-200 rounded-lg inline-block text-blue-600 font-bold">{product.category}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-inner py-6">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </footer>
    </>
  )
}
