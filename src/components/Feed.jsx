import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [loadState, setLoadState] = useState("loading");

  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) {
      setLoadState("ready");
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      setLoadState("ready");
    } catch (err) {
      console.log(err);
      setLoadState("error");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loadState === "loading" && feed == null) {
    return (
      <div className="flex justify-center my-16">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (loadState === "error" && feed == null) {
    return (
      <div className="flex flex-col items-center gap-2 my-16 px-4 text-center">
        <p className="text-lg">Could not load the feed.</p>
        <p className="text-sm opacity-70 max-w-md">
          Check that this site&apos;s build has{" "}
          <code className="text-xs bg-base-200 px-1 rounded">VITE_API_URL</code>{" "}
          set to your Render API URL (no trailing slash), and that your backend
          <code className="text-xs bg-base-200 px-1 rounded"> FRONTEND_URL </code>
          matches this Vercel URL. Then redeploy.
        </p>
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <h1 className="flex justify-center my-10 font-bold text-center">
        No New Users Found
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
