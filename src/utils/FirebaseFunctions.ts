import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../database/firebase";
import { iUserState } from "../features/user/userSlice";

export const getUser = async (id: string, name?: string | null) => {
  try {
    const userRef = doc(firestore, `users/${id}`);
    const res = await getDoc(userRef);

    if (res.exists()) {
      return res.data();
    } else {
      await setDoc(userRef, {
        id: id,
        name: name === null ? "my profile" : name,
        image:
          "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7AF80638BF5375882B663D6B7613A431D7E5513ECE97A6BB6512F6FD22EC69B4/scale?width=300&aspectRatio=1.00&format=png",
        cart: [],
      });
      const res = await getDoc(userRef);
      return res.data();
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, userData: iUserState) => {
  try {
    const userRef = doc(firestore, `users/${id}`);
    await updateDoc(userRef, {
      profile: { name: userData.profile.name, image: userData.profile.image },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (id: string, newCart: number[]) => {
  try {
    const userRef = doc(firestore, `users/${id}`);
    await updateDoc(userRef, { cart: [...newCart] });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (id: string) => {
  try {
    const cartDoc = doc(firestore, `users/${id}`);
    const res = await getDoc(cartDoc);
    return res.data();
  } catch (error) {
    console.log(error);
  }
};

export const handleFirebaseError = (error:string) => {
  switch (error){
    case "auth/email-already-exists":
        return "The provided email is already in use by an existing user. Each user must have a unique email."
    
    default:
      return `We couldn't log you in. Please check your email and password and try again. If you'd like to reset your password, use "Forgot Password" link below. (Error Code 14).`
  }
}
