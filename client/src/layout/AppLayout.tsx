import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userActions } from "../actions/userActions";
import { useAppDispatch, useAppSelector } from "../reducer/hook";
import { fetchNewAccessToken } from "../actions/authAction";

export interface userData {
  userId: string;
  email: string;
  gender: string;
  level: string;
}

const AppLayout: React.FC = () => {
  /**
   *헤더 > token 을 읽어 회원인지 아닌지 체크 
   *회원이면 45분마다 access 토큰의 여부를 확인 
   access 토큰 X => refresh 토큰 확인후 재발급
   *
   */

  const { exp } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [member, setMember] = useState<userData | null>(null);

  useEffect(() => {
    dispatch(userActions.fetchGetUser());
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      setMember(user);
    }
  }, [user]);

  // useEffect(() => {
  /**
   * 만료
   * 1) 쿠키 refresh 토큰 여부 확인
   * 1-1.O => refresh 유효성 확인
   * 1-1.X => 로그아웃 진행
   * 1.2 O => access 토큰 갱신
   * 1.2 X => 로그아웃 진행
   */
  //만료시간 전에 refreshtorken 유효성 여부 확인 후 accestoken 갱신
  //accesstoken이 들어오는 시간을 기준으로 50분 setInterval
  //refresh 토큰 유효성 확인 api 진행
  //api 쿠키(refresh)의 유효성 여부를 확인 후 accesstoken 발행
  // 유효성 여부 확인 middlewear 만들고 발행 갱신 api를 만들예정
  //그러면 발행 api
  /**
   * accesstoken 유효성 검사 api 호출
   * 유효성 만료를 한 상태로 갱신하는게 아닌
   * access 토큰이 있던 없던 refresh 토큰이 유효할때 갱신
   * 일단 50분간격으로 ? ...
   */
  // setTimeout(()=>{
  // },[])
  // dispatch(fetchAccesstokenVerify());
  // setInterval(() => {
  //   /**
  //    * refresh토큰이 유효성 검사를 거쳐
  //    * 유효하다면 token 갱신 및 발행
  //    *  */
  //   dispatch(fetchPublishOfToken());
  // }, 50 * 60 * 1000);
  // }, [dispatch]);

  useEffect(() => {
    const beforeExp = Number(exp) - 40;
    const milliBeforeExp = beforeExp * 1000;
    const currentTime = Date.now();
    const delay = milliBeforeExp - currentTime;
    let timer: any;
    if (delay > 0) {
      timer = setTimeout(() => {
        console.log("똑딱");
        dispatch(fetchNewAccessToken());
        console.log("setTimeout", delay);
      }, delay);
    }
    console.log("delay", delay);
    console.log("exp", exp);
    //undefinded 였다가 number
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [exp, dispatch]);

  return (
    <div>
      <div>header</div>
      {member !== null ? <div>회원</div> : <div>비회원</div>}
      <Outlet />
    </div>
  );
};

export default AppLayout;
