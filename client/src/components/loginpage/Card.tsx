import React, { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reducer/hook";
import { userActions } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.fetchGetUser());
  }, [dispatch]);

  if (user) {
    navigate("/");
  }

  return (
    <div className="w-full min-h-screen flex justify-center  bg-gradient-to-r from-sky-300 to-pink-500 items-center   ">
      <main className="w-tablet h-fit flex justify-between bg-white shadow-2xl  rounded-lg max-lg:w-mobile   ">
        {children}
      </main>
    </div>
  );
};

export default Card;
