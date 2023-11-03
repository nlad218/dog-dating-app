import { useQuery } from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../utils/queries";
import Auth from "../utils/auth";

export default function Profile() {
  const { error, loading, data } = useQuery(QUERY_SELF_PROFILE);
  const userData = data?.me || {};
  const loggedIn = Auth.loggedIn();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {!loggedIn && window.location.assign("/")}
      <div className="">
        <figure>{userData.image}</figure>
        <h2>{userData.ownerName}</h2>
        <h3>{userData.dogName}</h3>
        <h3>{userData.breed}</h3>
        <h3>{userData.age}</h3>
        <h3>{userData.size}</h3>
        <h3>{userData.about}</h3>
        <h3>{userData.dogName}</h3>
      </div>
    </div>
  );
}
//comment
