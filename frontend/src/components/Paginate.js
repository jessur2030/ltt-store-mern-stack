import React, { useState, useEffect, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    //TODO: fix bug on pagination
    pages > 1 && (
      <Stack spacing={2}>
        <>
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${1}`
                  : `/page/${1}`
                : `/admin/productlist/${1}`
            }
          >
            <Pagination
              //   onClick={(e) => console.log(e.target.textContent)}

              style={{ display: "flex", justifyContent: "center" }}
              count={pages}
            />
          </Link>
        </>
      </Stack>
    )
  );
};

export default Paginate;

{
  /*

<Stack spacing={2}>
{pagesArr.map((x) => (
  <Pagination count={pages} page={x} />

  // <Link
  //   key={x}
  //   to={
  //     !isAdmin
  //       ? keyword
  //         ? `/search/${keyword}/page/${x}`
  //         : `/page/${x}`
  //       : `/admin/productlist/${x}`
  //   }
  // >
  //   <Pagination count={pages} page={x} />
  // </Link>
))}
</Stack>

*/
}
