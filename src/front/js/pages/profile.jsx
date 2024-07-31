import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProfile();
    },[])
    return (
        <div>
            <h1>Usuario: --</h1>
        </div>
    );
}