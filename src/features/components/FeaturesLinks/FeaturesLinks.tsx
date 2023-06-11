import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DefaultIcon, PasswordIcon } from "../../../components/Common";
import { isMobile } from "../../../utils/browser";
import { updateView } from "../../../utils/viewTransition";
import { FeaturesRoutes } from "../../routes";
import { FeatureNames, useFeatures } from "../../store";

export function FeaturesLinks() {
	const { dispatch } = useFeatures();
	const navigate = useNavigate();

	return (
		<div className="FeaturesLinks w-full flex flex-col gap-6">
			<section id="passwords" className="w-full rounded-xl">
				<button
					onClick={() => {
						dispatch({
							type: "feature",
							feature: {
								name: FeatureNames.passwords,
								route: FeaturesRoutes.passwords,
							},
						});
						if (!isMobile()) {
							navigate("/dashboard/passwords");
							return;
						}
						updateView("new", () => navigate("/dashboard/passwords"));
					}}
					className="text-slate-50"
				>
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center justify-between">
							<PasswordIcon />
							<p className="text-md ml-5 text-slate-900 md:text-slate-50">
								Passwords
							</p>
						</div>
					</div>
				</button>
			</section>
			<section id="passwords" className="w-full rounded-xl">
				<div className="text-slate-50">
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center justify-between">
							<DefaultIcon />
							<p className="text-md ml-5 text-slate-900 md:text-slate-50">
								Feature B
							</p>
						</div>
					</div>
				</div>
			</section>
			<section id="passwords" className="w-full rounded-xl">
				<div className="text-slate-50">
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center justify-between">
							<DefaultIcon />
							<p className="text-md ml-5 text-slate-900 md:text-slate-50">
								Feature C
							</p>
						</div>
					</div>
				</div>
			</section>
			<section id="passwords" className="w-full rounded-xl">
				<div className="text-slate-50">
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center justify-between">
							<DefaultIcon />
							<p className="text-md ml-5 text-slate-900 md:text-slate-50">
								Feature D
							</p>
						</div>
					</div>
				</div>
			</section>
			<section id="passwords" className="w-full rounded-xl">
				<div className="text-slate-50">
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center justify-between">
							<DefaultIcon />
							<p className="text-md ml-5 text-slate-900 md:text-slate-50">
								Feature E
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
