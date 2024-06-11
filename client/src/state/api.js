import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "main",
    tagTypes: ["Products"],
    endpoints: (build)=>({
        getProducts : build.query({
            query:()=>'product/products',
            providesTags: ["Products"]
        })  
    })
})

export const {
    useGetProductsQuery,
}  =api;