import GoogleLogin, { GoogleLogout } from "react-google-login";

const clientId = '931024815427-72meiq3uivuuolfukb3jvikvhhqlr574.apps.googleusercontent.com';

function Logout() {

    const onSuccess = () =>{
        console.log("Log out successfull");
    }

    return(
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout