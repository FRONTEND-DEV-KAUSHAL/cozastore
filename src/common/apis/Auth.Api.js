import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";


export const signUpApi = (data) => {
    console.log("signUpApi", data);

    return new Promise((resolve, reject) => {

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                onAuthStateChanged(auth, (user) => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            resolve({ payload: "check your email" });
                        })
                        .catch((e) => {
                            reject({ payload: e });
                        })
                });
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                    reject({ payload: "email allready verified" });
                } else {
                    reject({ payload: errorCode });
                }
            });
    })
}
