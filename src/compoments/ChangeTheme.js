import { useDispatch } from "react-redux";
import { changeTheme } from "../stores/settings";

function ChangeTheme () {
    const  dispatch = useDispatch();

    const handleThemeChange =(e)=>{
        dispatch(changeTheme(e.target.value))
    }

    return(
        <select name="theme" onChange={handleThemeChange}>
            <option value="light">light</option>
            <option value="dark">dark</option>
        </select>
    )
}

export default ChangeTheme;