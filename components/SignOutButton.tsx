import {FC} from "react";

interface SignOutButtonProps {

}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    return (
        <form action="/api/auth/signout" method="post">
            <button id={"cc-button-signout"} className="cc-button-normal" type="submit">
                Sign out
            </button>
        </form>
    );
}

export default SignOutButton;