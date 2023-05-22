import {Button, Stack} from "@chakra-ui/react";
import {PaginationControlButton} from "./PaginationControlButton.jsx";
import {BiFirstPage, BiLastPage, GrFormNext, GrFormPrevious} from "react-icons/all.js";
import React from "react";
import { toDate } from "date-fns/esm";


export const Pagination = ({currentPage, setCurrentPage, pagination, refetch}) =>{

    const numberPages = pagination && pagination.totalPages;

    return (
        <Stack direction="row" spacing={2} py={4}>

            {/*First Page*/}
            <PaginationControlButton
                            disabled={currentPage === 1}
                            label={"First Page"}
                            icon={<BiFirstPage />}
                            onClick={()=> {
                                setCurrentPage(1)
                                setTimeout(() => {
                                    refetch();
                                },100);
                            }}/>

            {/*Previous Page*/}
            <PaginationControlButton
                disabled={currentPage === 1}
                label={"Previous Page"}
                icon={<GrFormPrevious />}
                onClick={()=> {
                    setCurrentPage(currentPage - 1)
                    setTimeout(() => {
                        refetch();
                    },100);
                }}/>


            {numberPages > 0 &&
                Array.from({ length: 3 }, (_, i) => {
                    const pageNumber = (parseInt(currentPage) + i) - 1;
                   
                    if (pageNumber <= 0 || pageNumber > numberPages) {
                        return null;
                    }
                    return (
                        <Button
                            borderRadius="full"
                            key={pageNumber}
                            variant={pageNumber === currentPage ? "solid" : "ghost"}
                            onClick={() => {
                                setCurrentPage(pageNumber)
                                setTimeout(() => {
                                    refetch();
                                },100);
                            }}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}


            {/*Next Page*/}
            <PaginationControlButton
                disabled={currentPage === numberPages}
                label={"Next Page"}
                icon={<GrFormNext />}
                onClick={() => {
                    setCurrentPage(currentPage + 1)
                    setTimeout(() => {
                        refetch();
                    },100);
                }}/>

            {/*Last Page*/}
            <PaginationControlButton
                disabled={currentPage === numberPages}
                label={"Last Page"}
                icon={<BiLastPage />}
                onClick={()=> {
                    {
                        setCurrentPage(numberPages)
                        setTimeout(() => {
                            refetch();
                        },100);
                    }}}/>
        </Stack>
        );
}