import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AppContext = createContext()


export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const axiosIn = axios.create({
        baseURL: backendUrl
    });

    const [credits, setCredits] = useState(false)
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);

    const { getToken } = useAuth()

    const loadCreditsData = async () => {
        try {

            const token = await getToken()

            const { data } = await axiosIn.get("/api/user/credits", { headers: { token } })


            if (data.success) {
                setCredits(data.credits);
            } else {
                console.log("occur some error", data)
                toast.error(data.message)
            }


        } catch (error) {

        }
    }

    const { isSignedIn } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()

    const removeBg = async (image) => {
        try {
            if (!isSignedIn) {
                return openSignIn()
            }
            setImage(image)
            setResultImage(false);
            navigate("/result")
            const token = await getToken()
            const formData = new FormData()
            image && formData.append("image", image)

            const { data } = await axiosIn.post('/api/image/removeBgImage', formData, { headers: { token } })
            console.log("data geting after removing data ", data)
            if (data.success) {
                setResultImage(data.resultImage)
                data.creditBalanace && setCredits(data.creditBalanace);
                if (data.creditBalanace == 0)
                    navigate("/buyCredits")
            } else {
                toast.error(data.message)
                navigate("/buyCredits")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }


    const value = {
        axios,
        credits, setCredits,
        loadCreditsData,
        removeBg,
        resultImage, setResultImage,
        image, setImage,
        axiosIn,
        navigate
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}