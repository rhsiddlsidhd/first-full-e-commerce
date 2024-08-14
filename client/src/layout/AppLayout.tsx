import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../actions/userActions";
import { useAppDispatch, useAppSelector } from "../reducer/hook";
import { fetchLogout, fetchNewAccessToken } from "../actions/authAction";

export interface UserData {
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

  //'{ auth: authState; } & PersistPartial' 형식에 'error' 속성이 없습니다.
  const { exp } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [member, setMember] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.fetchGetUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("user", user);
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
    /**
     * 추적감지상황
     * 1. 로그인 직후 exp 만료직후 또는 만료 상황 추적 (갱신)
     * 2. 클라이언트가 accesstoken을 직접 수동으로 조작시 (로그아웃)
     */
    console.log({ exp });
    if (exp) {
      const expOffset = 40;
      const timer = (exp - expOffset) * 1000 - Date.now();
      if (timer > 0) {
        const timeoutId = setTimeout(() => {
          dispatch(fetchNewAccessToken());
        }, timer);
        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        //(timer가 음수가 나옴) 즉, 그 외 만료시간이 지났다면? 즉시 갱신
        dispatch(fetchNewAccessToken());
      }
    } else {
      //exp 가 없는경우 => 임의로 누가 수동으로 조작했을경우 로그아웃처리
      // dispatch(fetchLogout());
    }
  }, [dispatch, exp]);

  //현재 딱 한번만 실행되고 더 실행이 없음
  //이문제는 setTimeout은 한번만 실행하고 하지않음
  //이걸 방지할 수 있는 방법은 ?

  const handleLogout = () => {
    dispatch(fetchLogout({ navigate }));
  };

  return (
    <div>
      <div>header</div>
      {member !== null ? <div>회원</div> : <div>비회원</div>}
      <div
        onClick={handleLogout}
        className="cursor-pointer hover:text-red-400 w-fit"
      >
        로그아웃
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
