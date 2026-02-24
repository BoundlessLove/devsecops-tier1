import { useNavigate } from "react-router-dom"; 

  

function RegisterButton() { 

  const navigate = useNavigate(); 

  

  return ( 

    <button onClick={() => navigate("/signup")}> 

      Login or SignUp 

    </button> 

  ); 

} 

  

export default RegisterButton; 