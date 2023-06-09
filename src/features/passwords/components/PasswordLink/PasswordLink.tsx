import { Link, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { IPassword } from "../../types.d";
import { formatDate } from "../../../../utils/date";
import { PasswordIcon } from "../../../../components/Common";

interface IPasswordLinkProps {
	password: IPassword;
	onClick?: () => void;
}

export function PasswordLink({ password, onClick = () => {} }: IPasswordLinkProps) {
	const { pathname } = useLocation();

	return (
		<li
			id={password._id}
			onClick={onClick}
			className="PasswordLink w-full mb-8 border-b border-solid border-1 border-zinc-300"
		>
			<Link
				to={`/dashboard/passwords/${password._id}`}
				state={{ from: pathname }}
				className="flex items-center justify-between pb-2"
			>
				<div className="flex items-center justify-center">
					{password.image_url ? (
						<img
							src={password.image_url}
							className={`w-9 h-9 flex items-center justify-center`}
						/>
					) : (
						<PasswordIcon
							open={password.plaintext !== null}
							size="small"
							showThemeStatus
						/>
					)}

					<div className="w-full flex flex-col ml-4">
						<p className="text-lg font-bold">{password.displayed_name}</p>
						{password.updated_at ? (
							<span className="text-sm text-zinc-500">
								Modified on {formatDate(password.updated_at, false, "en-US")}
							</span>
						) : (
							<span className="text-sm text-zinc-500">
								Added on {formatDate(password.created_at, false, "en-US")}
							</span>
						)}
					</div>
				</div>

				<div className="flex items-center">
					<ArrowRightIcon className="w-6 h-6 text-zinc-500" />
				</div>
			</Link>
		</li>
	);
}
