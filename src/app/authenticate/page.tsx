import TabSwitcher from "@/components/TabSwitcher";
import SignInForm from "./SignInForm";
import SignupForm from "./SignupForm";

const Authenticate = () => {
	return (
		<div className="relative flex w-full h-screen bg-background">
			<div className="absolute max-w-3xl  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignupForm />} />
			</div>
		</div>
	);
};
export default Authenticate;
