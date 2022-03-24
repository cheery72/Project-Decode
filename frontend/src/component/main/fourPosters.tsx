import { Grid, Image } from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
// components
import LoginModal from "../login/loginModal";
import IsLogin from "../../lib/customLogin";

export default function FourPosters() {
  const isLogin = IsLogin;
  const [userInfo, setUserInfo]: any = useState([]);

  useEffect(() => {
    if (isLogin()) {
      var Token: any = null;
      if (typeof window !== "undefined") Token = localStorage.getItem("token");

      axios
        .get("http://j6c203.p.ssafy.io:8081/auth/users", {
          headers: { Authorization: `Bearer ${Token}` },
        })
        .then(({ data }) => {
          console.log("데이터");
          console.log(data);
          console.log(data.body.user)
          setUserInfo(data.body.user)
        })
        .catch((e: any) => {
          console.log("에러");
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      <Grid centered columns={4}>
        <Grid.Column>
          <Image></Image>
        </Grid.Column>
        <Grid.Column>
          <Image></Image>
        </Grid.Column>
        <Grid.Column>
          <Image></Image>
        </Grid.Column>
        <Grid.Column>
          <Image></Image>
        </Grid.Column>
      </Grid>
    </>
  );
}
