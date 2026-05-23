import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Ingresar } from '../../auth/login/Ingresar';


type Props = {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const GoogleLogin = ({setErrorMessage}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  enum LoginType {
    REGISTRAR,
    USERPASS,
    GOOGLE,
    FACEBOOK,
  }

  const handleGoogle = async() => {
      await Ingresar({setErrorMessage, dispatch, loginType: LoginType.GOOGLE, router});
    }
  return (
    <button
        type="button"
        className="flex items-center justify-center gap-2 py-2 mt-2 rounded cursor-pointer border border-black/50"
        onClick={handleGoogle}
        >
        <img 
            src="https://www.google.com/favicon.ico"  width="25" height="20"
        />
        Ingresar con Google
    </button>
  )
}
