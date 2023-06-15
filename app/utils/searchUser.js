export default async function searchUser(setUsers, setErrorMessage = null, setUserLoading, userName) {
    setUsers([]);
    if (setErrorMessage) setErrorMessage("");
    setUserLoading(true);

    // Case 1 :when input field has no value
    if (userName.length == 0) {
        setUserLoading(false);
        return;
    }

    const res = await fetch(`/api/user?search=${userName}`, {
        cache: "no-cache",
    });
    const resData = await res.json();
    // Case 2: when input field value is false
    if (resData.success === "false") {
        setUserLoading(false);
        if (setErrorMessage) setErrorMessage(resData.error);
        return;
    }
    // Case 3: input field value is true
    const { users } = resData;
    setUserLoading(false);
    setUsers(users);
}