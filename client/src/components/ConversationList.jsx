import { useQuery } from "@apollo/client";
import { QUERY_SELF_MATCHES } from "../utils/queries";
import Auth from "../utils/auth";
import { useEffect } from "react";

export default function ConversationList({ active, setActive }) {
  const { data, loading, error } = useQuery(QUERY_SELF_MATCHES);

  console.debug(Auth.getProfile());

  const matches =
    data?.me.matches.map(({ _id, user1, user2 }) => {
      const matchId = _id;
      const selfId = Auth.getProfile()._id;
      let dogName, ownerName;
      if (user1.id === selfId) {
        dogName = user2.dogName;
        ownerName = user2.ownerName;
      } else if (user2.id === selfId) {
        dogName = user1.dogName;
        ownerName = user1.ownerName;
      } else {
        throw new Error("Neither user in match is the current user");
      }
      return { matchId, dogName, ownerName };
    }) || [];

  useEffect(() => {
    setActive(matches[0]?._id);
  }, []);

  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;
  if (matches.length < 1) return <div>No matches yet!</div>;

  return (
    <ul className="menu">
      {matches.map(({ matchId, dogName, ownerName }) => (
        <li key={matchId} onClick={() => set(id)}>
          <div
            className={
              matchId == active
                ? "items-start flex flex-col active"
                : "items-start flex flex-col"
            }
          >
            <div className="text-xl font-semibold">
              {dogName} and {ownerName}
            </div>
            {/* <div>This is an example message</div> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
