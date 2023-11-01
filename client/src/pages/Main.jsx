export default function Main() {
	const profiles = [
		{
			dogName: "Duke",
			gender: "Male",
			image: "https://ebkc.org/wp-content/uploads/2019/07/americanbulldog4.jpg",
			breed: "Bulldog",
			age: 7,
			size: "Medium",
			about: "Drinks toilet water daily.",
			hobbies: "Dragging ass on the floor.",
		},
	];

	return (
		<div className="flex m-2">
			<div className="card w-96 shadow-xl bg-primary">
				<figure>
					<img
						src={profiles[0].image}
						alt="Shoes"
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title text-white text-4xl">
						{profiles[0].dogName} - {profiles[0].age}
					</h2>
					<h3 className="card-subtitle text-white">
						{profiles[0].gender} {profiles[0].breed}
					</h3>
					<div className=" mt-3 card-actions justify-between">
						<button className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<button className="btn btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
//comment
