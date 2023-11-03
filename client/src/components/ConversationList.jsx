import { useQuery } from "@apollo/client";
import { QUERY_SELF_MATCHES } from "../utils/queries";
import Auth from "../utils/auth";
import { useEffect } from "react";

export default function ConversationList({ active, set }) {
  const { data, loading, error } = useQuery(QUERY_SELF_MATCHES);

  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;

  const matches = data.me.matches.map(({ _id, user1, user2 }) => {
    const selfId = Auth.getProfile();
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
    return { _id, dogName, ownerName };
  });

  if (matches.length < 1) return <div>No matches yet!</div>;

  useEffect(() => {
    set(matches[0]._id);
  }, []);

  return (
    <ul className="menu">
      {matches.map(({ id: _id, dogName, ownerName }) => (
        <li key={id} onClick={() => set(id)}>
          <div
            className={
              id == active
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
