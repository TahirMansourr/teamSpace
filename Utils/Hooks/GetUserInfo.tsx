"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { fetchUser } from "@/lib/features/CounterState/CounterSlice";

const useGetUserInfo = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  console.log("🚀 ~ useGetUserInfo ~ user:", user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    console.log("🚀 ~ useGetUserInfo ~ user:", "i eas fired");
  }, [dispatch]);

  return {
    user,
    loading,
    error,
  };
};

export default useGetUserInfo;
