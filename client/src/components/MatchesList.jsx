import { useQuery } from "@apollo/client";
import { QUERY_SELF_MATCHES } from "../utils/queries";
import {useEffect} from "react"
import Auth from "../utils/auth";
let doOnce = true;
export default function MatchesList({ active, setActive, profileView, setProfileView }) {
  const { data, loading, error } = useQuery(QUERY_SELF_MATCHES);

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

  //TODO: Getting a "cannot udpate a compoennet while rendering a different componenet error"
  useEffect(() => {
    if (data && doOnce) {
  setActive(data?.me.matches[0]._id)
  doOnce = !doOnce;
}
})
  if (loading) return "loading...";
  if (error) return `Error! ${error.message}`;
  if (matches.length < 1) return <div>No matches yet!</div>;




  return (
    <ul className="menu">
      {matches.map(({ matchId, dogName, ownerName }) => (
        <li
          key={matchId}
        >
          <div
            className={
              matchId == active
                ? "items-start flex flex-col active"
                : "items-start flex flex-col"
            }
          >
            <div className="text-xl font-semibold">
              {ownerName} and {dogName}
            </div>
            {/* <div>This is an example message</div> */}
            <button 
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActive(matchId)
              setProfileView(true);
            }}>See Profile</button>
            <button 
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActive(matchId)
              setProfileView(false);
            }}>See Chat</button>
          </div>
          
        </li>
      ))}
    </ul>
  );
}
