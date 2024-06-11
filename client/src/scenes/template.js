import React from "react";
import { useGetProductsQuery } from "state/api";

const Template = ()=>{
    const {data} = useGetProductsQuery();
    return(
        <>
        </>
    )
}

