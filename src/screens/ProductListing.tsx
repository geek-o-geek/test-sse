import React, { useEffect, useState } from 'react'
import { apiCall } from '@/services/apicall';
import { useCartStore } from "@/store/cartStore";
import ProductItem from '@/components/ProductItem';
import type { Product } from '@/types/product';
import CustomToast from '@/components/CustomToast';

function ProductListing() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [notifMessage, setNotifMessage] = useState("")


    useEffect(() => {
        const fetchListing = async() => {
             try {
                const response = await apiCall("/products?page=" + (page-1), {
                "method": "GET",
                "credentials": "include",
                headers: { "Content-Type":"application/json" }
                });

                setProducts(response?.items);
                paginationList(response?.total);
            } catch (error) {
                console.error(error);
            }
        }
       
        fetchListing(); 
    }, [page]);

    useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws`);

        ws.onmessage = (event) => {
            console.log("Notification:", event.data);
            setNotifMessage(event.data);
        }

        const notifAPI = async() => {
            await apiCall("/test-notify", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }                
            });
        }
    
       // notifAPI()

        return () => ws.close();
    }, []);

    const cartCount = useCartStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));

    const paginationList = (total: number) => {
        if(total > 0) {
            const limit = 4;
            const list: number[] = [];
            let page = 0;

            const arr = []
            for(let i=0; i<total; i++) {
                arr.push(i);
            }

            arr.forEach((_, index: number) => {
                if((index+1) % limit === 0) {
                    list.push(page++);
                }
            });

            setPages(list);
        }
    }

  return (
    <>
    <div className='container'>
        <h1>Product Listing</h1>
        <p>Cart Item: {cartCount}</p>

        <div style={styles.innerWrapper}>
            {products?.map((product: Product) => {
                return <ProductItem key={product.id} product={product} />
            })}
        </div>
        { pages?.length > 1 && <ul style={{ listStyleType: "none", color: 'red', display: "flex", gap: 20 }}>
            {pages.map((page: number) => <li key={page} style={{cursor: "pointer"}} onClick={() => setPage(page+1)}>{page+1}</li>)}
        </ul> }
    </div>
    <CustomToast message={notifMessage} />
    </>
  )
}

export default ProductListing;

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    btn: {
        padding: 10,
        minWidth: 100,
        maxWidth: 100
    },
    innerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    }
}