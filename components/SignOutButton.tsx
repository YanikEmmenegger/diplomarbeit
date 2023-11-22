import {FC} from "react";

interface SignOutButtonProps {

}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    return (
        <form action="/api/auth/signout" method="post">
            <button className="button block" type="submit">
                Sign out
            </button>
        </form>
    );
}

export default SignOutButton;