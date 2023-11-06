import { useQuery } from "@apollo/client";
import { QUERY_SELF_MATCHES } from "../utils/queries";
import { useEffect } from "react";
import Auth from "../utils/auth";
import sadDog from "../assets/saddog.avif";
let doOnce = true;
let swalOnce = true;
export default function MatchesList({
	active,
	setActive,
	profileView,
	setProfileView,
}) {
	const { data, loading, error } = useQuery(QUERY_SELF_MATCHES, {
		pollInterval: 500,
		onCompleted: (data) => {
			if (matches.length < 1 && swalOnce) {
				let swalWithDaisy = Swal.mixin({
					customClass: {
						confirmButton: "btn btn-primary text-white",
						image: "border-4 border-rose-400",
						swal: "border-4 border-rose-400",
					},
					buttonsStyling: false,
				});
				swalWithDaisy.fire({
					title: "Oops!",
					text: "You don't have any matches yet",
					imageUrl: sadDog,
					imageWidth: 300,
					imageHeight: 350,
					imageAlt: "Custom image",
				});
				swalOnce = !swalOnce;
			} else {
				setActive(data.me.matches[0]._id);
			}
		},
	});
	// console.log(data.me.matches)
	const matches =
		data?.me.matches.map(({ _id, user1, user2 }) => {
			const matchId = _id;
			const selfId = Auth.getProfile().data._id;
			let dogName, ownerName;
			if (user1._id === selfId) {
				dogName = user2.dogName;
				ownerName = user2.ownerName;
			} else if (user2._id === selfId) {
				dogName = user1.dogName;
				ownerName = user1.ownerName;
			} else {
				throw new Error("Neither user in match is the current user");
			}
			return { matchId, dogName, ownerName };
		}) || [];
	if (loading) return <span className="loading loading-ball loading-lg"></span>;
	if (error) return `Error! ${error.message}`;

	return (
		<>
			{matches.length < 1 ? (
				<div>Sorry No Matches Yet</div>
			) : (
				<ul className="menu">
					{matches.map(({ matchId, dogName, ownerName }) => (
						<li key={matchId}>
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
								<button
									className="hover:underline"
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										setActive(matchId);
										setProfileView(true);
									}}
								>
									See Profile
								</button>
								<button
									className="hover:underline"
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										setActive(matchId);
										setProfileView(false);
									}}
								>
									See Chat
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
