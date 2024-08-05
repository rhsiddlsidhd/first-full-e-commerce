import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { userActions } from "../actions/userActions";
import { useAppDispatch, useAppSelector } from "../reducer/hook";

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

  return (
    <div>
      <div>header</div>
      {member !== null ? <div>회원</div> : <div>비회원</div>}
      <Outlet />
    </div>
  );
};

export default AppLayout;
