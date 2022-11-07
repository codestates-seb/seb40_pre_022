import React, { useState, useRef, useEffect } from "react";
import { Container, Item } from "./style";
import { getAllMembers } from "../../api/membersPage";
import { useQuery } from "@tanstack/react-query";

const User = () => {
  const { isLoading, data } = useQuery(["AllQuestion"], () => {
    return getAllMembers(1);
  });

  if (isLoading) return <></>;

  return (
    <Container>
      {data.map((data, i) => {
        let link = `/members/myPage/${data.memberId}`;
        return (
          <a href={link} key={i}>
            <Item>
              <img src="/initialProfile.png" />
              <ul>
                <li className="Name blue" key={data.name}>
                  {data.name}
                </li>
                <li key="준비중 1">준비중..</li>
                <li key="준비중 2">준비중..</li>
                <li className="blue" key="준비중 3">
                  준비중..
                </li>
              </ul>
            </Item>
          </a>
        );
      })}
    </Container>
  );
};

export default User;
