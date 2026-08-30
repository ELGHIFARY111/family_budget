const token = ~~[Math.random() * 12345678910];
// callback
const pictures = [1, 2, 3];
function login(username, callback) {
    console.log("login ...");
    setTimeout(() => {
        callback({ token, username });
    }, 200);
}
function getUser(token, panggil) {
    if (token)
        setTimeout(() => {
            panggil({ apiKey: "api13456" });
        }, 500);
}
function getPictures(apiKey, callback) {
    if (apiKey)
        setTimeout(() => {
            callback({ pictures });
        });
}

// const username = "elskuy";
// login(username, (response) => {
//   const { token } = response;
//   console.log(token);
//   getUser(token, (response) => {
//     const { apiKey } = response;
//     console.log(apiKey);
//     getPictures(
//       apiKey,
//       (response) => {
//         const { pictures } = response;
//         console.log(pictures);
//       },
//       1500,
//     );
//   });
// });
// promise
function login1(username) {
    console.log("login1....");
    return new Promise((succes, failed) => {
        setTimeout(() => {
            if (username !== "elskuy") failed("gagal login");
            succes({ token });
        }, 200);
    });
}

function getUser(token) {
    console.log("getuser1....");
    return new Promise((succes, failed) => {
        setTimeout(() => {
            if (token) succes({ apiKey: "api1234567" });
            failed("gagal getuser");
        }, 1000);
    });
}

function getPictures(apiKey) {
    console.log("getPictures....");
    return new Promise((succes, failed) => {
        setTimeout(() => {
            if (apiKey) succes({ pictures });
            failed("gagl getpictures");
        }, 2000);
    });
}

const user = login1("elskuy");
user.then((response) => {
    try {
        const { token } = response;
        console.log(token);
        const tokenn = getUser(token);
        tokenn.then((response) => {
            try {
                const { apiKey } = response;
                console.log(apiKey);
                const pic = getPictures(apiKey);
                pic.then((response) => {
                    try {
                        const { pictures } = response;
                        console.log(pictures);
                    } catch (error) {
                        console.error(error);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
});
// async/ await
async function getDisplay() {
    const { token } = await login("elskuy");
    const { apiKey } = await getUser(token);
    const { pic } = await getDisplay(apiKey);
    console.log(`
        token anda adalah ${token}
        apiKey anda adalah ${apiKey}
        pic anda adalah ${pic}
        `);
}
