import React from "react";
import { Pagingcontainer, Pagination, Perpage } from "./style.js";
import { Button } from "../Button/index.jsx";
import { pageInfo } from "@src/db/data.json";

const Paging = () => {
  const pages = [];
  const choosed = pageInfo.page;
  let upper = 5;
  if (choosed + 2 < pageInfo.totalElements && choosed + 2 > 5) {
    upper = choosed + 2;
  } else if (choosed + 2 >= pageInfo.totalElements) {
    upper = pageInfo.totalElements;
  }

  let downer = choosed - 2;
  if (choosed - 2 <= 0) {
    downer = 1;
  } else if (choosed - 2 > pageInfo.totalElements - 4) {
    downer = pageInfo.totalElements - 4;
  }

  {
    for (let n = downer; n < upper + 1; n++) {
      pages.push(n);
    }
  }

  return (
    <Pagingcontainer>
      <Pagination>
        {choosed + 2 > 5 ? <Button primary='Pagingbutton' label='1' /> : null}
        {choosed + 2 > 5 ? "... " : null}

        {pages.map((num) => {
          return (
            <Button
              primary='Pagingbutton'
              Selected={choosed === num ? "Selected" : null}
              label={num}
            />
          );
        })}
        {choosed - 2 < pageInfo.totalElements - 4 ? "... " : null}
        {choosed - 2 < pageInfo.totalElements - 4 ? (
          <Button primary='Pagingbutton' label={pageInfo.totalElements} />
        ) : null}
      </Pagination>
      <Perpage>
        <Button primary='Pagingbutton' Selected='Selected' label='15' />
        per page
      </Perpage>
      {console.log(pages)}
    </Pagingcontainer>
  );
};

export default Paging;
