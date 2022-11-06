import React, { useState, useRef, useEffect } from "react";
import { Container, Item } from "./style";
import { getAllMembers } from "../../api/membersPage";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const User = () => {
  const { isLoading, data } = useQuery(["AllQuestion"], () => {
    return getAllMembers(1);
  });

  if (isLoading) return <></>;

  return (
    <Container>
      {data.map((data) => {
        let link = `/members/myPage/${data.memberId}`;
        return (
          <a href={link}>
            <Item>
              <img src="/initialProfile.png" />
              <ul>
                <li className="Name blue">{data.name}</li>
                <li>준비중..</li>
                <li>준비중..</li>
                <li className="blue">준비중..</li>
              </ul>
            </Item>
          </a>
        );
      })}
    </Container>
  );
};

export default User;
